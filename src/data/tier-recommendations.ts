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
  cookie4025: {
    source: teams("pvp"),
    reason: [
      "She cuts nearby enemies’ ATK and crit chance while taking a frontline slot. That buys time in Arena and on story runs where the team dies before its damage dealers get going.",
      "她能扛前排，同時壓低附近敵人的攻擊力和暴擊率。競技場被開場打崩，或主線打手還沒出招就倒下時，她能幫隊伍撐住。",
      "前衛を務めながら近くの敵の攻撃力と会心率を下げます。アリーナやストーリーで火力役が動く前に崩れるとき、攻撃の時間を稼げます。",
      "앞줄에 서면서 주변 적의 공격력과 치명타 확률을 낮춥니다. 아레나나 스테이지에서 딜러가 스킬을 쓰기도 전에 쓰러질 때 시간을 벌어 줍니다.",
      "ยืนแนวหน้าและลดพลังโจมตีกับโอกาสคริติคอลของศัตรูใกล้ตัว ช่วยซื้อเวลาในอารีน่าหรือด่านเนื้อเรื่องที่ตัวทำดาเมจยังไม่ทันออกสกิล",
    ],
  },
  cookie0081: {
    source: guide("princess-bari-cookie-build-team"),
    reason: [
      "She dives at a high-ATK target and protects fellow Charge Cookies from disruption. That makes her a strong story and Arena opener. Give her time to survive the opening before judging the damage.",
      "她會突進攻擊高攻目標，還能保護其他突擊型隊友不被打亂。主線和競技場都適合由她開場，先確保她撐過第一波再看輸出。",
      "攻撃力の高い敵に突進し、味方の突撃型を妨害から守ります。ストーリーでもアリーナでも先手を取れる一人。火力を比べる前に、開幕を生き残れるか見ましょう。",
      "공격력이 높은 적에게 돌진하고 아군 돌격형이 방해받지 않도록 돕습니다. 스테이지와 아레나의 선봉에 잘 맞습니다. 피해량을 보기 전에 첫 공세를 버티는지 확인하세요.",
      "พุ่งใส่ศัตรูพลังโจมตีสูงและป้องกันเพื่อนสายจู่โจมจากการขัดจังหวะ จึงเปิดเกมได้ดีทั้งเนื้อเรื่องและอารีน่า ให้เธอรอดช่วงเปิดก่อนค่อยดูดาเมจ",
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
  cookie0070: {
    source: guide("guild-conquest-team-guide"),
    reason: [
      "His piercing shot hits a line of enemies. That pays off in Coin Dungeon and piñata fights when you can line up the wave, especially if he is already one of your better-promoted attackers.",
      "穿透箭能打一整條線。金幣副本和皮納塔戰把怪排成一線就能發揮，尤其適合已經把他升到較高星級的玩家。",
      "貫通矢で一直線の敵を攻撃します。コインダンジョンやピニャータ戦で敵を一列に集めると強く、すでに昇級が進んでいるなら特に使いやすいです。",
      "관통 화살로 일직선의 적을 맞힙니다. 코인 던전이나 피냐타전에서 몹을 한 줄에 모으면 강하고, 이미 승급이 잘 된 딜러라면 더욱 쓸 만합니다.",
      "ลูกธนูทะลุศัตรูเป็นแนวตรง คุ้มในดันเจี้ยนเหรียญและศึกปิญาตาเมื่อจัดให้ศัตรูเรียงแนวได้ ยิ่งดีถ้าเขาเป็นตัวโจมตีที่มีดาวสูงอยู่แล้ว",
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
  cookie0103: {
    source: guide("jax-cookie-build-team"),
    reason: [
      "His lightning lowers DEF and pushes enemies back, giving the rest of the team a better damage window. He is the benchmark for Jax swaps: check that DEF Down lands on the boss before judging either run.",
      "閃電會降防和擊退，給全隊更好的輸出窗口。試用傑克斯時可以用他作基準，先確認降防真的掛到王身上再比成績。",
      "雷で敵の防御力を下げて押し返し、味方が火力を出す時間を作ります。ジャックスとの入れ替え比較では、防御力ダウンがボスに付いたかを先に見ましょう。",
      "번개로 적을 밀쳐내고 방어력을 낮춰 팀의 딜 타이밍을 만듭니다. 잭스와 교체 비교를 할 때는 먼저 보스에게 방어력 감소가 들어갔는지 보세요.",
      "สายฟ้าผลักศัตรูและลดพลังป้องกัน เปิดจังหวะให้ทีมทำดาเมจ ใช้เขาเป็นตัวเทียบกับแจ็กซ์ โดยเช็กก่อนว่าบอสติดลดป้องกันจริง",
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
  cookie0059: {
    source: guide("chardonnay-auto-story-team"),
    reason: [
      "She raises allies’ crit chance and grants Range, two useful perks in story, dungeon, and Arena lineups. If Chardonnay already covers crit, compare the two slots before doubling up.",
      "她提高隊友暴擊率並提供範圍連攜，主線、副本、競技場都用得到。夏多內已經提供暴擊率時，先比較兩個位置的實際收益再決定要不要一起上。",
      "味方の会心率を上げ、範囲シナジーを付与します。ストーリー、ダンジョン、アリーナのどれにも出番があります。シャルドネで会心率を補えているなら、二人を並べる前に効果を比べましょう。",
      "아군 치명타 확률을 올리고 범위 시너지를 줘 스테이지, 던전, 아레나에 두루 쓰입니다. 샤르도네로 치명타를 챙겼다면 두 자리를 함께 쓰기 전에 효율을 비교하세요.",
      "เพิ่มโอกาสคริติคอลและมอบซินเนอร์จี้ระยะให้เพื่อน ใช้ได้ทั้งเนื้อเรื่อง ดันเจี้ยน และอารีน่า ถ้าชาร์ดอเนย์เพิ่มคริติคอลอยู่แล้ว ให้เทียบผลก่อนใส่ทั้งคู่",
    ],
  },
  cookie0003: {
    source: guide("arena-power-gap-guide"),
    reason: [
      "Early accounts can use his ATK Down to survive GingerCraven or a punishing dungeon. Keep the slot while it prevents wipes, then compare your team Power and clear time once you can already survive.",
      "新手可以靠他的降攻撐過薑餅巨怪或難打的副本。只要能防滅團就值得留；隊伍能活下來後，再比較換人的戰力和通關時間。",
      "序盤は攻撃力ダウンでジンジャークレイヴンや厳しいダンジョンを耐えやすくなります。全滅を防いでいる間は残し、安定したら交代時の戦闘力とクリアタイムを比べましょう。",
      "초반에는 공격력 감소로 진저크레이븐이나 까다로운 던전을 버틸 수 있습니다. 전멸을 막아 주는 동안 쓰고, 생존이 안정되면 교체 전후 전투력과 클리어 시간을 비교하세요.",
      "ช่วงต้นเกมใช้ลดพลังโจมตีเพื่อรอดจากจินเจอร์เครเวนหรือดันเจี้ยนยากได้ เก็บไว้ตราบที่ยังช่วยกันทีมล้ม พอรอดได้แล้วค่อยเทียบพลังทีมกับเวลาเคลียร์หลังสลับตัว",
    ],
  },
  cookie0673: {
    source: guide("jax-cookie-build-team"),
    reason: [
      "His bat hits hard and his grenade lowers DEF, making him a good single-boss swap for Dark Choco. Adds can draw the grenade away from the boss, which makes him less dependable in wave fights.",
      "球棒打得痛，手榴彈還能降防，打單體王時可試著換下黑巧克力。小怪會搶走手榴彈的目標，所以怪群戰比較不穩。",
      "バットの一撃が強く、手榴弾で防御力も下げられるので、単体ボスならダークチョコとの交代候補です。取り巻きに手榴弾が向くことがあり、敵が多い戦いでは安定しません。",
      "방망이 피해가 강하고 수류탄으로 방어력을 낮춰 단일 보스에서 다크초코 대신 시험해 볼 만합니다. 잡몹 쪽으로 수류탄이 빗나갈 수 있어 웨이브에서는 덜 안정적입니다.",
      "ไม้ตีแรงและระเบิดลดพลังป้องกัน จึงน่าลองแทนดาร์กช็อกโก้เมื่อสู้บอสตัวเดียว ลูกน้องอาจล่อระเบิดออกจากบอส ทำให้สู้ศัตรูเป็นระลอกได้ไม่สม่ำเสมอ",
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
  cookie3001: {
    source: guide("pinot-noir-multistrike-scorpion-teams"),
    reason: [
      "Her fast forward shots fit a Rapid Fire team with Pinot Noir and give boss lineups a steady attacker. Point her at the target; the shots are less useful when the fight spreads out.",
      "向前方快速連射，適合搭配黑皮諾的連打隊，打王時能穩定補輸出。把她對準主要目標，敵人散開時連射比較難打滿。",
      "前方への素早い連射がピノ・ノワールの連打編成と好相性で、ボス戦の安定した火力になります。狙いたい敵へ向けましょう。敵が散ると弾が届きにくくなります。",
      "빠른 전방 연사로 피노 누아의 연타 덱에 잘 맞고 보스전에서 꾸준히 피해를 넣습니다. 주 대상 쪽을 향하게 하세요. 적이 흩어지면 연사를 온전히 맞히기 어렵습니다.",
      "ยิงไปข้างหน้าได้เร็ว เข้ากับทีมโจมตีต่อเนื่องของปิโนต์นัวร์และทำดาเมจบอสได้สม่ำเสมอ หันให้ตรงเป้าหมาย เพราะเมื่อศัตรูกระจายตัวกระสุนจะเข้าไม่ครบ",
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
  cookie0573: {
    source: teams("dungeons"),
    reason: [
      "Her train hits and pushes enemies in its path, helping clear Coin, Dough, and EXP waves. Place her so the train crosses the pack; she is less compelling against a lone boss.",
      "夢境列車沿路打傷並擊退敵人，金幣、麵團和經驗副本都能拿來清怪。讓列車穿過怪群；只剩單體王時就沒那麼突出。",
      "列車が進路上の敵を攻撃して押し返し、コイン・生地・経験値ダンジョンの敵を片付けます。群れを横切る向きに置きましょう。単体ボスでは優先度が下がります。",
      "기차가 지나가는 적을 공격하고 밀쳐 코인, 반죽, 경험치 던전의 웨이브 정리에 좋습니다. 기차가 몹을 가로지르도록 배치하세요. 단일 보스전에서는 우선순위가 낮습니다.",
      "รถไฟโจมตีและผลักศัตรูตามทาง ช่วยกวาดดันเจี้ยนเหรียญ แป้งโด และค่าประสบการณ์ จัดให้รถไฟวิ่งผ่านฝูงมอนสเตอร์ ถ้าเจอบอสตัวเดียวจะเด่นน้อยลง",
    ],
  },
  cookie0513: {
    source: teams("dungeons"),
    reason: [
      "His wide attacks and black hole help control packed waves. Use him in the Dough Dungeon or with Witchberry in Plaque Tower when clearing groups is what holds you back.",
      "大範圍攻擊和黑洞適合壓住密集怪群。麵團副本清不動怪，或徽章塔被怪群卡住時，可以用他；塔隊也有他和魔法莓果的組合。",
      "広い攻撃範囲とブラックホールで密集した敵を抑えます。群れを処理できないときは生地ダンジョンで起用したり、プレートタワーでウィッチベリーと組ませたりできます。",
      "넓은 공격 범위와 블랙홀로 몰린 적을 제어합니다. 몹 정리가 막히면 반죽 던전이나 마녀베리와 함께하는 플레이트 탑 조합에서 써 보세요.",
      "การโจมตีวงกว้างกับหลุมดำช่วยคุมศัตรูที่กระจุกตัว ลองใช้ในดันเจี้ยนแป้งโดหรือคู่กับวิชเบอร์รี่ในหอคอยแผ่นป้ายเมื่อทีมติดปัญหาเคลียร์มอนสเตอร์",
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
  cookie0515: {
    source: guide("rye-cookie-build-team"),
    reason: [
      "Rapid pistol shots give her an affordable boss damage slot, especially with Pinot Noir. Keep her if she is already well promoted; extra investment is harder to justify when the team needs area damage instead.",
      "快速手槍連射讓她成為好養的打王輸出，搭黑皮諾尤其合拍。星級已經高就值得留；隊伍缺的是範圍輸出時，不必硬把資源投給她。",
      "素早いピストル連射で、育てやすいボス火力役になります。ピノ・ノワールとは特に好相性です。昇級が進んでいれば使い続け、範囲火力が不足するなら他を優先しましょう。",
      "빠른 권총 연사로 육성 부담이 낮은 보스 딜러입니다. 특히 피노 누아와 잘 맞습니다. 승급이 높다면 유지하되, 팀에 범위 피해가 부족하면 다른 곳에 투자하세요.",
      "ยิงปืนรัวจึงเป็นตัวทำดาเมจบอสที่ปั้นไม่แพง โดยเฉพาะคู่กับปิโนต์นัวร์ ถ้าดาวสูงอยู่แล้วให้ใช้ต่อ แต่ถ้าทีมขาดดาเมจวงกว้างให้ลงทรัพยากรกับตัวอื่นก่อน",
    ],
  },
  cookie0037: {
    source: guide("beginner-progression-guide"),
    reason: [
      "She gives developing teams ATK and Volley, and Plaque Tower floor 21 offers a way to get her. Compare her slot with Caine or Milk once their ATK support is built; overlapping ATK buffs do not fully stack.",
      "她能給成形中的隊伍加攻和齊射連攜，徽章塔 21 層就有取得機會。凱恩或牛奶養起來後可以比較一下，重複的加攻效果不會完整疊加。",
      "育成途中の編成に攻撃力と一斉射撃シナジーを補い、プレートタワー21階でも入手できます。ケインやミルクが育ったら交代を比較しましょう。攻撃力バフは完全には重なりません。",
      "육성 중인 팀에 공격력과 일제 사격 시너지를 주고 플레이트 탑 21층에서 얻을 수 있습니다. 케인이나 우유가 성장하면 교체를 비교하세요. 공격력 버프는 온전히 중첩되지 않습니다.",
      "เพิ่มพลังโจมตีและซินเนอร์จี้ยิงพร้อมกันให้ทีมช่วงปั้น หาได้จากหอคอยแผ่นป้ายชั้น 21 เมื่อเคนหรือมิลค์พร้อมแล้วให้ลองเทียบ เพราะบัฟพลังโจมตีไม่ซ้อนกันเต็มที่",
    ],
  },
  cookie4003: {
    source: guide("caine-guild-conquest-team"),
    reason: [
      "Her barrels heal allies with low HP and grant Rapid Fire, useful when a boss or dungeon lineup needs both recovery and faster attackers. If Pinot Noir already supplies the synergy, judge the slot by the healing.",
      "木桶會補低血量隊友並提供連打連攜，打王或副本同時缺續航和連打時很實用。黑皮諾已經給連打時，就看她的治療能不能值回一個位置。",
      "樽でHPが低い味方を回復し、連打シナジーを付与します。ボス戦やダンジョンで回復と連打の両方が欲しいときに便利です。ピノ・ノワールが連打を補うなら、回復の効果で採用を決めましょう。",
      "통으로 체력이 낮은 아군을 회복시키고 연타 시너지를 줍니다. 보스나 던전 조합에 회복과 연타가 모두 필요할 때 유용합니다. 피노 누아가 이미 연타를 준다면 회복량을 보고 자리를 정하세요.",
      "ถังช่วยฮีลเพื่อนเลือดต่ำและมอบซินเนอร์จี้โจมตีต่อเนื่อง ใช้ได้เมื่อทีมบอสหรือดันเจี้ยนต้องการทั้งสองอย่าง ถ้าปิโนต์นัวร์ให้ซินเนอร์จี้อยู่แล้ว ให้ตัดสินจากประโยชน์ของการฮีล",
    ],
  },
  cookie0023: {
    source: guide("accuracy-focus-guide"),
    reason: [
      "His spear gives early and midgame teams a cheap DEF Down option. Bring him when the debuff helps the whole team, and check Focus if the boss takes the hit without getting the debuff.",
      "長矛讓前中期隊伍有好養的降防角。全隊能利用降防窗口時就帶上他；王有吃到傷害卻沒被降防，就先查效果命中。",
      "槍で防御力を下げられる、序盤から中盤の育てやすい候補です。味方全体が防御力ダウンを生かせるときに採用し、ボスに当たっても弱体化しないなら効果命中を確認しましょう。",
      "창으로 방어력을 낮춰 초중반에 육성 부담이 적은 선택지입니다. 팀 전체가 방어력 감소를 활용할 수 있을 때 쓰고, 공격은 맞는데 보스 방어력이 그대로라면 효과 적중을 확인하세요.",
      "หอกลดพลังป้องกันได้ด้วยต้นทุนปั้นต่ำในช่วงต้นถึงกลางเกม ใช้เมื่อทั้งทีมได้ประโยชน์จากการลดป้องกัน ถ้าแทงโดนบอสแต่ไม่ติดผล ให้เช็กค่าการติดเอฟเฟกต์",
    ],
  },
};
