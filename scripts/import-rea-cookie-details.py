"""Offline import from a verified CookieRun REA snapshot. Requires Pillow."""

import argparse
from collections import defaultdict
from decimal import Decimal
from functools import lru_cache
import json
from pathlib import Path
import re
import sqlite3

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
IMAGE_DIR = PUBLIC / "images/cookie-details"
LOCALES = ("en", "ja", "ko", "th", "zh-Hant")
SOURCE_VERSION = "1.6.102"

PROMOTION_STATS = (
    ("gradeAttackPointIncreaseMultiplier", "baseAttackPoint", 100, "%"),
    ("gradeDefensePointIncreaseMultiplier", "baseDefensePoint", 100, "%"),
    ("gradeHealthPointIncreaseMultiplier", "baseHealthPoint", 100, "%"),
    ("gradeAccuracyIncreaseAddition", "baseAccuracy", 10000, ""),
    ("gradeAvoidanceIncreaseAddition", "baseAvoidance", 10000, ""),
    ("gradeFocusIncreaseAddition", "baseFocus", 10000, ""),
    ("gradeResistIncreaseAddition", "baseResist", 10000, ""),
    ("gradeCriticalRateIncreaseAddition", "baseCriticalRate", 100, "pp"),
    ("gradeCriticalDamageIncreaseAddition", "baseCriticalDamageRate", 100, "pp"),
)


def read_promotions(snapshot):
    curves = {}
    for row in read_json(snapshot / "database/decoded/CookieGrades.json"):
        curves.setdefault(row["rarityType"], []).append({
            "stars": row["grade"],
            "copies": row["requiredAmount"],
            "skillStep": row["skillStep"],
            "stats": [
                {"key": key, "value": int(row[field]["value"]) / divisor, "unit": unit}
                for field, key, divisor, unit in PROMOTION_STATS
            ],
        })
    for rarity, rows in curves.items():
        rows.sort(key=lambda row: row["stars"])
        if [row["stars"] for row in rows] != list(range(11)):
            raise ValueError(f"Incomplete promotion curve for {rarity}.")
    return curves


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def localized(db, key):
    rows = dict(db.execute("SELECT language, text FROM localizations WHERE key = ?", (key,)))
    if any(not rows.get(locale, "").strip() for locale in LOCALES):
        raise ValueError(f"Incomplete game localization: {key}")
    return {locale: rows[locale].strip() for locale in LOCALES}


def read_codex_rewards(snapshot, db, promotions):
    decoded = snapshot / "database/decoded"
    items = {item["id"]: item for item in read_json(decoded / "Items.json")}
    reward_items = {}
    rewards = {}
    for row in read_json(decoded / "CodexRewards.json"):
        if row["codexType"] != "CODEXTYPE_COOKIE":
            continue
        item_id = row["rewardItemId"]
        if item_id not in reward_items:
            item = items[item_id]
            # This repository asset matches the extracted icon_crystal artwork.
            image = "/images/rewards/crystal.webp"
            if item["resourceKey"] != "icon_crystal" or not (PUBLIC / image.lstrip("/")).is_file():
                raise ValueError(f"Missing reviewed Cookie collection reward icon for item {item_id}.")
            reward_items[item_id] = {"names": localized(db, item["name"]["key"]), "image": image}
        rewards.setdefault(row["rarityType"], []).append({
            "stars": row["grade"],
            "amount": int(row["rewardAmount"]),
            **reward_items[item_id],
        })
    if rewards.keys() != promotions.keys():
        raise ValueError("Cookie collection rewards do not cover all Cookie rarities.")
    for rarity, milestones in rewards.items():
        milestones.sort(key=lambda row: row["stars"])
        if [row["stars"] for row in milestones] != [row["stars"] for row in promotions[rarity]]:
            raise ValueError(f"Incomplete Cookie collection rewards for {rarity}.")
    return rewards


