// Effect IDs, labels and icon paths match the REA Sugar Rune planner export.
const effects = {
  attack: { id: "1085150075", name: "ATK AMP", image: "/images/tools/icon_passive_attack__efbfd89f8ee1.png" },
  defense: { id: "1122482454", name: "DEF AMP", image: "/images/tools/icon_passive_defense__16d407dcfbe5.png" },
  health: { id: "1884385753", name: "HP AMP", image: "/images/tools/icon_passive_health__961c8fda1f56.png" },
  critical: { id: "1195842961", name: "CRIT%", image: "/images/tools/icon_passive_critrate__58a7fda39dcc.png" },
  criticalDamage: { id: "1370215206", name: "CRIT DMG", image: "/images/tools/icon_passive_critdamage__ff52c6f27dc7.png" },
  accuracy: { id: "1763247570", name: "Accuracy Rate", image: "/images/tools/icon_buff_accuracy_rate_increase__4bddeefc8059.png" },
  amplify: { id: "2001048058", name: "Skill AMP", image: "/images/tools/icon_passive_abilityamp__3f92bd68f181.png" },
  reduction: { id: "2059761495", name: "DMG Reduction", image: "/images/tools/icon_buff_damage_reduction__ed1fd4242764.png" },
  haste: { id: "1944163020", name: "Skill Haste", image: "/images/tools/icon_buff_skill_haste_increase__c6d70bb4ac10.png" },
  focus: { id: "1843270749", name: "Focus Rate Increase", image: "/images/tools/icon_passive_focus__2779a482e348.png" },
};

const picks = {
  attack: ["attack", "Raises damage that scales with ATK."],
  healAttack: ["attack", "Raises healing that scales with the caster’s ATK."],
  milkAttack: ["attack", "Raises both healing and the team ATK buff."],
  summonAttack: ["attack", "Raises the ATK inherited by summons."],
  armor: ["defense", "Adds defense when this Cookie takes repeated hits."],
  health: ["health", "Adds more HP to survive the next hit."],
  shieldHealth: ["health", "Strengthens shields that scale with the caster’s HP."],
  reviveHealth: ["health", "Raises maximum HP and the amount restored on revival."],
  selfHealHealth: ["health", "Raises maximum HP and the amount restored by the self-heal."],
  critical: ["critical", "Makes critical hits more frequent."],
  criticalDamage: ["criticalDamage", "Increases the damage of critical hits."],
  accuracy: ["accuracy", "Helps attacks connect when they keep missing."],
  skillDamage: ["amplify", "Boosts damage from eligible skill hits."],
  skillHealing: ["amplify", "Strengthens the healing portion of the skill."],
  skillShield: ["amplify", "Strengthens the shield portion of the skill."],
  skillBuff: ["amplify", "Strengthens eligible parts of the team buff."],
  cooldown: ["haste", "Shortens the wait between skill casts."],
  buffUptime: ["haste", "Helps reapply support effects before they expire."],
  debuffUptime: ["haste", "Gives this Cookie more chances to apply its debuff."],
  reduction: ["reduction", "Helps this Cookie survive long enough to cast again."],
  focus: ["focus", "Helps the debuff get past enemy Resistance."],
  poisonFocus: ["focus", "Helps poison stacks land against resistant enemies."],
} as const satisfies Record<string, readonly [keyof typeof effects, string]>;

type PickKey = keyof typeof picks;
type Build = readonly [PickKey, PickKey, PickKey];

const damage = ["attack", "skillDamage", "critical"] as const;
const criticalDamage = ["attack", "critical", "criticalDamage"] as const;
const frontlineDamage = ["attack", "skillDamage", "reduction"] as const;
const heal = ["healAttack", "skillHealing", "cooldown"] as const;
const teamBuff = ["skillBuff", "buffUptime", "reduction"] as const;
const control = ["debuffUptime", "focus", "reduction"] as const;

