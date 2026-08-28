import { copyFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const outputDirectory = join(process.cwd(), "out");
let aliasCount = 0;

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(path));
    else files.push(path);
  }

  return files;
}

async function createRscAliases(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;

    const path = join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      const files = await collectFiles(path);

      for (const file of files) {
        const suffix = relative(path, file).split(sep).join(".");
        const alias = join(directory, `${entry.name}.${suffix}`);
        await copyFile(file, alias);
        aliasCount += 1;
      }
    } else {
      await createRscAliases(path);
    }
  }
}

const outputStats = await stat(outputDirectory).catch(() => undefined);
if (!outputStats?.isDirectory()) {
  throw new Error("Static export directory not found. Run next build first.");
}

await createRscAliases(outputDirectory);
console.log(`Created ${aliasCount} Cloudflare RSC asset aliases.`);
