import entities from "./source/entities.json";
const aliases: Record<string, Record<string, string>> = entities;
export function entitySearchText(id: string) {
  return Object.values(aliases[id === "chardonnay" ? "cookie4011" : id] ?? {}).join(" ").toLocaleLowerCase();
}