def write_art(source, cookie_id, name):
    output = IMAGE_DIR / cookie_id / f"{name}.webp"
    output.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as image:
        if source.suffix == ".webp":
            output.write_bytes(source.read_bytes())
        else:
            image.save(output, "WEBP", quality=91, method=6, exact=True)
        return {
            "src": "/" + output.relative_to(PUBLIC).as_posix(),
            "width": image.width,
            "height": image.height,
        }


SKILL_FIELDS = {
    "COOLDOWN": ("SkillPropertyModel", "Cooldown"),
    "AREA_RADIUS": ("AreaOfEffectModel", "Radius"),
    "AREA_RECT": ("AreaOfEffectModel", "Size"),
    "AREA_ANGLE": ("AreaOfEffectModel", "Angle"),
    "LIFETIME": ("SkillEntityDataModel", "LifeTime"),
    "DISAPPEAR_TIME": ("SkillCasterDisappearModel", "TimeToDisappear"),
    "DAMAGE_PERIOD": ("AffectedEntityListModel", "Period"),
    "HIT_COUNT_LIMIT": ("AreaOfEffectModel", "HitCountLimit"),
    "SPAWN_COUNT": ("SkillPropertyModel", "SpawnCount"),
    "SPEED": ("SkillEntityMovementModel", "Speed"),
    "REPRODUCE_COUNT": ("SkillEntityReproduceModel", "ReproduceCount"),
    "STATE_TRIGGER_VALUE": ("StateTriggerConditionModel", "IntValue"),
    "SUMMON_ATK_MULTIPLIER": ("SummonedCharacterModel", "AttackMultiplier"),
    "SUMMON_DEF_MULTIPLIER": ("SummonedCharacterModel", "DefenseMultiplier"),
    "SUMMON_HP_MULTIPLIER": ("SummonedCharacterModel", "HealthMultiplier"),
}

MODIFIER_FIELDS = {
    "MODIFIER_VALUE": ("modifyValue", 10000),
    "MODIFIER_VALUE_PERCENT": ("modifyValue", 100),
    "MODIFIER_APPLY_RATE": ("applyRate", 100),
    "MODIFIER_LIFE_TIME": ("lifetimeValue", 10000),
    "MODIFIER_STACK": ("maxStack", 1),
}

PREFAB_SKILL_STEPS = (0, 1, 3, 5, 7, 9)


def read_at(values, index):
    return values[index] if index is not None and 0 <= index < len(values) else None


def raw_value(value):
    # Prefab fields use Value while table BasisPoint fields use value.
    return value.get("Value", value.get("value")) if isinstance(value, dict) else value


def prefab_components(model):
    return {component["$type"]: component for component in model.get("Components", [])}


def spawner_rows(components):
    return components.get("SkillChildEntitySpawnerModel", {}).get("Models", [])


def child_prefabs(components):
    names = [row["SkillPrefab"] for row in spawner_rows(components)]
    reproduce = components.get("SkillEntityReproduceModel", {})
    # The final chained entity occupies the next skill child slot.
    if reproduce.get("UseFinalSkillPrefab"):
        names.append(reproduce["FinalSkillPrefab"])
    return names


def skill_target(load_prefab, character, step, index, child_indices):
    # Use the live character entity, never its Request/ preview variant.
    link = read_at(character.get(f"Skill{step}", []), index)
    name = link["SkillPrefab"] if link else None
    for child_index in child_indices:
        if not name:
            return {}
        name = read_at(child_prefabs(prefab_components(load_prefab(name))), child_index)
    return prefab_components(load_prefab(name)) if name else {}


def modifier_value(prop_type, modifier):
    field, divisor = MODIFIER_FIELDS[prop_type]
    value = raw_value(modifier.get(field))
    return Decimal(value) / divisor if value is not None else None


