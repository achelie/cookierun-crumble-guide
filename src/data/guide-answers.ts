import type { Locale } from "@/i18n/config";

// Editorial summaries of the dated articles, not a claim that the game has
// been retested since the date shown next to the answer.
const answers = {
  "accuracy-focus-guide": [
    "Fix Accuracy first if attacks miss, then raise Focus if the hits land but their debuffs fail. Those are two separate checks: Accuracy works against Evasion, and Focus works against Resistance. Start with the stage's listed checks, then watch what actually happens to your opener before rerolling gear.",
    "攻擊沒命中，先補命中；打中了但掛不上減益，再補專注。這是兩道不同的判定：命中對閃避，專注對抗性。先看關卡建議值，再觀察開場技能到底卡在哪一步，別急著洗掉原有裝備。",
    "攻撃が外れるなら命中、当たっても弱体効果が入らないなら集中を上げましょう。回避に対する命中と、抵抗に対する集中は別々の判定です。装備を振り直す前に、ステージの目安を見て、初手がどちらで止まるか確かめてください。",
    "공격이 빗나가면 명중을, 공격은 맞는데 약화 효과가 안 들어가면 집중을 먼저 올리세요. 회피와 저항을 상대하는 두 판정은 별개입니다. 장비를 다시 돌리기 전에 스테이지 권장 수치와 첫 스킬이 어디서 막히는지 확인하세요.",
    "ถ้าตีไม่โดนให้เพิ่มความแม่นยำก่อน แต่ถ้าตีโดนแล้วดีบัฟไม่ติดให้เพิ่มสมาธิ ทั้งสองอย่างเป็นคนละการตรวจ เช็กค่าที่ด่านแนะนำและดูว่าสกิลเปิดติดตรงไหนก่อนสุ่มอุปกรณ์ใหม่",
  ],
  "arena-healing-down-team-guide": [
    "Keep Herb and Milk in the Strawberry Crepe Arena lineup while you test whether shields or control can replace spare healing. The formation has 12 Cookie slots in two rows. Check overlapping buffs first, then change one slot at a time so you can see what actually improves survival.",
    "草莓可麗餅的競技場隊先留香草和牛奶，再試護盾或控場能不能取代多餘的治療。陣容共 12 個餅乾站位、分成兩排。先確認增益有沒有重疊，每次只換一個位置，才看得出誰真的救了隊伍。",
    "イチゴクレープのアリーナ編成は、まずハーブとミルクを残して試しましょう。クッキー 12 体を二列に並べ、重複する強化効果を先に確認します。回復枠をシールドや妨害に替えるなら、一枠ずつ変えると生存率の違いが見えます。",
    "딸기크레페 아레나 조합은 허브와 우유를 남겨 두고 시험하세요. 쿠키 12명을 두 줄에 놓은 뒤 겹치는 강화 효과부터 확인합니다. 여분의 회복을 보호막이나 제어로 바꿀 때는 한 자리씩 바꿔야 생존에 도움이 됐는지 알 수 있습니다.",
    "ทีมอารีน่าของคุกกี้เครปสตรอว์เบอร์รีให้เก็บเฮิร์บกับนมไว้ก่อน จัดคุกกี้ 12 ตัวเป็นสองแถว แล้วดูว่าบัฟไหนซ้อนกัน ถ้าจะใช้โล่หรือการควบคุมแทนฮีลส่วนเกิน ให้ลองเปลี่ยนทีละตำแหน่ง",
  ],
  "arena-power-gap-guide": [
    "Check your attack team's equipment preset before spending to fix an Arena loss. Arena and story use two different growth rules, so a higher account Power does not settle the matchup. Review Accuracy, Focus, gear options, and Sugar Runes on the lineup that actually entered the fight.",
    "競技場輸了，先查進攻隊實際用的裝備預設，再決定要不要花資源。競技場與推關是兩套成長規則，帳號戰力較高不代表這場一定贏。回頭看上場角色的命中、專注、裝備詞條和糖符文。",
    "アリーナで負けたら、素材を使う前に攻撃編成の装備プリセットを確認しましょう。アリーナとステージでは成長の反映ルールが違います。総戦闘力だけで判断せず、実際に出した編成の命中、集中、装備効果、シュガールーンを見直してください。",
    "아레나에서 졌다면 재료를 쓰기 전에 공격 팀 장비 프리셋부터 확인하세요. 아레나와 스테이지는 성장 규칙이 다릅니다. 계정 전투력만 보지 말고 실제 출전한 조합의 명중, 집중, 장비 옵션, 슈가룬을 살펴보세요.",
    "แพ้อารีน่าแล้วให้เช็กชุดอุปกรณ์ของทีมบุกก่อนใช้ทรัพยากร อารีน่ากับด่านใช้กติกาการเติบโตคนละแบบ อย่าดูแค่พลังรวม ให้ดูความแม่นยำ สมาธิ ออปชันอุปกรณ์ และรูนน้ำตาลของทีมที่ลงจริง",
  ],
  "bari-story-boss-team-presets": [
    "Save 3 story teams: a Bari and Cherry Cola lineup for normal stages, a team for enemies that knock you up, and a GingerCraven setup. Start with the routine lineup. Switch only when a boss exposes a specific weakness, and handle Redberry separately so your team does not waste time chasing.",
    "主線先存 3 套隊伍：巴莉加櫻桃可樂打一般關卡，另存一套防擊飛與一套打勇闖大敵的配置。平常先用通用隊；遇到首領打出明確弱點才換。紅莓需要另外調整，別讓全隊一直追。",
    "ストーリー用に 3 編成を保存しましょう。通常面のバリとチェリーコーラ、打ち上げ対策、ジンジャークレイヴン対策です。まず通常編成で進め、負け方が分かってから切り替えます。レッドベリーだけは追いかけ続けないよう個別に調整してください。",
    "스토리용 팀은 3개를 저장하세요. 바리와 체리콜라 기본 팀, 띄우기 대응 팀, 진저크레이븐 팀입니다. 평소에는 기본 팀으로 가고 보스전에서 약점이 드러났을 때 바꾸세요. 레드베리는 계속 쫓아다니지 않도록 별도로 조정합니다.",
    "บันทึกทีมเนื้อเรื่อง 3 แบบ: บารีกับเชอร์รีโคล่าสำหรับด่านทั่วไป ทีมรับมือการตีลอย และทีมเจอจินเจอร์เครเวน เริ่มจากทีมทั่วไปแล้วค่อยสลับเมื่อรู้ว่าติดอะไร ส่วนเรดเบอร์รีควรปรับแยกเพื่อไม่ให้ทีมเสียเวลาไล่ตาม",
  ],
  "beginner-progression-guide": [
    "When a beginner team stalls, fix your upgrade order before rebuilding it. Raise the main lineup to its current cap, then check Resolve, Oven gear, and the first Sugar Rune slot. Cookie and Pet banners track separate Gacha levels, with 1 experience point per pull for the matching banner.",
    "新手卡關時先調整養成順序。把主力升到目前上限，再檢查決心、烤箱裝備與第一個糖符文欄位。餅乾與寵物卡池的抽卡等級分開算，每抽只加對應卡池 1 點經驗，別指望另一邊一起升。",
    "序盤で詰まったら編成を崩す前に育成順を見直しましょう。主力を現在の上限まで上げ、決意、オーブン装備、最初のシュガールーン枠を確認します。クッキーとペットのガチャレベルは別々で、引くたびに対象のガチャに経験値が 1 入ります。",
    "초반에 막히면 팀을 갈아엎기 전에 성장 순서부터 바꾸세요. 주력의 레벨을 현재 상한까지 올리고 결의, 오븐 장비, 첫 슈가룬 칸을 확인합니다. 쿠키와 펫 뽑기 레벨은 따로 오르며, 한 번 뽑을 때 해당 뽑기 경험치가 1씩 쌓입니다.",
    "ถ้าติดด่านช่วงต้นให้แก้ลำดับการอัปก่อนรื้อทีม ดันตัวหลักถึงเพดานตอนนี้แล้วเช็กค่าความมุ่งมั่น อุปกรณ์เตาอบ และช่องรูนน้ำตาลแรก กาชาคุกกี้กับสัตว์เลี้ยงแยกระดับกัน แต่ละดึงเพิ่มประสบการณ์ให้ตู้ที่ดึง 1 แต้ม",
  ],
  "brightseeker-cookie-build-team": [
    "Choose Brightseeker for steadier auto clears, and keep Scorpion for runs where you can manage positioning and debuff timing. The guide's Brightseeker setup is most convincing at 5 stars. Compare that promotion cost with the team you already have before spending, especially if you mainly play on auto.",
    "想穩定自動過關可以用尋光，能手動調走位和減益時再試蠍子拼傷害。文中的尋光配置在 5 星時較有說服力。花資源前先比較升星成本與現有陣容，尤其是平常大多開自動的帳號。",
    "オートを安定させたいならブライトシーカー、位置と弱体効果のタイミングを手動で合わせられるならスコーピオンを試しましょう。この編成でブライトシーカーが強みを出しやすいのは 5 星。今の編成に対して昇星コストに見合うかも確認してください。",
    "자동 클리어를 안정시키려면 브라이트시커를, 위치와 약화 타이밍을 직접 맞출 수 있다면 스콜피온을 시험하세요. 글의 브라이트시커 조합은 5성에서 장점이 뚜렷합니다. 주로 자동으로 한다면 지금 팀과 승급 비용을 비교한 뒤 투자하세요.",
    "เลือกไบรต์ซีกเกอร์ถ้าอยากผ่านออโต้ให้สม่ำเสมอ ส่วนสกอร์เปียนเหมาะกับรอบที่คุมตำแหน่งและจังหวะดีบัฟเองได้ ทีมในคู่มือเห็นจุดเด่นไบรต์ซีกเกอร์ชัดขึ้นที่ 5 ดาว เทียบค่าปั้นกับทีมที่มีก่อนใช้ทรัพยากร",
  ],
  "caine-guild-conquest-team": [
    "Try Caine Cookie in Cheesecake's slot for Guild Conquest while keeping Milk and the rest of your working lineup. Test the swap at 3 stars before paying for further promotions. Copy the 12 positions first, then compare repeat runs rather than treating one Piñata score as proof.",
    "公會征服可以先用凱恩餅乾換掉起司蛋糕，牛奶和原本能用的隊友照留。凱恩 3 星就可以先試，不必急著升星。照著排好 12 個位置再多打幾次，別拿一場皮納塔分數就下結論。",
    "ギルド征服戦ではチーズケーキの枠にケインを入れ、ミルクと残りの編成は維持しましょう。まず 3 星で試し、昇星素材は結果を見てから。12 枠の順番をそろえ、ピニャータのスコアを数回分比べて判断してください。",
    "길드 정복전에서 치즈케이크 자리에 케인을 넣고 우유와 나머지 팀은 유지하세요. 추가 승급 전에 3성으로 시험할 수 있습니다. 12자리 순서를 맞추고 피냐타를 여러 번 쳐 본 뒤 점수를 비교하세요.",
    "ศึกพิชิตกิลด์ลองใส่เคนแทนชีสเค้ก โดยเก็บนมและทีมเดิมไว้ก่อน ลองที่ 3 ดาวได้เลยก่อนจ่ายค่าเลื่อนขั้น วางให้ครบ 12 ตำแหน่งแล้วตีปิญาตาหลายรอบ อย่าตัดสินจากคะแนนรอบเดียว",
  ],
  "chardonnay-auto-story-team": [
    "Use Chardonnay in Macaron's old support slot for the guide's 12 Cookie auto story team. Keep Bari and Cherry Cola on the ordinary stage preset, then change the slot that causes a difficult boss attempt to fail. Save a second preset instead of rebuilding the auto lineup for every boss.",
    "主線自動隊共 12 位餅乾，夏多內接馬卡龍原本的輔助位。一般關卡先保留巴莉與櫻桃可樂；打難首領時，只換掉造成失敗的那一位。另存一套備用配置，省得每遇到首領就重排整隊。",
    "ストーリーのオート編成は 12 体。マカロンが入っていた支援枠にシャルドネを置き、通常面ではバリとチェリーコーラを残します。難しいボスでは失敗の原因になった枠だけを替え、別のプリセットに保存しておきましょう。",
    "스토리 자동 편성 12자리에서 마카롱이 쓰던 지원 자리에 샤르도네를 넣으세요. 일반 스테이지는 바리와 체리콜라를 유지하고 어려운 보스에서는 실패한 원인이 된 자리만 바꾸세요. 보스용 프리셋을 따로 저장하면 매번 다시 짤 필요가 없습니다.",
    "ทีมออโต้เนื้อเรื่อง 12 ตัวใช้ชาร์ดอเนย์ในตำแหน่งซัพพอร์ตเดิมของมาการอง ด่านทั่วไปให้เก็บบารีกับเชอร์รีโคล่า เจอบอสยากค่อยเปลี่ยนตำแหน่งที่ทำให้แพ้ แล้วบันทึกอีกชุดไว้จะได้ไม่ต้องรื้อทีมทุกครั้ง",
  ],
  "cherry-cola-auto-stage-team": [
    "Start Cherry Cola's auto stage build with 2 Damage Reduction lines, then use remaining Rune choices for Skill Amp. Copy the 12 Cookie formation before adjusting it. If the attacker still falls during the opening exchange, fix that survival problem before spending resources on another damage roll.",
    "櫻桃可樂自動推關先配 2 條傷害減免，其餘糖符文再考慮技能增幅。照著排好 12 位餅乾後再調整。如果輸出開場就倒下，先補生存，別急著把資源花在下一條傷害詞條。",
    "チェリーコーラのオート攻略はダメージ減少を 2 枠から始め、残りはスキル増幅を優先します。クッキー 12 体の配置をそろえてから調整しましょう。開幕で落ちるなら、火力効果を増やす前に生存を確保してください。",
    "체리콜라 자동 스테이지 세팅은 피해감소 2줄부터 맞추고 나머지는 스킬 증폭을 우선하세요. 쿠키 12명 배치를 먼저 따라 한 뒤 조정합니다. 첫 교전에서 쓰러진다면 피해 옵션을 더 뽑기 전에 생존부터 해결하세요.",
    "เชอร์รีโคล่าสำหรับด่านออโต้เริ่มจากลดความเสียหาย 2 บรรทัด แล้วค่อยใส่เพิ่มพลังสกิลในช่องที่เหลือ จัดทีม 12 ตัวตามแบบก่อน ถ้าตัวทำดาเมจยังตายช่วงเปิด ให้แก้เรื่องรอดก่อนสุ่มดาเมจเพิ่ม",
  ],
  "cherry-cola-cookie-guide": [
    "Stop at 5 stars if your main reason to build Cherry Cola is Stellar Link progress. That promotion can help the account even when the Cookie sits out. If you want a Milk counter in Arena, test whether Cherry Cola survives long enough before committing further upgrades.",
    "為了星座進度養櫻桃可樂，5 星是合理的停損點。就算暫時不上場，升星仍能推進帳號進度。若目的是競技場打牛奶，先確認櫻桃可樂能不能活到發揮作用，再決定要不要繼續投資。",
    "星座を進める目的なら、チェリーコーラは 5 星を区切りにできます。出番がなくても昇星が進行に役立つからです。アリーナでミルク対策にする場合は、追加育成の前に仕事をするまで生き残れるか試しましょう。",
    "별자리 진행이 목적이라면 체리콜라는 5성에서 멈춰도 됩니다. 출전하지 않아도 승급이 계정 성장에 도움이 됩니다. 아레나에서 우유를 상대하려는 목적이라면 추가 투자 전에 필요한 만큼 살아남는지 시험하세요.",
    "ถ้าปั้นเชอร์รีโคล่าเพื่อปลดความคืบหน้ากลุ่มดาว หยุดที่ 5 ดาวได้ แม้ไม่ได้ลงทีมก็ยังช่วยบัญชี ถ้าหวังใช้แก้ทางนมในอารีน่า ให้ลองก่อนว่าอยู่รอดจนทำหน้าที่ได้ไหม",
  ],
  "cool-mint-cookie-build-team": [
    "Use Cool Mint with Licorice and Witchberry as a 3 Cookie summon core for crowded or split target stages. Her close range drill can be interrupted, so watch whether it actually lands. Against a lone boss with constant area damage, compare this team with your usual boss lineup before investing.",
    "清涼薄荷可和甘草、魔女莓組成 3 位餅乾的召喚核心，應付敵人多或目標分散的關卡。她的近身鑽擊可能被打斷，先觀察能不能打完。遇到持續打範圍傷害的單一首領，先和原本的首領隊比較。",
    "敵が多い面や標的が散る面では、クールミント、甘草、ウィッチベリーの 3 体を召喚編成の軸にします。近距離のドリルは中断されるので、当たり切るか確認を。範囲攻撃が続く単体ボスでは普段の編成とも比べましょう。",
    "적이 많거나 흩어진 스테이지에서는 쿨민트, 감초, 위치베리 3명을 소환 팀의 중심으로 쓰세요. 근접 드릴은 끊길 수 있으니 끝까지 맞는지 보세요. 광역 공격이 계속되는 단일 보스에서는 평소 보스 팀과 비교하세요.",
    "ด่านศัตรูเยอะหรือกระจายตัวให้ใช้คูลมินต์ ลิโคริช และวิชเบอร์รีเป็นแกนซัมม่อน 3 ตัว ท่าสว่านระยะประชิดถูกขัดได้ ให้ดูว่าโจมตีจบจริงไหม ถ้าบอสตัวเดียวตีวงกว้างตลอด ให้เทียบกับทีมบอสเดิมก่อนปั้นเพิ่ม",
  ],
  "dungeon-milk-buff-guide": [
    "Start a Crumble Dungeon push with Milk as leader, keep the group together, and check the actual buff recipient. The example reached about 52 billion damage. Combat Power determines who enters the starting group, while the ATK check can send the targeted buff to a different Cookie.",
    "推崩塌地城先讓牛奶當隊長，把隊伍聚在一起，再查增益實際給了誰。文中案例打出約 520 億傷害。戰力影響誰先進場，攻擊力判定則可能把指定增益轉給另一位餅乾。",
    "クランブルダンジョンではミルクをリーダーにし、隊列をまとめて、強化効果が誰に付いたかを確認しましょう。記事の実例は約 520 億ダメージです。先に入るクッキーは戦闘力で決まり、対象付きの強化は攻撃力で別のクッキーに移ることがあります。",
    "크럼블 던전은 우유를 리더로 두고 팀을 모은 뒤 버프를 실제로 누가 받는지 확인하세요. 글의 사례는 약 520억 피해였습니다. 초반 입장은 전투력, 지정 버프의 대상은 공격력에 따라 달라질 수 있습니다.",
    "ลงดันเจียนครัมเบิลให้ใช้นมเป็นหัวหน้า รวมทีมไว้แล้วดูว่าบัฟไปลงที่ใคร ตัวอย่างทำดาเมจได้ราว 52 พันล้าน พลังต่อสู้มีผลต่อคนที่เข้าก่อน ส่วนบัฟเลือกเป้าอาจไปหาคุกกี้อีกตัวตามค่าพลังโจมตี",
  ],
  "endgame-grind-guide": [
    "Treat late story progress as a long push with breaks for upgrades, not as a fixed timer. One account took roughly 15 hours to move from stage 140 to 171. Your roster and materials change that pace, and the proposed endgame features in the guide are ideas rather than announced updates.",
    "後期推圖需要留時間升級，別照別人的時數排進度。有個帳號從約第 140 關打到 171 關用了約 15 小時；陣容與材料都會改變速度。文中的後期功能是提案，並非官方公告。",
    "終盤は育成を挟みながら進めましょう。あるアカウントでは 140 面前後から 171 面まで約 15 時間かかりましたが、手持ちと素材でペースは変わります。記事で触れる終盤機能は提案で、公式発表ではありません。",
    "후반 스테이지는 중간에 성장 시간을 두고 밀어 보세요. 한 계정이 140 부근에서 171까지 가는 데 약 15시간이 걸렸지만 보유 쿠키와 재료에 따라 다릅니다. 글의 후반 콘텐츠는 아이디어이며 공식 업데이트 공지가 아닙니다.",
    "ด่านท้ายเกมควรเผื่อเวลาหยุดอัปด้วย บัญชีตัวอย่างใช้ราว 15 ชั่วโมงจากด่านประมาณ 140 ไป 171 แต่ทีมและวัสดุของคุณทำให้เวลาเปลี่ยนได้ ระบบท้ายเกมที่เสนอในบทความเป็นไอเดีย ไม่ใช่ประกาศอัปเดต",
  ],
  "equipment-choice-guide": [
    "Use the higher Power piece as a shortcut until around Oven level 10. After that, compare the actual stats when two pieces have similar Power. Fix missed attacks with Accuracy first, then check Focus, Skill Amp, or Skill Haste for the skill you need to land.",
    "烤箱約 10 級前，通常可先穿戰力高的裝備。之後兩件戰力接近時，請看實際詞條：攻擊常落空就先補命中，再按需要補專注、技能增幅或技能加速，別只看總戰力。",
    "オーブンレベル 10 前後までは戦闘力の高い装備を選ぶのが手軽です。それ以降、戦闘力が近い二つを比べるなら効果を確認しましょう。攻撃が外れるなら命中を先に補い、必要に応じて集中、スキル増幅、スキル加速を検討します。",
    "오븐 레벨 10쯤까지는 전투력이 높은 장비를 고르는 편이 편합니다. 이후 전투력이 비슷한 두 장비는 옵션을 보세요. 공격이 빗나가면 명중을 먼저 채우고 필요한 스킬에 맞춰 집중, 스킬 증폭, 스킬 가속을 고려하세요.",
    "ก่อนเตาอบราวเลเวล 10 เลือกชิ้นที่พลังสูงกว่าได้ หลังจากนั้นถ้าพลังใกล้กันให้ดูค่าจริง ถ้าตีพลาดบ่อยเติมความแม่นยำก่อน แล้วค่อยเลือกสมาธิ เพิ่มพลังสกิล หรือเร่งสกิลตามที่ต้องใช้",
  ],
  "fast-account-growth-guide": [
    "Push stages before claiming daily rewards that scale with progress. If the next Lucky Rewards milestone is 1 or 2 clears away, try to reach it before rolling. Use the same order with first clears in Daily Dungeons, then spend Arena tickets before they sit at the cap.",
    "先推關，再領會隨進度增加的每日獎勵。如果再過 1 或 2 關就到下一個幸運獎勵里程碑，先打過去再抽。每日地城也先拿首通獎勵；競技場門票別一直放到滿。",
    "進行度で増える報酬は、先にステージを進めてから受け取りましょう。ラッキー報酬の次の区切りまであと 1、2 面なら、先にクリアを狙います。デイリーダンジョンも初回クリアを優先し、アリーナ券は上限になる前に使いましょう。",
    "진행도에 따라 늘어나는 보상은 스테이지를 민 뒤 받으세요. 다음 행운 보상까지 1~2판 남았다면 먼저 클리어를 노리세요. 일일 던전은 첫 클리어부터 챙기고 아레나 티켓은 상한에 쌓이기 전에 쓰세요.",
    "ดันด่านก่อนรับรางวัลรายวันที่เพิ่มตามความคืบหน้า ถ้าอีก 1 หรือ 2 ด่านถึงขั้นถัดไปของรางวัลโชคดี ให้ลองผ่านก่อนสุ่ม ดันเจียนรายวันให้เก็บผ่านครั้งแรกก่อน แล้วใช้ตั๋วอารีน่าก่อนเต็ม",
  ],
  "gear-sugar-rune-stats-guide": [
    "Choose Sugar Rune stats for what the Cookie needs to do, and stop at a useful SR roll if materials are tight. There are 3 possible values within a rarity. Chasing the highest SSR value can cost more than fixing the survivability or accuracy issue that caused the loss.",
    "糖符文先按餅乾要做的事選詞條；材料不多時，實用的 SR 就能先留。同一稀有度有 3 種數值。一直追最高的 SSR，可能比解決讓你輸的生存或命中問題更耗材料。",
    "シュガールーンはクッキーの仕事に合う効果を選び、素材が少なければ使える SR で止めましょう。同じレア度にも数値が 3 段階あります。最高値の SSR を狙う前に、負けた原因が生存か命中かを確認してください。",
    "슈가룬은 쿠키가 맡은 일에 맞춰 고르고 재료가 부족하면 쓸 만한 SR에서 멈추세요. 같은 희귀도 안에도 수치가 3가지입니다. SSR 최고 수치를 노리기 전에 생존이나 명중이 문제였는지 먼저 보세요.",
    "เลือกรูนน้ำตาลตามหน้าที่คุกกี้ ถ้าวัสดุน้อยเจอ SR ที่ใช้ได้ก็เก็บก่อน ในระดับเดียวกันมีค่าได้ 3 แบบ ไล่หา SSR ค่าสูงสุดอาจเปลืองกว่าการแก้ปัญหาตายไวหรือตีไม่โดน",
  ],
  "gingercraven-boss-guide": [
    "Use a Scorpion lineup with 3 healers for GingerCraven if the boss breaks your team before the timer. Keep GingerBright's ATK reduction and Dark Choco's DEF reduction, then check the gap to Recommended Power. Adding a damage dealer will not help much if the last knockback ends the run.",
    "打勇闖大敵時，如果隊伍在倒數結束前就被打散，先試蠍子加 3 位治療。保留勇敢餅乾夥伴的降攻和黑巧克力的降防，再看離推薦戰力差多少。最後一波擊退就滅團時，多加輸出幫助有限。",
    "時間切れより先に崩れるなら、ジンジャークレイヴンにはスコーピオンと回復役 3 体を試しましょう。攻撃力減少とダークチョコの防御力減少を残し、推奨戦闘力との差も確認します。最後のノックバックで倒れるなら、火力を増やす前に生存を。",
    "진저크레이븐에서 시간보다 먼저 팀이 무너지면 스콜피온과 회복 3명을 써 보세요. 공격력 감소와 다크초코의 방어력 감소를 유지하고 권장 전투력과의 차이도 확인하세요. 마지막 밀치기에 전멸한다면 공격수를 늘리기 전에 생존부터 챙기세요.",
    "ถ้าเจอจินเจอร์เครเวนแล้วทีมแตกก่อนหมดเวลา ลองสกอร์เปียนกับตัวฮีล 3 ตัว เก็บลดพลังโจมตีและลดป้องกันของดาร์กช็อกโกไว้ แล้วเช็กช่องว่างกับพลังแนะนำ ถ้าตายตอนถูกผลักช่วงท้าย เพิ่มตัวตีอย่างเดียวไม่ช่วยมาก",
  ],
  "guild-conquest-team-guide": [
    "Repeat Guild Conquest attempts before judging a team change. The guide saw about 250 million damage in one Piñata run and a 60 million swing without a promotion or Rune change. Keep your single target buffs and debuffs steady while you test, so one lucky attempt does not decide the lineup.",
    "公會征服換陣後要多打幾次再判斷。文中的皮納塔一場約 2.5 億傷害，沒改升星或糖符文也能上下差 6,000 萬。測試時保留單體用的增益和減益，別讓一場手氣決定陣容。",
    "ギルド征服戦は編成を変えても一戦で判断しないでください。記事ではピニャータ戦で約 2 億 5,000 万を出し、昇星やルーンを変えなくても 6,000 万の差が出ました。単体用の強化と弱体効果をそろえて複数回比べましょう。",
    "길드 정복전은 조합을 바꾼 뒤 여러 번 쳐 보고 판단하세요. 글의 피냐타 사례는 약 2억 5천만 피해였고 승급이나 룬을 안 바꿔도 6천만 차이가 났습니다. 단일 대상 버프와 디버프를 유지한 채 비교하세요.",
    "ศึกพิชิตกิลด์ให้ลองหลายรอบก่อนสรุป ตัวอย่างตีปิญาตาได้ราว 250 ล้าน และแกว่ง 60 ล้านทั้งที่ไม่ได้เปลี่ยนดาวหรือรูน คงบัฟกับดีบัฟสำหรับเป้าเดี่ยวไว้ตอนเทียบ จะได้ไม่ตัดสินจากรอบที่โชคดี",
  ],
  "jax-cookie-build-team": [
    "Test Jax as a Fire Charge Cookie for boss teams that can use his DEF reduction. The early example used a 2 star Jax without Sugar Runes, so the result supports a trial before investment. Keep the rest of your team stable while you compare his slot.",
  ],
  "level-100-exp-priority-guide": [
    "Take Milk to level 100 first if your story team uses Crunchy Strong Pediatrician, then level the damage dealers you actually field and your healer. Check Dungeon entry order and ATK based Welfare targeting before resetting anyone. A level change can move a Cookie into the lineup or take away a buff.",
    "主線隊若用強壯小兒科醫師牛奶，先把牛奶升到 100 級，再養實際上場的輸出與治療。重置前先查地城入場順序和依攻擊力選人的福利效果。等級一變，可能換了先進場或吃到增益的餅乾。",
    "ストーリー編成でミルクの小児科医を使うなら、まずミルクをレベル 100 に。次に実際に出す火力役と回復役を育てます。レベルを戻す前に、ダンジョンの入場順と攻撃力で決まる強化対象を確認してください。",
    "스토리에서 소아과 의사 우유를 쓴다면 우유를 먼저 100레벨로 올리고, 실제 출전하는 딜러와 힐러를 올리세요. 레벨을 초기화하기 전에 던전 입장 순서와 공격력으로 정해지는 복지 효과 대상을 확인하세요.",
    "ถ้าใช้หมอเด็กของคุกกี้นมในทีมเนื้อเรื่อง ให้อัปนมถึงเลเวล 100 ก่อน ตามด้วยตัวตีที่ใช้จริงและตัวฮีล ก่อนรีเซ็ตเลเวลให้เช็กลำดับเข้าดันเจียนและเป้าหมายบัฟที่อิงพลังโจมตี",
  ],
  "pinot-noir-cookie-build": [
    "Build Pinot Noir for support and healing reduction in Multi-strike teams before chasing damage stats. The guide does not require a 10 star promotion to start using the effect. Check whether your lineup keeps Pinot Noir alive long enough to apply pressure, especially against Arena teams that rely on healing.",
    "黑皮諾先走多重打擊隊的輔助與降治療路線，別急著追輸出。發揮效果不必第一天就升到 10 星。尤其對上靠治療撐住的競技場隊，先看你的陣容能不能讓黑皮諾活到施加壓力。",
    "ピノ・ノワールは連打編成で支援と回復低下を優先し、火力効果は後から。役割を試すのに最初から 10 星は要りません。回復に頼るアリーナ編成が相手なら、効果を入れるまで生き残れるかを確認してください。",
    "피노누아는 연타 조합에서 지원과 회복 감소를 먼저 챙기고 피해 옵션은 나중에 보세요. 처음부터 10성을 찍어야 쓸 수 있는 효과는 아닙니다. 회복 중심 아레나 팀을 상대로 효과를 넣을 때까지 버티는지 확인하세요.",
    "ปั้นปิโนต์นัวร์เพื่อซัพพอร์ตและลดฮีลในทีมโจมตีหลายครั้งก่อนเพิ่มดาเมจ ไม่ต้องดันถึง 10 ดาวตั้งแต่แรก ลองดูว่าอยู่รอดนานพอจะกดการฟื้นฟูของทีมอารีน่าที่พึ่งฮีลไหม",
  ],
  "pinot-noir-multistrike-scorpion-teams": [
    "Start with the Multi-strike preset and switch to Scorpion when the fight rewards focused damage and your team can stay alive. The guide compares 2 complete teams. Copy their order, then account for your own promotions, Sugar Runes, Pet levels, and Power before treating a result as repeatable.",
    "先試多重打擊隊；需要集中火力、隊伍也撐得住時，再換蠍子。文中有 2 套完整配置。先照站位排，再把自己的升星、糖符文、寵物等級和戰力算進去，別假設每個帳號都能打出同樣結果。",
    "まず連打編成を試し、集中火力が必要で味方が耐えられるならスコーピオンに替えます。記事では 2 編成を比較しています。配置順をそろえたうえで、自分の昇星、ルーン、ペットレベル、戦闘力の違いも見てください。",
    "연타 조합부터 써 보고 집중 화력이 필요하면서 팀이 버틸 수 있다면 스콜피온으로 바꾸세요. 글에는 완성 조합 2개가 있습니다. 순서를 맞춘 뒤 자신의 승급, 슈가룬, 펫 레벨, 전투력 차이도 고려하세요.",
    "เริ่มจากทีมโจมตีหลายครั้ง แล้วเปลี่ยนไปใช้สกอร์เปียนถ้าต้องเน้นดาเมจเป้าเดียวและทีมอยู่รอด คู่มือมีทีมเต็ม 2 แบบ จัดตามลำดับแล้วดูความต่างเรื่องดาว รูน เลเวลสัตว์เลี้ยง และพลังของบัญชีคุณด้วย",
  ],
  "power-guide-stage-damage": [
    "Check the gap between team Power and Recommended Power if your story damage suddenly drops. These are 2 separate values, and falling below the recommendation can reduce the damage you deal. Compare the same stage before and after an upgrade to separate the Power effect from a lineup change.",
    "主線傷害突然掉下去，先比隊伍戰力和推薦戰力。這是 2 個不同的數字，低於推薦值可能壓低輸出。在同一關比較升級前後，再判斷差異是戰力造成，還是換陣容造成。",
    "ストーリーで急にダメージが下がったら、編成の戦闘力と推奨戦闘力の二つを比べましょう。推奨値を下回ると与ダメージが減ることがあります。同じ面で育成前後を比べれば、編成変更の影響と切り分けやすくなります。",
    "스토리 피해가 갑자기 줄면 팀 전투력과 권장 전투력, 두 수치의 차이를 보세요. 권장치보다 낮으면 주는 피해가 줄 수 있습니다. 같은 스테이지에서 성장 전후를 비교하면 조합 변경과 구분하기 쉽습니다.",
    "ถ้าดาเมจในด่านเนื้อเรื่องลดฮวบ ให้เทียบพลังทีมกับพลังแนะนำ ทั้ง 2 ค่าไม่ใช่ค่าเดียวกัน ถ้าต่ำกว่าเกณฑ์อาจตีเบาลง ลองเทียบด่านเดิมก่อนกับหลังอัปเพื่อแยกผลจากการเปลี่ยนทีม",
  ],
  "princess-bari-cookie-build-team": [
    "Build Princess Bari to survive in story, then add offensive rolls; in Arena start with Damage Reduction and ATK Amp. The guide covers 2 modes and gives a story lineup plus substitutions to try. Skill Amp can help Bari's damage, but it does not increase her protective buffs.",
    "巴莉公主推關先確保站得住，再補輸出；競技場則先看傷害減免與攻擊增幅。文章分成 2 種玩法，另有主線站位與可試的替換。技能增幅會提高她的傷害，卻不會放大保護增益。",
    "バリ姫はストーリーなら生存を確保してから火力、アリーナならダメージ減少と攻撃力増幅から。記事では二つのモードを分け、ストーリー編成と代用枠も紹介します。スキル増幅はダメージには効きますが、守りの強化効果は増えません。",
    "바리 공주는 스토리에서 생존부터 맞춘 뒤 공격 옵션을, 아레나에서는 피해감소와 공격력 증폭을 먼저 보세요. 글은 두 모드를 나눠 설명하고 스토리 대체 자리도 다룹니다. 스킬 증폭은 피해에 적용되지만 보호 버프를 키우지는 않습니다.",
    "บารีในเนื้อเรื่องให้รอดก่อนแล้วค่อยเพิ่มดาเมจ ส่วนอารีน่าเริ่มจากลดความเสียหายกับขยายพลังโจมตี คู่มือแยก 2 โหมดและมีตัวแทนสำหรับทีมเนื้อเรื่อง เพิ่มพลังสกิลช่วยดาเมจแต่ไม่เพิ่มบัฟป้องกัน",
  ],
  "resource-guide-account-traps": [
    "Fix the resource drain you can control before buying another upgrade. The guide covers 8 common traps, including leaving the wrong formation active and spending just to clear a notification. Check what each action pays back toward your next stage or promotion before you commit scarce currency.",
    "買下一次升級前，先堵住自己能控制的資源漏洞。文章列了 8 個常見陷阱，包括掛錯陣容、為消紅點亂花錢。稀缺貨幣花下去前，先看這個動作能不能幫你過下一關或完成升星。",
    "追加育成を買う前に、止められる浪費から直しましょう。記事では放置編成の選び間違いや通知を消すだけの出費など、8 個の落とし穴を扱います。次の面や昇星に何が返ってくるかを見てから通貨を使ってください。",
    "다음 강화를 사기 전에 막을 수 있는 자원 낭비부터 줄이세요. 글은 방치 편성을 잘못 두거나 알림을 없애려고 소비하는 등 흔한 함정 8개를 다룹니다. 그 소비가 다음 스테이지나 승급에 도움이 되는지 확인하세요.",
    "ก่อนซื้ออัปเกรดอีกขั้น ให้หยุดจุดรั่วที่แก้ได้ก่อน คู่มือรวม 8 กับดัก เช่น เปิดทีมผิดตอนปล่อยฟาร์ม หรือจ่ายเงินแค่ล้างจุดแจ้งเตือน เช็กว่าที่จ่ายช่วยด่านถัดไปหรือเลื่อนดาวได้จริงไหม",
  ],
  "rye-cookie-build-team": [
    "Rye becomes a stronger ranged damage option at 5 stars, when two extra hits bring the listed cast to roughly 600% total damage on a 4 second cooldown. Compare that version with the Rye you own before investing. At low promotion, her skill offers damage without healing or shields.",
    "黑麥在 5 星多兩段命中，每次技能約 600% 總傷害，冷卻仍是 4 秒，遠程輸出的價值才更明顯。投資前先比手上的星級。低星技能以傷害為主，沒有治療或護盾。",
    "ライ麦味は 5 星で攻撃が二回増え、4 秒間隔の一発動で合計約 600% のダメージになります。投資前に手持ちの星数と比べましょう。低昇星では回復やシールドがなく、主な仕事はダメージです。",
    "호밀맛은 5성에서 타격이 두 번 늘어 4초마다 쓰는 스킬의 총 피해가 약 600%가 됩니다. 투자 전에 보유한 쿠키의 별 수와 비교하세요. 낮은 승급에서는 회복이나 보호막 없이 피해를 주는 역할입니다.",
    "ไรย์ที่ 5 ดาวได้ตีเพิ่มสองครั้ง ดาเมจรวมต่อสกิลราว 600% และคูลดาวน์ยัง 4 วินาที เทียบกับดาวของตัวที่มีก่อนลงทุน ดาวน้อยสกิลเน้นตีอย่างเดียว ไม่มีฮีลหรือโล่",
  ],
  "skill-amp-fix-rune-refund": [
    "Check which effect your Rune supports before replacing it after the August 27 Skill Amp adjustment. The change affects some debuffs and caps DEF Down's effect; it does not make damage or healing rolls useless. Review the dated refund details in the article before assuming that offer still applies.",
    "8 月 27 日技能增幅調整後，先確認糖符文到底在強化哪個效果，再決定換不換。改動涉及部分減益與降防限制，傷害和治療詞條仍可能有用。補償是當時的資訊，先核對適用時間。",
    "8 月 27 日のスキル増幅調整を受けてルーンを替えるなら、先に強化している効果を確認しましょう。一部の弱体効果と防御力減少が調整対象です。ダメージや回復の効果は用途が残り、補填の適用期間は記事の日付を確認してください。",
    "8월 27일 스킬 증폭 조정 뒤 룬을 바꾸려면 먼저 어떤 효과를 키우던 룬인지 보세요. 일부 약화와 방어력 감소가 조정됐지만 피해와 회복 옵션은 여전히 쓸 수 있습니다. 보상은 글의 적용 시점을 확인하세요.",
    "หลังปรับเพิ่มพลังสกิลวันที่ 27 สิงหาคม ให้เช็กก่อนว่ารูนช่วยเอฟเฟกต์ไหน การเปลี่ยนแปลงกระทบดีบัฟบางอย่างและเพดานลดป้องกัน ส่วนดาเมจกับฮีลยังมีประโยชน์ รายละเอียดคืนวัสดุให้ดูช่วงเวลาที่ระบุในบทความ",
  ],
  "strawberry-crepe-cookie-build-team": [
    "Build Strawberry Crepe to land repeated area hits, then add enough defense to survive the opener. Crepe Crasher casts every 4 seconds and the highest listed upgrade reaches 159.2% of ATK. Rapid Fire can repeat it, so compare that contribution before turning the Cookie into a pure tank.",
    "草莓可麗餅先追求反覆命中的範圍傷害，再補能撐過開場的防禦。技能每 4 秒施放一次，資料中最高一階是攻擊力的 159.2%。快速射擊能讓它再打一次，先看輸出貢獻，再決定要不要全堆防禦。",
    "イチゴクレープは範囲攻撃を繰り返し当て、開幕を耐える分だけ防御も足しましょう。スキルは 4 秒間隔で、掲載された最大段階では攻撃力の 159.2%。速射で繰り返せるので、防御一辺倒にする前に火力を比べてください。",
    "딸기크레페는 광역 타격을 반복할 수 있게 맞추고 첫 교전을 버틸 만큼 방어를 챙기세요. 스킬은 4초마다 쓰며 표의 최고 단계는 공격력 159.2%입니다. 속사로 반복할 수 있으니 순수 탱커로 만들기 전에 피해를 비교하세요.",
    "เครปสตรอว์เบอร์รีควรตีวงกว้างซ้ำได้และรอดช่วงเปิด สกิลออกทุก 4 วินาที ขั้นสูงสุดในตารางทำดาเมจ 159.2% ของพลังโจมตี ยิงรัวทำให้ซ้ำได้ ลองเทียบดาเมจก่อนปั้นรับล้วน",
  ],
  "sugar-rune-investment-priority": [
    "Start Sugar Rune investment with Milk, then Pomegranate and the support Cookies you field regularly. Keep Rune materials and promotion spending as 2 separate decisions. A stronger attack stat can also move a targeted buff to another Cookie, so recheck the recipient after changing a roll.",
    "糖符文先投牛奶，再投石榴和常用輔助。符文材料與升星是 2 筆不同的預算，不一定給同一位餅乾。攻擊詞條升高還可能把指定增益轉給別人，洗完請重查加成落在哪位角色身上。",
    "シュガールーンはミルクから、次にザクロやよく使う支援役へ。ルーン素材と昇星は別々に予算を考えます。攻撃力が上がると対象付きの強化が別のクッキーに移ることがあるので、効果を替えたら対象を確認しましょう。",
    "슈가룬은 우유부터, 다음은 석류와 자주 쓰는 지원 쿠키에게 투자하세요. 룬 재료와 승급 비용은 따로 판단할 두 가지입니다. 공격력이 오르면 지정 버프가 다른 쿠키로 갈 수 있으니 옵션을 바꾼 뒤 대상을 확인하세요.",
    "ลงรูนน้ำตาลให้นมก่อน แล้วค่อยทับทิมกับซัพพอร์ตที่ใช้ประจำ แยกงบรูนกับงบเลื่อนดาวเป็น 2 เรื่อง พลังโจมตีที่เพิ่มอาจดึงบัฟไปให้คุกกี้ตัวอื่น เปลี่ยนรูนแล้วเช็กผู้รับบัฟอีกที",
  ],
  "tips-hidden-mechanics": [
    "Check the game's hidden rules before spending crystals to fix a losing run. The guide covers 9 checks, from missed debuffs and Arena Power to Auto Hunt income. Start with what actually failed: watch whether the hit lands, who stays alive, and where the rewards go.",
    "花水晶救一場打輸的戰鬥前，先查遊戲規則。文章列出 9 個檢查點，包含減益沒掛上、競技場戰力和自動狩獵收益。先看實際失敗在哪裡：技能有沒有命中、誰還活著、獎勵跑去哪。",
    "負けた対戦をクリスタルで解決する前に、ゲーム内の判定を確認しましょう。記事には弱体効果、アリーナ戦闘力、自動狩り収益など 9 項目があります。攻撃が当たったか、誰が生き残ったか、報酬がどこへ入るかから確かめてください。",
    "패배를 해결하려고 크리스탈을 쓰기 전에 게임 판정부터 보세요. 글은 약화 실패, 아레나 전투력, 자동 사냥 수입 등 9가지를 다룹니다. 공격이 맞았는지, 누가 살아남았는지, 보상이 어디로 갔는지부터 확인하세요.",
    "ก่อนใช้คริสตัลแก้แพ้ ให้ดูว่าติดกติกาข้อไหน คู่มือมีจุดเช็ก 9 อย่าง ตั้งแต่ดีบัฟไม่ติด พลังอารีน่า ไปจนถึงรายได้ฟาร์มออโต้ เริ่มจากดูว่าตีโดนไหม ใครยังรอด และรางวัลเข้าไปที่ไหน",
  ],
} as const;

const localeIndex: Record<Locale, number> = { en: 0, "zh-Hant": 1, ja: 2, ko: 3, th: 4 };

export function getGuideAnswer(slug: string, locale: Locale) {
  const key = slug.replace(/^cookie-run-crumble-/, "");
  return (answers as Record<string, readonly string[]>)[key]?.[localeIndex[locale]];
}
