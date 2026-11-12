import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { renderedText } from "./i18n/rendered-text.mjs";

const sitemapFile = "out/sitemap.xml";
const stateDirectory = ".wrangler/indexnow";
const pendingFile = `${stateDirectory}/pending.json`;
const receiptFile = `${stateDirectory}/published.json`;
const fetchTimeout = 7_500;

function sitemapEntries(xml) {
  const urls = new Map();
  for (const [, body] of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const url = body.match(/<loc>([^<]+)<\/loc>/)?.[1];
    if (url) urls.set(url.replaceAll("&amp;", "&"), body.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1] ?? "");
  }
  if (!urls.size) throw new Error("No URLs found in sitemap");
  return urls;
}

function changedUrls(previous, next, firstRelease, previousHashes, nextHashes) {
  return [
    ...[...next].filter(([url, lastmod]) => (
      firstRelease || previous.get(url) !== lastmod ||
      (previousHashes[url] && previousHashes[url] !== nextHashes[url])
    )).map(([url]) => url),
    ...[...previous.keys()].filter((url) => !next.has(url)),
  ];
}

async function fetchPage(url, init) {
  return fetch(url, { signal: AbortSignal.timeout(fetchTimeout), redirect: "error", ...init });
}

async function currentRelease() {
  const sitemap = sitemapEntries(await readFile(sitemapFile, "utf8"));
  const origin = new URL(sitemap.keys().next().value).origin;
  if ([...sitemap.keys()].some((url) => new URL(url).origin !== origin)) throw new Error("Sitemap contains mixed hosts");
  const keyFiles = (await readdir("public")).filter((file) => /^[a-f0-9]{32}\.txt$/.test(file));
  if (keyFiles.length !== 1) throw new Error("Expected one IndexNow key file");
  const key = (await readFile(`public/${keyFiles[0]}`, "utf8")).trim();
  if (`${key}.txt` !== keyFiles[0]) throw new Error("IndexNow key file does not match its name");
  return { sitemap, origin, key, keyLocation: `${origin}/${keyFiles[0]}` };
}

async function readPrevious(release) {
  const [sitemap, key] = await Promise.all([
    fetchPage(`${release.origin}/sitemap.xml`),
    fetchPage(release.keyLocation),
  ]);
  if (!sitemap.ok || (!key.ok && key.status !== 404)) {
    throw new Error(`Could not read production baseline (sitemap ${sitemap.status}, key ${key.status})`);
  }
  return { sitemap: sitemapEntries(await sitemap.text()), firstRelease: key.status === 404 };
}

async function contentHashes(sitemap) {
  const hashes = {};
  // Keep disk concurrency bounded on Windows.
  const urls = [...sitemap.keys()];
  for (let index = 0; index < urls.length; index += 32) {
    await Promise.all(urls.slice(index, index + 32).map(async (url) => {
      const html = await readFile(`out${new URL(url).pathname}index.html`, "utf8");
      const body = html.match(/<main\b[^>]*>[\s\S]*?<\/main>/)?.[0] ?? "";
      const schema = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g) ?? [];
      const links = [...body.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
      hashes[url] = createHash("sha256").update(JSON.stringify([renderedText(body), schema, links])).digest("hex");
    }));
  }
  return hashes;
}

async function submit(release, urlList) {
  if (!urlList.length) return console.log("IndexNow: no changed URLs.");
  const [keyResponse, sitemapResponse] = await Promise.all([
    fetchPage(release.keyLocation),
    fetchPage(`${release.origin}/sitemap.xml`),
  ]);
  if (!keyResponse.ok || (await keyResponse.text()).trim() !== release.key) throw new Error("Production key is not available yet");
  if (!sitemapResponse.ok || JSON.stringify([...sitemapEntries(await sitemapResponse.text())]) !== JSON.stringify([...release.sitemap])) {
    throw new Error("Production sitemap does not match this release yet");
  }
  const host = new URL(release.origin).host;
  for (let start = 0; start < urlList.length; start += 10_000) {
    const response = await fetchPage("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key: release.key, keyLocation: release.keyLocation, urlList: urlList.slice(start, start + 10_000) }),
    });
    if (![200, 202].includes(response.status)) throw new Error(`IndexNow returned HTTP ${response.status}`);
    console.log(`IndexNow: HTTP ${response.status} for ${Math.min(urlList.length - start, 10_000)} URLs.`);
  }
}

async function submitPending(release, urlList) {
  await mkdir(stateDirectory, { recursive: true });
  await writeFile(pendingFile, JSON.stringify(urlList));
  await submit(release, urlList);
  await writeFile(pendingFile, "[]");
}

async function getPending(origin) {
  const data = await readFile(pendingFile, "utf8").catch((error) => {
    if (error.code === "ENOENT") return "[]";
    throw error;
  });
  return JSON.parse(data).filter((url) => new URL(url).origin === origin);
}

function logIndexNow(error) {
  console.warn(`IndexNow: ${error.message}. This does not affect the site. If a batch was saved, retry with npm run indexnow:submit.`);
}

if (process.argv.includes("--retry-indexnow")) {
  try {
    const release = await currentRelease();
    await submitPending(release, await getPending(release.origin));
  } catch (error) {
    logIndexNow(error);
  }
} else {
  let release;
  let urls;
  let hashes;
  try {
    release = await currentRelease();
    const previous = await readPrevious(release);
    const receipt = JSON.parse(await readFile(receiptFile, "utf8").catch((error) => {
      if (error.code === "ENOENT") return "{}";
      throw error;
    }));
    hashes = await contentHashes(release.sitemap);
    const baselineHashes = receipt.origin === release.origin && receipt.sitemap === JSON.stringify([...previous.sitemap])
      ? receipt.hashes : {};
    urls = [...new Set([...await getPending(release.origin), ...changedUrls(previous.sitemap, release.sitemap, previous.firstRelease, baselineHashes, hashes)])];
  } catch (error) {
    logIndexNow(error);
  }

  const deploy = spawnSync(process.execPath, ["node_modules/wrangler/bin/wrangler.js", "deploy"], { stdio: "inherit" });
  if (deploy.error) throw deploy.error;
  if (deploy.status !== 0) process.exit(deploy.status ?? 1);

  if (release && urls) {
    try {
      await mkdir(stateDirectory, { recursive: true });
      await writeFile(receiptFile, JSON.stringify({ origin: release.origin, sitemap: JSON.stringify([...release.sitemap]), hashes }));
      await submitPending(release, urls);
    } catch (error) {
      logIndexNow(error);
    }
  }
}