def skill_value(prop_type, components, modifier_index, modifiers):
    if prop_type in SKILL_FIELDS:
        component, field = SKILL_FIELDS[prop_type]
        value = raw_value(components.get(component, {}).get(field))
        if value is not None and prop_type.startswith("SUMMON_"):
            return Decimal(str(value)) * 100
        return value
    if prop_type in ("DAMAGE_MULTIPLIER", "KNOCK_BACK", "AIRBORNE"):
        field = {"DAMAGE_MULTIPLIER": "DamageMultiplier", "KNOCK_BACK": "KnockBack", "AIRBORNE": "AirborneDuration"}[prop_type]
        value = components.get("DamagePropertyModel", {}).get("DamagePropertyData", {}).get(field)
        return Decimal(str(value)) * 100 if value is not None and prop_type == "DAMAGE_MULTIPLIER" else value
    if prop_type == "MAX_SPAWN_COUNT":
        # Separate spawn entries are sequential actions (e.g. Rye's two pistols).
        counts = [raw_value(child.get("MaxSpawnCount")) for child in spawner_rows(components)]
        return sum(counts) if counts and all(value is not None for value in counts) else None
    if prop_type.removeprefix("SELF_") in MODIFIER_FIELDS:
        caster = components.get("AppendCharacterModifierToCasterModel", {})
        # A generic modifier row can refer to a self buff when the prefab has no on-hit modifiers.
        source = caster if prop_type.startswith("SELF_") else components.get("AppendCharacterModifierOnHitModel", caster)
        modifier_id = read_at(source.get("ModifierIds", []), modifier_index)
        return modifier_value(prop_type.removeprefix("SELF_"), modifiers.get(modifier_id, {}))
    return None


def format_skill_number(value):
    if isinstance(value, list):
        return " × ".join(format_skill_number(part) for part in value)
    return format(Decimal(str(value)).normalize(), "f")


def skill_display(prop_type, value, units, has_override):
    if value is not None:
        number = format_skill_number(value)
        return {locale: unit.replace("{0}", number) for locale, unit in units.items()}
    if prop_type == "DUMMY" and has_override and all("{0}" not in unit for unit in units.values()):
        return units
    return None


class SkillSource:
    def __init__(self, snapshot):
        self.decoded = snapshot / "database/decoded"
        self.texts = {row["skillPropertyType"]: row for row in read_json(self.decoded / "SkillPropertyTexts.json")}
        self.modifiers = {row["id"]: row for row in read_json(self.decoded / "Modifiers.json")}
        self.passives = defaultdict(list)
        for row in read_json(self.decoded / "Passives.json"):
            self.passives[row["id"]].append(row)
        for group in self.passives.values():
            group.sort(key=lambda row: row["order"])

    @lru_cache(maxsize=None)
    def prefab(self, name):
        return read_json(self.decoded / "raw-sources/entities_binary_set" / f"{name}.json")

    def passive_value(self, character, step, index, child_indices, prop_type):
        passive_id = read_at(character.get(f"PassiveIds{step}", []), index)
        row = read_at(self.passives.get(passive_id, []), child_indices[0]) if len(child_indices) == 1 else None
        return modifier_value(prop_type, self.modifiers[row["modifierId"]]) if row else None

    def metrics(self, db, resource_key, skill_id, promotion_curve):
        character = self.prefab(resource_key)
        metrics = []
        for result, in db.execute("SELECT record_json FROM skill_properties WHERE skill_id = ? ORDER BY sort_order", (skill_id,)):
            prop = json.loads(result)
            defaults = self.texts[prop["skillPropertyType"]]
            labels = localized(db, prop["overrideText"].get("tstring", defaults["defaultText"])["key"])
            units = localized(db, prop["overrideUnit"].get("tstring", defaults["defaultUnit"])["key"])
            prop_type = prop["skillPropertyType"].removeprefix("SKILLPROPERTYTYPE_")
            child_paths = [prop[f"skillChildIndex{i:02d}"] for i in range(1, 8)]
            child_indices = [path["int"] for path in child_paths if "int" in path]
            index = prop["skillIndex"]
            modifier_index = prop["skillModifierIndex"].get("int")
            values_by_step = {}
            for step in PREFAB_SKILL_STEPS:
                if prop["isPassive"]:
                    value = self.passive_value(character, step, index, child_indices, prop_type)
                else:
                    components = skill_target(self.prefab, character, step, index, child_indices)
                    value = skill_value(prop_type, components, modifier_index, self.modifiers)
                values_by_step[step] = skill_display(prop_type, value, units, "tstring" in prop["overrideUnit"])
            metrics.append({
                "id": str(prop["order"]),
                "group": index,
                "block": prop["skillPropertyBlock"],
                "passive": prop["isPassive"],
                "labels": labels,
                "values": [values_by_step[PREFAB_SKILL_STEPS[entry["skillStep"]]] for entry in promotion_curve],
            })
        return metrics


