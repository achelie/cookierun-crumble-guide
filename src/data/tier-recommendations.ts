import type { Locale } from "@/i18n/config";

export const recommendationRanks = ["S", "A"] as const;

export type RecommendationCopy = readonly [en: string, zhHant: string, ja: string, ko: string, th: string];
const copyIndex = { en: 0, "zh-Hant": 1, ja: 2, ko: 3, th: 4 } as const satisfies Record<Locale, number>;
export function recommendationText(copy: RecommendationCopy, locale: Locale) {
  return copy[copyIndex[locale]];
}

type Recommendation = {
  reason: RecommendationCopy;
  source: `/guides/${string}/` | `/teams/?category=${string}`;
};

const guide = <Slug extends string>(slug: Slug) => `/guides/cookie-run-crumble-${slug}/` as const;
const teams = <Category extends string>(category: Category) => `/teams/?category=${category}` as const;

export const tierRecommendations: Readonly<Record<string, Recommendation>> = {
  cookie4028: {
    source: teams("dungeons"),
    reason: [
      "Give Healthy Bagel Skill Haste to throw sandwiches more often. A sandwich can hit an enemy directly before the ingredients scatter, which helps clear waves in the EXP and Research Stone dungeons.",
      "貝果三明治配技能加速，能更常丟出三明治。三明治先砸中敵人，餡料接著散開，適合清經驗值和研究石副本的怪群。",
      "スキル加速を上げるとサンドを投げる回数が増えます。直撃でダメージを与えたあとに具材が飛び散るので、経験値や研究石ダンジョンの敵の群れに向いています。",
      "스킬가속을 올리면 샌드위치를 더 자주 던집니다. 샌드위치가 적을 직접 맞힌 뒤 재료가 흩어져 경험치 던전과 연구석 던전에서 몰려오는 적을 정리하기 좋습니다.",
      "เน้นเร่งสกิลให้แซนด์วิชเบเกิลเพื่อให้ขว้างได้บ่อยขึ้น แซนด์วิชที่โดนศัตรูจะสร้างความเสียหายก่อนที่ไส้จะกระจายออก เหมาะกับการกวาดฝูงศัตรูในดันเจี้ยน EXP และหินวิจัย",
    ],
  },
  cookie4026: {
    source: teams("guild-conquest"),
    reason: [
      "Moonlight raises allied Skill Amp and heals low-HP allies with bouncing stars. In Guild Conquest she can reach Cookies outside Pomegranate’s buff. Allies who receive both buffs use the higher bonus.",
      "月光魔法師提高隊友的技能增幅，星星還會在低血量隊友之間彈跳補血。打公會討伐時，她能照顧石榴沒加到的隊友。兩者同時加到同一隻餅乾時，只取較高的增幅。",
      "味方のスキル増幅を上げ、跳ねる星で体力の低い味方を回復します。ギルド討伐ではザクロの強化が届かない味方も支えられます。両方の強化を受けた味方には高い方の効果が適用されます。",
      "아군의 스킬증폭을 높이고 체력이 낮은 아군 사이를 튕기는 별로 회복시킵니다. 길드 토벌전에서는 석류맛 쿠키의 버프가 닿지 않는 아군도 지원합니다. 두 버프를 모두 받으면 높은 쪽만 적용됩니다.",
      "แสงจันทร์เพิ่มขยายสกิลให้ทีมและส่งดาวเด้งไปรักษาเพื่อนที่เลือดน้อย ในศึกกิลด์เธอช่วยเสริมให้เพื่อนที่ไม่ได้รับบัฟจากทับทิมได้ ถ้าเพื่อนรับทั้งสองบัฟจะใช้ค่าที่สูงกว่า",
    ],
  },
  cookie4027: {
    source: teams("dungeons"),
    reason: [
      "Sea Fairy summons droplets that strike groups and lift enemies. In the Dough Dungeon, pair her with Readyberry so the droplets benefit from summon Skill Haste.",
      "海妖精召喚的水滴會攻擊聚在一起的敵人並將他們擊飛。打麵團副本時搭配準備好莓，水滴也能吃到召喚物技能加速。",
      "海の妖精が召喚する水滴は、密集した敵を攻撃して打ち上げます。生地ダンジョンでレディベリーと組ませると、水滴にも召喚物のスキル加速が効きます。",
      "바다요정이 소환한 물방울은 모여 있는 적을 공격해 띄웁니다. 반죽 던전에서 레디베리와 함께 쓰면 물방울도 소환수 스킬가속 효과를 받습니다.",
      "นางฟ้าทะเลเรียกหยดน้ำมาโจมตีและยกศัตรูที่รวมกลุ่มกัน ในดันเจี้ยนแป้งให้จับคู่กับเรดี้เบอร์รี่เพื่อให้หยดน้ำได้รับผลเร่งสกิลสิ่งอัญเชิญ",
    ],
  },
  cookie0136: {
    source: teams("dungeons"),
    reason: [
      "Ion shields itself and low-HP allies when it charges. After transforming, it shields the whole team. Use it in the Rune Crystal Dungeon when your attackers need time to recover.",
      "離子餅乾機器人衝鋒時會替自己和低血量隊友套盾，變身後再替全隊套盾。打符文結晶副本時，可以用它替輸出餅乾爭取回血的時間。",
      "突進時に自分と体力の低い味方にシールドを張り、変身後は味方全員を守ります。ルーン結晶ダンジョンで攻撃役の回復が間に合わないときに役立ちます。",
      "돌진할 때 자신과 체력이 낮은 아군에게 보호막을 주고, 변신하면 아군 전체에 보호막을 씌웁니다. 룬결정 던전에서 딜러가 회복할 시간을 벌어 줍니다.",
      "โรบอตไอออนพุ่งชนพร้อมสร้างโล่ให้ตัวเองและเพื่อนที่เลือดน้อย เมื่อแปลงร่างจะให้โล่ทั้งทีม ใช้ในดันเจี้ยนผลึกรูนเพื่อให้ตัวทำดาเมจมีเวลาฟื้นเลือด",
    ],
  },
  cookie0678: {
    source: guide("caine-guild-conquest-team"),
    reason: [
      "He raises team ATK and grants Duration. That combination helps the damage dealers in Guild Conquest and several daily dungeons. Try him in Cheesecake’s slot first and keep Milk for healing.",
      "他提高全隊攻擊力並提供持續連攜，公會討伐和多個每日副本都用得上。先用他替換起司蛋糕，留下牛奶負責治療。",
      "味方の攻撃力を上げ、持続シナジーも付与します。ギルド討伐や複数のデイリーダンジョンで火力を支えます。まずチーズケーキと交代し、回復役のミルクは残しましょう。",
      "아군 공격력을 올리고 지속 시너지를 부여해 길드 토벌과 여러 일일 던전에서 딜러를 지원합니다. 먼저 치즈케이크와 교체하고 회복을 맡는 우유는 남겨 보세요.",
      "เพิ่มพลังโจมตีให้ทีมและมอบซินเนอร์จี้ต่อเนื่อง จึงช่วยตัวทำดาเมจทั้งในศึกกิลด์และดันเจี้ยนรายวันหลายแห่ง ลองแทนชีสเค้กก่อนและเก็บมิลค์ไว้ฮีล",
    ],
  },
  cookie0676: {
    source: teams("guild-conquest"),
    reason: [
      "The fizzy volley sweeps enemies in front, making Zooble a strong pick for mini piñatas and crowded dungeon waves. Repeated hits lose damage on the same target, so use a boss specialist when there are no adds.",
      "泡泡齊射能掃過前方敵人，擅長清小皮納塔和密集的副本怪群。連續命中同一目標時傷害會遞減；打沒有小怪的王，單體打手更合適。",
      "泡の一斉射撃で前方の敵をまとめて攻撃でき、小型ピニャータや敵の多いダンジョンで活躍します。同じ敵への連続ヒットは威力が落ちるので、取り巻きのいないボスには単体火力役を。",
      "거품 연사로 전방을 쓸어 작은 피냐타와 몹이 많은 던전에 강합니다. 같은 대상에 연속으로 맞히면 피해가 줄어드니, 잡몹이 없는 보스에는 단일 딜러가 더 적합합니다.",
      "ยิงฟองกวาดศัตรูด้านหน้าได้ดี เหมาะกับปิญาตาขนาดเล็กและดันเจี้ยนที่มีมอนสเตอร์เป็นฝูง การยิงซ้ำเป้าหมายเดิมจะแรงน้อยลง ถ้าบอสไม่มีลูกน้องให้ใช้ตัวโจมตีเป้าเดียว",
    ],
  },
  cookie0672: {
    source: teams("dungeons"),
    reason: [
      "Her bouncing shot makes the most of crowded fights. She pairs well with Zooble against the piñata and already has a spot in the Dough and Research Stone dungeon presets.",
      "反彈子彈在敵人扎堆時更好發揮，和祖波一起打皮納塔很合拍。麵團與研究石副本的推薦陣容也都有她的位置。",
      "跳ね返る弾は敵が密集した戦いで力を発揮します。ピニャータではズーブルと相性がよく、生地と研究石のダンジョン編成にも入ります。",
      "튕기는 탄환은 적이 몰린 전투에서 빛납니다. 피냐타전에서 주블과 잘 맞고, 반죽과 연구석 던전 추천 조합에도 자리가 있습니다.",
      "กระสุนเด้งไปมาได้คุ้มเมื่อศัตรูอยู่กันแน่น จับคู่กับซูเบิ้ลสู้ปิญาตาได้ดี และอยู่ในทีมแนะนำของดันเจี้ยนแป้งโดกับหินวิจัย",
    ],
  },
  chardonnay: {
    source: guide("chardonnay-auto-story-team"),
    reason: [
      "Her wave hits enemies and gives allies in its path more crit chance and push resistance. That mix makes the Bari and Cherry Cola story team easier to run on auto. Check who stands in the wave before changing gear.",
      "波浪一邊打敵人，一邊給路徑上的隊友暴擊率和抗擊退。這讓鉢里公主和櫻桃可樂的主線隊更適合自動打；換裝前先看波浪有沒有掃到主力。",
      "波は敵に当たり、範囲内の味方には会心率と押し出し耐性を付与します。バリ姫とチェリーコーラのストーリー編成をオートで回しやすくなります。装備を替える前に波が誰に届くか確認しましょう。",
      "파도가 적을 공격하고 경로 안의 아군에게 치명타 확률과 밀치기 저항을 줍니다. 바리 공주와 체리콜라의 스테이지 자동 전투가 한결 편해집니다. 장비를 바꾸기 전에 파도가 주력에게 닿는지 보세요.",
      "คลื่นโจมตีศัตรูและเพิ่มโอกาสคริติคอลกับต้านการผลักให้เพื่อนในแนวคลื่น ช่วยให้ทีมเจ้าหญิงบารีกับเชอร์รี่โคล่าเล่นเนื้อเรื่องแบบออโต้ง่ายขึ้น เช็กตำแหน่งตัวหลักก่อนเปลี่ยนอุปกรณ์",
    ],
  },
  cookie4013: {
    source: guide("brightseeker-cookie-build-team"),
    reason: [
      "Drone lasers and shockwaves make him a reliable auto pick for story, dungeons, and bosses. The extra drone at five stars matters; a well-built Scorpion can still win a clean single-target run.",
      "無人機的雷射和衝擊波讓他在主線、副本和打王時都能穩定自動作戰。五星多一架無人機很關鍵；單體戰若順利疊毒，養好的蠍子仍可能打得更高。",
      "ドローンのレーザーと衝撃波で、ストーリーやダンジョン、ボス戦を安定してオート周回できます。星5の追加ドローンが大きく、単体に毒を重ねられるなら育ったスコーピオンが上回ることも。",
      "드론 레이저와 충격파로 스테이지, 던전, 보스 자동 전투가 안정적입니다. 5성의 추가 드론이 중요하며, 독을 잘 쌓는 단일 보스전에서는 육성된 스콜피온이 더 강할 수 있습니다.",
      "เลเซอร์กับคลื่นกระแทกจากโดรนทำให้ออโต้ได้เสถียรทั้งเนื้อเรื่อง ดันเจี้ยน และบอส โดรนเพิ่มที่ห้าดาวสำคัญมาก แต่สกอร์เปียนที่ปั้นดีอาจทำดาเมจสูงกว่าในศึกเป้าเดียวที่ซ้อนพิษได้เต็ม",
    ],
  },
  cookie4010: {
    source: guide("pinot-noir-cookie-build"),
    reason: [
      "He grants Rapid Fire, helps allies stay on the ground, and cuts enemy healing. That earns him a slot in boss damage teams and aggressive Arena teams, even when his own damage isn’t the biggest number.",
      "他提供連打連攜、幫隊友抵抗擊飛，還能壓低敵方回血。就算個人輸出不是最高，打王隊和競技場快攻隊都能用到他。",
      "連打シナジーを付与し、味方を打ち上げから守り、敵の回復も抑えます。本人の火力が一番でなくても、ボスの火力編成と速攻アリーナ編成の両方で役割があります。",
      "연타 시너지를 주고 아군의 띄우기를 막으며 적의 회복도 줄입니다. 본인 피해량이 가장 높지 않아도 보스 딜 조합과 아레나 속공 조합 모두에 들어갈 이유가 있습니다.",
      "มอบซินเนอร์จี้โจมตีต่อเนื่อง ช่วยให้เพื่อนไม่ถูกยก และลดการฟื้นฟูของศัตรู มีที่ทั้งในทีมตีบอสและทีมอารีน่าบุกเร็ว แม้ดาเมจส่วนตัวจะไม่สูงสุด",
    ],
  },
  cookie0250: {
    source: guide("cherry-cola-auto-stage-team"),
    reason: [
      "After several swings she dives at a high-ATK enemy. Bari’s protection helps her stay in range long enough to get there, which is why the pair works for auto story and opening pressure in Arena.",
      "揮砍幾次後，她會突進高攻敵人。鉢里公主能保她撐到突進，這組合適合自動推主線，也能在競技場開場施壓。",
      "何度か斬りつけた後、攻撃力の高い敵に突進します。バリ姫に守ってもらうと突進まで生き残りやすく、ストーリーのオート周回やアリーナの先手に向きます。",
      "몇 번 벤 뒤 공격력이 높은 적에게 돌진합니다. 바리 공주가 돌진까지 버티도록 도와주기 때문에 둘을 쓰면 스테이지 자동 전투와 아레나 초반 압박에 좋습니다.",
      "หลังฟันหลายครั้งจะพุ่งใส่ศัตรูพลังโจมตีสูง เจ้าหญิงบารีช่วยให้เธอยืนได้นานพอจะพุ่ง ทั้งคู่จึงเหมาะกับออโต้เนื้อเรื่องและเปิดเกมกดดันในอารีน่า",
    ],
  },
  cookie4019: {
    source: guide("caine-guild-conquest-team"),
    reason: [
      "This Milk variant heals, raises ATK, and grants Duration from one slot. Keep him when trying Caine in Guild Conquest: taking out the healer at the same time makes it hard to tell which change helped.",
      "這個牛奶版本一個位置就能補血、加攻和提供持續連攜。公會討伐試用凱恩時先保留他，才看得出分數變化是不是凱恩帶來的。",
      "このミルクは一枠で回復、攻撃力アップ、持続シナジーを担当します。ギルド討伐でケインを試すときも残すと、どの交代がスコアに効いたか判断できます。",
      "이 우유 버전은 한 자리에서 회복, 공격력 증가, 지속 시너지를 맡습니다. 길드 토벌에서 케인을 시험할 때도 남겨야 어느 교체가 점수에 영향을 줬는지 알 수 있습니다.",
      "มิลค์ร่างนี้ฮีล เพิ่มพลังโจมตี และมอบซินเนอร์จี้ต่อเนื่องได้ในช่องเดียว ตอนลองเคนในศึกกิลด์ให้เก็บมิลค์ไว้ จะได้รู้ว่าการสลับตัวไหนเปลี่ยนคะแนน",
    ],
  },
  cookie0126: {
    source: guide("pinot-noir-multistrike-scorpion-teams"),
    reason: [
      "Her beam boosts allies’ skill damage and grants Projectile Speed. She fits both the rapid-hit and Scorpion boss lineups, so she is an easy support to keep when changing attackers.",
      "光束能強化隊友的技能傷害，還提供投射物速度連攜。連打隊和蠍子打王隊都用得到，換打手時她通常可以留下。",
      "ビームで味方のスキル火力を上げ、発射体速度シナジーを付与します。連打編成にもスコーピオン軸のボス編成にも合うので、火力役を替えても残しやすいです。",
      "광선으로 아군 스킬 피해를 높이고 투사체 속도 시너지를 줍니다. 연타 덱과 스콜피온 보스 덱 모두에 맞아 딜러를 바꿀 때도 남기기 좋습니다.",
      "ลำแสงเพิ่มความแรงสกิลให้เพื่อนและมอบซินเนอร์จี้ความเร็วกระสุน ใช้ได้ทั้งทีมโจมตีต่อเนื่องและทีมบอสสกอร์เปียน จึงเก็บไว้ได้แม้เปลี่ยนตัวทำดาเมจ",
    ],
  },
  cookie0532: {
    source: guide("caine-guild-conquest-team"),
    reason: [
      "He gives allies bonus boss damage in Guild Conquest, a distinct job in the Caine lineup. That mode-specific boost earns his spot; do not expect the same team buff in Arena.",
      "他在公會討伐能提高隊友對王的傷害，在凱恩隊有明確位置。這項模式限定的加成就是上榜理由，競技場不會提供同樣效果。",
      "ギルド討伐で味方のボスへのダメージを上げる、ケイン編成の専任枠です。このモード限定の強みが評価点で、アリーナでは同じ味方バフは得られません。",
      "길드 토벌에서 아군 보스 피해량을 높이는 케인 조합의 전담 자원입니다. 이 모드 전용 효과가 강점이며, 아레나에서는 같은 버프를 기대할 수 없습니다.",
      "เพิ่มดาเมจที่เพื่อนทำใส่บอสในศึกกิลด์ เป็นหน้าที่เฉพาะในทีมเคน จุดเด่นนี้ใช้เฉพาะโหมดดังกล่าว อย่าคาดหวังบัฟแบบเดียวกันในอารีน่า",
    ],
  },
  cookie0181: {
    source: guide("accuracy-focus-guide"),
    reason: [
      "Stacking poison gives her a high ceiling in long boss fights. Check Accuracy if attacks miss and Focus if the poison gets resisted. She needs time to build stacks before the damage pays off.",
      "毒能一層層疊上去，打長時間單體王的上限很高。打不中先查命中，打中了卻沒上毒就查效果命中；要給她時間疊毒才看得出傷害。",
      "毒を重ねられる長いボス戦で火力が伸びます。攻撃が外れるなら命中、当たっても毒を弾かれるなら効果命中を確認しましょう。重ねる時間が必要です。",
      "독 중첩 덕분에 긴 보스전에서 높은 피해를 낼 수 있습니다. 공격이 빗나가면 명중, 공격은 맞는데 독이 저항당하면 효과 적중을 확인하세요. 중첩을 쌓을 시간이 필요합니다.",
      "พิษซ้อนได้จึงทำดาเมจสูงในศึกบอสยาว ถ้าโจมตีพลาดให้ดูค่าความแม่นยำ ถ้าโจมตีโดนแต่พิษถูกต้านให้ดูค่าการติดเอฟเฟกต์ ต้องให้เวลาเธอสะสมพิษ",
    ],
  },
  cookie4014: {
    source: teams("pvp"),
    reason: [
      "She shields summons and makes them cast more often. That can buy time for your Arena lineup, but she has much less to do if the team runs only a few summons.",
      "她能給召喚物護盾，讓它們更頻繁出招，適合拿來拖住競技場對手。如果隊裡幾乎沒有召喚物，這個位置的收益就小很多。",
      "召喚物をシールドで守り、スキルの回転を速めます。アリーナで時間を稼げますが、召喚物が少ない編成だと強みを生かしにくいです。",
      "소환수에 보호막을 주고 스킬을 더 자주 쓰게 합니다. 아레나에서 시간을 벌기 좋지만 소환수가 적은 조합에선 이점이 크게 줄어듭니다.",
      "ให้โล่แก่ตัวอัญเชิญและทำให้ใช้สกิลบ่อยขึ้น ช่วยซื้อเวลาในอารีน่า แต่ถ้าทีมมีตัวอัญเชิญน้อย จุดเด่นนี้ก็มีประโยชน์ลดลง",
    ],
  },
  cookie0518: {
    source: guide("strawberry-crepe-cookie-build-team"),
    reason: [
      "Fast area hits and knockback give this defender real damage while clearing waves. In Bari story teams, swap to a shield or healer if survival is the problem rather than the wave timer.",
      "快速範圍攻擊帶擊退，讓這個防禦角也能打出清怪傷害。鉢里主線隊如果是先倒下而不是打超時，就換護盾角或補師。",
      "素早い範囲攻撃と押し出しで、防御型でも敵の波を削れます。バリ姫のストーリー編成で時間切れより全滅が先なら、シールド役か回復役を試しましょう。",
      "빠른 범위 공격과 밀치기 덕분에 방어형이면서 웨이브 정리에도 기여합니다. 바리 스테이지 조합에서 시간 부족보다 전멸이 문제라면 보호막이나 힐러를 넣어 보세요.",
      "โจมตีวงกว้างได้เร็วและผลักศัตรู จึงช่วยกวาดมอนสเตอร์ได้แม้เป็นตัวป้องกัน ถ้าทีมบารีในเนื้อเรื่องแพ้เพราะตายก่อนมากกว่าเคลียร์ไม่ทัน ให้ลองใช้ตัวโล่หรือตัวฮีล",
    ],
  },
  cookie0018: {
    source: guide("caine-guild-conquest-team"),
    reason: [
      "Her ice gives teammates crit damage and Chain. She is a useful support slot in Guild Conquest and story, but allies need to step on the ice for the buff to pay off.",
      "冰面能給隊友暴擊傷害和連鎖連攜。公會討伐和主線都能放她，不過要讓主力踩到冰面才吃得到加成。",
      "氷に乗った味方の会心ダメージを上げ、連鎖シナジーを付与します。ギルド討伐やストーリーで便利ですが、主力が氷を踏める配置にしましょう。",
      "빙판을 밟은 아군의 치명타 피해를 높이고 연쇄 시너지를 줍니다. 길드 토벌과 스테이지에서 유용하지만 주력 딜러가 빙판에 닿도록 배치해야 합니다.",
      "เพื่อนที่เหยียบน้ำแข็งจะได้ดาเมจคริติคอลและซินเนอร์จี้ลูกโซ่ เหมาะกับศึกกิลด์และเนื้อเรื่อง แต่ต้องวางตำแหน่งให้ตัวทำดาเมจเดินผ่านน้ำแข็ง",
    ],
  },
  cookie4024: {
    source: guide("arena-healing-down-team-guide"),
    reason: [
      "It cuts damage taken by nearby allies and knocks back enemies around it. That makes it a useful Arena flag holder and a safer pick when healing alone cannot get the team through the opener.",
      "牠替附近隊友減傷，也會擊退周圍敵人。適合在競技場拿旗；光靠補血扛不住開場時，也可以用牠保隊友。",
      "近くの味方の被ダメージを減らし、周囲の敵を押し返します。アリーナの旗持ちに向き、回復だけでは開幕を耐えられないときにも頼れます。",
      "주변 아군이 받는 피해를 줄이고 가까운 적을 밀쳐냅니다. 아레나 깃발 담당으로 좋고, 회복만으로 첫 공세를 버티기 어려울 때도 안전한 선택입니다.",
      "ลดดาเมจที่เพื่อนใกล้ตัวได้รับและผลักศัตรูรอบข้าง เหมาะเป็นตัวถือธงในอารีน่าและช่วยทีมที่ฮีลอย่างเดียวไม่พอรอดช่วงเปิด",
    ],
  },
  cookie0063: {
    source: guide("arena-healing-down-team-guide"),
    reason: [
      "He heals nearby allies and grants Volley, useful when the team needs one more attack cycle to win. In Arena, compare him with a shield or control pick if healing reduction keeps undoing his work.",
      "他治療附近隊友並提供齊射連攜，隊伍只差多放一輪技能時很有用。競技場若常被禁療或壓回血，可以試著和護盾、控場角比較。",
      "近くの味方を回復して一斉射撃シナジーを付与します。もう一回スキルを回せば勝てるときに便利です。アリーナで回復を抑えられるなら、シールド役や妨害役と比べましょう。",
      "주변 아군을 회복시키고 일제 사격 시너지를 줍니다. 스킬 한 번만 더 쓰면 이길 수 있는 전투에 좋습니다. 아레나에서 회복 감소에 막힌다면 보호막이나 제어 요원과 비교해 보세요.",
      "ฮีลเพื่อนใกล้ตัวและมอบซินเนอร์จี้ยิงพร้อมกัน เหมาะเมื่อทีมต้องการรอดเพื่อออกสกิลอีกหนึ่งรอบ ถ้าอารีน่าลดการฮีลจนไม่คุ้ม ให้ลองเทียบกับตัวโล่หรือตัวคุมศัตรู",
    ],
  },
};