// Editorial priorities from the character's kit and the corresponding build guide where available.
const builds: Readonly<Record<string, Build>> = {
  cookie0001: ["reduction", "attack", "cooldown"],
  cookie0002: frontlineDamage,
  cookie0003: ["focus", "debuffUptime", "reduction"],
  cookie0007: criticalDamage,
  cookie0008: frontlineDamage,
  cookie0009: ["reduction", "health", "armor"],
  cookie0010: ["buffUptime", "reduction", "health"],
  cookie0011: frontlineDamage,
  cookie0012: heal,
  cookie0013: ["reviveHealth", "reduction", "armor"],
  cookie0015: ["reduction", "cooldown", "health"],
  cookie0018: teamBuff,
  cookie0020: ["buffUptime", "skillDamage", "reduction"],
  cookie0023: ["reduction", "focus", "health"],
  cookie0025: damage,
  cookie0027: ["shieldHealth", "buffUptime", "skillShield"],
  cookie0028: damage,
  cookie0034: ["attack", "skillDamage", "buffUptime"],
  cookie0035: damage,
  cookie0037: teamBuff,
  cookie0038: control,
  cookie0040: ["buffUptime", "reduction", "attack"],
  cookie0042: frontlineDamage,
  cookie0045: ["reduction", "health", "cooldown"],
  cookie0047: criticalDamage,
  cookie0048: damage,
  cookie0050: ["reduction", "debuffUptime", "health"],
  cookie0052: damage,
  cookie0053: ["skillBuff", "reduction", "attack"],
  cookie0054: heal,
  cookie0056: frontlineDamage,
  cookie0058: control,
  cookie0059: teamBuff,
  cookie0063: ["skillHealing", "healAttack", "buffUptime"],
  cookie0069: control,
  cookie0070: damage,
  cookie0072: ["attack", "buffUptime", "reduction"],
  cookie0081: ["reduction", "attack", "skillDamage"],
  cookie0101: damage,
  cookie0103: control,
  cookie0106: damage,
  cookie0107: damage,
  cookie0126: teamBuff,
  cookie0136: ["shieldHealth", "skillShield", "reduction"],
  cookie0181: ["poisonFocus", "skillDamage", "attack"],
  cookie0195: heal,
  cookie0250: ["reduction", "skillDamage", "attack"],
  cookie0502: frontlineDamage,
  cookie0503: ["summonAttack", "skillDamage", "reduction"],
  cookie0511: frontlineDamage,
  cookie0513: damage,
  cookie0515: criticalDamage,
  cookie0518: criticalDamage,
  cookie0522: criticalDamage,
  cookie0527: damage,
  cookie0532: teamBuff,
  cookie0570: ["reduction", "debuffUptime", "focus"],
  cookie0573: damage,
  cookie1004: frontlineDamage,
  cookie2006: damage,
  cookie3001: damage,
  cookie4001: criticalDamage,
  cookie4002: ["reduction", "health", "attack"],
  cookie4003: heal,
  cookie4006: ["summonAttack", "skillDamage", "cooldown"],
  cookie4010: ["focus", "reduction", "accuracy"],
  cookie4012: frontlineDamage,
  cookie4013: ["attack", "skillDamage", "criticalDamage"],
  cookie4017: heal,
  cookie4018: damage,
  cookie4019: ["milkAttack", "skillHealing", "buffUptime"],
  cookie4021: heal,
  cookie4022: frontlineDamage,
  cookie4023: criticalDamage,
  cookie4024: ["buffUptime", "reduction", "health"],
  cookie4025: control,
  chardonnay: teamBuff,
  cookie4014: ["shieldHealth", "summonAttack", "buffUptime"],
  cookie0672: damage,
  cookie0673: criticalDamage,
  cookie0674: ["selfHealHealth", "reduction", "cooldown"],
  cookie0675: control,
  cookie0676: criticalDamage,
  cookie0677: heal,
  cookie0678: ["buffUptime", "skillBuff", "reduction"],
};

export function cookieRuneRecommendations(cookieId: string) {
  const build = builds[cookieId];
  if (!build) throw new Error(`Missing Sugar Rune recommendations for ${cookieId}`);

  return build.map((pick) => {
    const [effect, reason] = picks[pick];
    return { ...effects[effect], reason };
  });
}