def import_details(snapshot):
    site = snapshot / "site/dist"
    source = read_json(site / "data/site-data.json")
    if source["meta"]["version"] != SOURCE_VERSION:
        raise ValueError(f"Review the new snapshot before updating {SOURCE_VERSION} data.")
    characters = {item["resourceKey"]: item for item in source["characters"]}
    codex_members = {
        cookie_id
        for entry in read_json(snapshot / "database/decoded/Codexs.json")
        if entry["codexType"] == "CODEXTYPE_COOKIE"
        for cookie_id in entry["cookieOrPetIds"]
    }
    promotions = read_promotions(snapshot)
    skill_source = SkillSource(snapshot)
    catalog = (ROOT / "src/data/cookies.ts").read_text(encoding="utf-8")
    cookie_ids = re.findall(r'^\s*\{\s*id: "([^"]+)"', catalog, flags=re.MULTILINE)
    resource_keys = {"cookie4011" if cookie_id == "chardonnay" else cookie_id for cookie_id in cookie_ids}
    if len(cookie_ids) != len(resource_keys) or resource_keys != set(characters):
        raise ValueError("The site's Cookie catalog does not match this game snapshot.")
    details = {}
    with sqlite3.connect((snapshot / "database/cookierun-crumble.sqlite").as_uri() + "?mode=ro", uri=True) as db:
        db.row_factory = sqlite3.Row
        codex_rewards = read_codex_rewards(snapshot, db, promotions)
        for cookie_id in cookie_ids:
            resource_key = "cookie4011" if cookie_id == "chardonnay" else cookie_id
            character = characters[resource_key]
            row = db.execute(
                "SELECT character_id, description_key FROM characters WHERE resource_key = ?",
                (resource_key,),
            ).fetchone()
            portrait = f"/images/cookies/{cookie_id}.webp"
            # The site portrait was checked against the original assets for each of these IDs.
            if not (PUBLIC / portrait.lstrip("/")).is_file():
                portrait = write_art(site / character["portrait"], cookie_id, "portrait")["src"]
            head = write_art(site / character["head"], cookie_id, "head")["src"]
            skills = []
            for index, skill in enumerate(character["skills"], 1):
                keys = db.execute("SELECT name_key, description_key FROM skills WHERE skill_id = ?", (skill["id"],)).fetchone()
                icon = write_art(site / skill["icon"], cookie_id, f"skill-{index}")["src"] if skill["icon"] else None
                skills.append({
                    "id": skill["id"],
                    "names": localized(db, keys["name_key"]),
                    "descriptions": localized(db, keys["description_key"]),
                    "icon": icon,
                    "metrics": skill_source.metrics(db, resource_key, skill["id"], promotions[character["rarityRaw"]]),
                })
            details[cookie_id] = {
                "names": character["names"],
                "descriptions": localized(db, row["description_key"]),
                "rarityRaw": character["rarityRaw"],
                "inCodex": int(row["character_id"]) in codex_members,
                "portrait": portrait,
                "head": head,
                "stats": [
                    {key: stat[key] for key in ("key", "value", "unit")}
                    for stat in character["stats"] if not stat["key"].startswith("skill")
                ],
                "skills": skills,
            }
    output = ROOT / "src/data/cookie-details.generated.json"
    data = {"profiles": details, "promotions": promotions, "codexRewards": codex_rewards}
    output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8", newline="\n")
    print(f"Imported {len(details)} Cookie profiles with skills and promotions.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("snapshot", type=Path, help="Path to the REA snapshot folder containing site and database.")
    import_details(parser.parse_args().snapshot.resolve())
