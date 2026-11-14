import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { decodeHtml } from "./i18n/rendered-text.mjs";

const read = (file) => readFile(`out/${file}`, "utf8");
const text = (html) => decodeHtml(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const articleCount = (html, name) => [...html.matchAll(new RegExp(`<article\\b[^>]*class="${name}(?:[ "])`, "g"))].length;
const extract = (html, pattern) => [...html.matchAll(pattern)].map((match) => match[1]);
const manifest = [...(await read("sitemap.xml")).matchAll(/<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g)];
const expectedOrigin = new URL(manifest[0][1]).origin;
const target = /^(?:\/(?:tier-list|teams|codes)\/|\/(?:cookies|guides)\/[^/]+\/|\/tools(?:\/[^/]+)?\/)$/;
const report = { pages: 0, directAnswers: 0, faqPairs: 0, listPages: 0 };

for (const [, url, modified] of manifest) {
  const path = new URL(url).pathname;
  const local = path.replace(/^\/(?:zh-tw|ja|ko|th)(?=\/)/, "");
  const html = await read(`${path.slice(1)}index.html`);
  const nodes = extract(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)
    .flatMap((source) => JSON.parse(source)["@graph"]);
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<!--[\s\S]*?-->/gi, "");
  assert.ok(nodes.length, `${path} has no JSON-LD`);
  assert.ok(visible.includes(`name="application-name" content="Crumble Guide"`), path);
  assert.ok(visible.includes(`property="og:site_name" content="Crumble Guide"`), path);
  assert.equal(nodes.filter((node) => node["@type"] === "WebSite").length, 1, path);
  const organization = nodes.filter((node) => node["@type"] === "Organization");
  assert.equal(organization.length, 1, path);
  assert.equal(organization[0].name, "Crumble Guide", path);
  const ids = new Set(nodes.map((node) => node["@id"]).filter(Boolean));
  function checkReferences(value) {
    if (Array.isArray(value)) return value.forEach(checkReferences);
    if (!value || typeof value !== "object") return;
    if (Object.keys(value).length === 1 && value["@id"]) assert.ok(ids.has(value["@id"]), `${path}: unresolved ${value["@id"]}`);
    Object.values(value).forEach(checkReferences);
  }
  checkReferences(nodes);
  const dates = extract(visible, /<span\b[^>]*data-last-updated=""[^>]*>[^<]*<time datetime="([^"]+)"/gi);
  const date = modified.slice(0, 10);
  assert.ok(dates.includes(date), `${path}: visible date does not match ${date}`);
  for (const node of nodes) if (node.dateModified) {
    assert.equal(node.dateModified, date, path);
    assert.equal(node.url, url, path);
  }

  const answers = extract(visible, /<p\b[^>]*data-direct-answer=""[^>]*>([\s\S]*?)<\/p>/g);
  if (target.test(local)) {
    assert.equal(answers.length, 1, path);
    assert.ok(visible.indexOf("data-direct-answer") > visible.indexOf("</h1>"), path);
  }
  if (local === "/pets/") assert.equal(answers.length, 0, path);
  for (const answer of answers) {
    assert.match(answer, /<time datetime="\d{4}-\d{2}-\d{2}">/i, path);
    if (path === local) {
      const compact = local === "/tier-list/" || local === "/teams/";
      const copy = compact ? answer.split('<span class="content-date"')[0] : answer;
      const words = text(copy).split(/\s+/).length;
      const [min, max] = compact ? [20, 30] : [40, 60];
      assert.ok(words >= min && words <= max, `${path}: answer has ${words} words: ${text(copy)}`);
    } else {
      assert.match(text(answer), /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}\p{Script=Thai}]/u, path);
    }
  }
  report.directAnswers += answers.length;
  if (/^\/cookies\/[^/]+\/$/.test(local)) {
    const cookie = nodes.find((node) => node["@type"] === "WebPage")?.mainEntity;
    const heading = extract(visible, /<h1\b[^>]*>([\s\S]*?)<\/h1>/g)[0];
    assert.equal(cookie?.["@type"], "Thing", path);
    assert.equal(cookie?.name.replace(/\s+/g, " ").trim(), text(heading), path);
    assert.equal(cookie.url, url, path);
  }

  const list = nodes.find((node) => node["@type"] === "ItemList");
  if (local === "/cookies/" || local === "/pets/") {
    const collection = nodes.find((node) => node["@type"] === "CollectionPage");
    assert.ok(list && collection, `${path}: missing catalog structured data`);
    assert.equal(collection.mainEntity?.["@id"], list["@id"], path);
    for (const { item } of list.itemListElement) assert.equal(item["@type"], "Thing", path);
  }
  if (list) {
    const visibleCount = {
      "/cookies/": () => articleCount(visible, "cookie-card"),
      "/pets/": () => articleCount(visible, "entity-card"),
      "/teams/": () => articleCount(visible, "team-showcase"),
      "/codes/": () => articleCount(visible, "code-card") + articleCount(visible, "expired-code"),
      "/guides/": () => articleCount(visible, "guide-card"),
      "/tools/": () => new Set(extract(visible, /href="([^"]+\/tools\/(?:sugar-runes|stellar-link|plate-enhancement|team-builder|tier-builder)\/)"/g)
        .concat(extract(visible, /href="(\/tools\/(?:sugar-runes|stellar-link|plate-enhancement|team-builder|tier-builder)\/)"/g))).size,
      "/tier-list/": () => {
        const ranks = extract(visible, /<section\b[^>]*class="tier-row [^"]+"[^>]*>([\s\S]*?)<\/section>/g).join("");
        const entries = new Set(extract(ranks, /href="((?:\/(?:zh-tw|ja|ko|th))?\/cookies\/[^/"#?]+\/)"/g));
        assert.deepEqual(new Set(list.itemListElement.map(({ item }) => new URL(item.url).pathname)), entries, path);
        return entries.size;
      },
    }[local]();
    assert.equal(list.numberOfItems, list.itemListElement.length, path);
    assert.equal(list.numberOfItems, visibleCount, path);
    report.listPages++;
  }

  if (/^\/guides\/[^/]+\/$/.test(local)) {
    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    const sections = extract(visible, /<section\b[^>]*id="[^"]*faq[^"]*"[^>]*>([\s\S]*?)<\/section>/g);
    const actual = sections.flatMap((section) =>
      [...section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g)]
        .map(([, question, answer]) => [text(question), text(answer)]));
    assert.deepEqual(faq?.mainEntity.map(({ name, acceptedAnswer }) => [name, acceptedAnswer.text]) ?? [], actual, path);
    report.faqPairs += actual.length;
  }
  report.pages++;
}

assert.match(await read("404.html"), new RegExp(`property="og:image" content="${expectedOrigin}/opengraph-image"`));
assert.ok(!(await read("404.html")).includes("localhost:3000"));
const keys = (await readdir("out")).filter((file) => /^[a-f0-9]{32}\.txt$/.test(file));
assert.equal(keys.length, 1);
assert.equal((await read(keys[0])).trim() + ".txt", keys[0]);
const llms = await read("llms.txt");
for (const path of ["/tier-list/", "/cookies/", "/pets/", "/teams/", "/guides/", "/codes/", "/tools/", "/zh-tw/", "/ja/", "/ko/", "/th/"]) {
  assert.ok(llms.includes(`(${expectedOrigin}${path})`), path);
}
console.log("GEO static export checks passed:", report);
