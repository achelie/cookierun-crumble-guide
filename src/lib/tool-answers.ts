import type { LocalCopy } from "@/lib/direct-answers";

export const calculatorSnapshotDate = "2026-10-14";
export const calculatorSnapshotVersion = "1.5.002";

export const toolAnswers = {
  tools: {
    en: "Choose from 5 free tools: 2 builders for teams and tier lists, and 3 calculators for Sugar Runes, Stellar Link, and Plating. Use a builder to try a lineup or share a ranking. Use a calculator to budget before spending; the calculator cards link to each model's dated game snapshot.",
    "zh-Hant": "這裡有 5 個免費工具：2 個用來排隊與做榜單，另外 3 個用來算糖符文、星座和鍍層。想試站位或分享排名，先開編排工具；想知道要準備多少材料，先開計算器。各計算器會標示使用的遊戲資料日期。",
    ja: "無料ツールは 5 種類です。編成とランク表を作るツールが 2 種類、シュガールーン、星座、メッキの計算ツールが 3 種類あります。配置を試すなら編成ツール、素材を使う前の見積もりなら計算ツールへ。参照したデータの日付も各計算ページで確認できます。",
    ko: "무료 도구는 5개입니다. 팀과 순위표를 만드는 도구 2개, 슈가룬·별자리·도금 계산기 3개가 있습니다. 배치를 시험하거나 순위를 공유하려면 만들기 도구를, 재료를 쓰기 전에 비용을 알아보려면 계산기를 여세요. 각 계산기에 기준 데이터 날짜를 적었습니다.",
    th: "มีเครื่องมือฟรี 5 ตัว แบ่งเป็นตัวจัดทีมกับตัวทำอันดับ 2 ตัว และเครื่องคำนวณรูนน้ำตาล กลุ่มดาว และการชุบอีก 3 ตัว ถ้าอยากลองตำแหน่งหรือแชร์อันดับให้เปิดตัวจัด ถ้าอยากรู้ว่าต้องเตรียมวัสดุเท่าไรให้เปิดเครื่องคำนวณ แต่ละหน้าระบุวันที่ของข้อมูลที่ใช้",
  },
  teamBuilder: {
    en: "Use the team builder to arrange up to 12 Cookies and 3 Pets in the order you plan to field them. Check which Synergies the lineup activates before you copy it into the game. When the slots look right, share the formation by link or download it as a PNG.",
    "zh-Hant": "隊伍編排器最多能放 12 位餅乾和 3 隻寵物。照你打算上場的順序排好，先確認哪些協同會觸發，再到遊戲裡照著排。站位確定後，可以複製連結分享給朋友，或下載 PNG 圖片。",
    ja: "編成ツールでは、クッキーを最大 12 体、ペットを 3 体まで並べられます。実際に出す順番で配置し、ゲームに移す前に発動するシナジーを確認しましょう。並びが決まったらリンクで共有するか、PNG 画像として保存できます。",
    ko: "팀 편성 도구에서 쿠키 최대 12명과 펫 3마리를 배치할 수 있습니다. 실제로 쓸 순서대로 놓은 뒤 어떤 시너지가 켜지는지 확인하고 게임에서 따라 하세요. 배치를 정했다면 링크로 공유하거나 PNG 이미지로 저장할 수 있습니다.",
    th: "ตัวจัดทีมวางคุกกี้ได้สูงสุด 12 ตัวและสัตว์เลี้ยง 3 ตัว จัดตามตำแหน่งที่จะใช้จริงแล้วดูว่าทีมเปิดซินเนอร์จีอะไรบ้างก่อนนำไปจัดในเกม เมื่อได้ตำแหน่งที่ต้องการแล้ว แชร์เป็นลิงก์หรือบันทึกเป็นภาพ PNG ได้",
  },
  tierBuilder: {
    en: "Make your own ranking across 5 tiers, from S through D. Load the guide's combined PvE and PvP ranking as a starting point, or start with an empty board if you only care about one mode. Drag the Cookies into order, then share the result by link or as a PNG.",
    "zh-Hant": "把餅乾排進 S 到 D 共 5 個級別，就能做自己的榜單。可以載入本站的推關與競技場綜合排名再調整；如果只看一種玩法，也可以從空白榜單開始。拖曳排好後，可用連結或 PNG 圖片分享。",
    ja: "S から D までの 5 段階で、自分のランク表を作れます。攻略と対人戦を合わせた当サイトの評価を読み込んで調整するか、一つのモードに絞るなら空の表から始めましょう。並べ替えた結果はリンクか PNG で共有できます。",
    ko: "S부터 D까지 5개 등급으로 나만의 순위표를 만드세요. 공략과 대전을 함께 본 사이트 순위를 불러와 수정해도 되고, 한 모드만 평가한다면 빈 표에서 시작해도 됩니다. 쿠키를 끌어 순서를 정한 뒤 링크나 PNG로 공유하세요.",
    th: "จัดอันดับของคุณเองได้ 5 ระดับตั้งแต่ S ถึง D จะโหลดอันดับรวมทั้งด่านและการต่อสู้กับผู้เล่นมาแก้ต่อก็ได้ หรือเริ่มจากกระดานว่างถ้าสนใจโหมดเดียว ลากคุกกี้ให้เข้าที่แล้วแชร์ผลเป็นลิงก์หรือภาพ PNG",
  },
  "sugar-runes": {
    en: "Plan all 8 Sugar Rune slots before spending Rune Crystals. Pick the effects you want to keep, then compare the cost and chance of reaching the rest with different locks. The estimates use game data from version 1.5.002; recheck in-game rules before spending if the crafting screen has changed.",
    "zh-Hant": "先把 8 個糖符文欄位規劃好，再花符文水晶。選定要留的效果，比較不同鎖法的花費，以及洗到其餘目標的機率。估算使用 1.5.002 版資料；如果遊戲裡的製作畫面有變，請先核對規則再花材料。",
    ja: "ルーンクリスタルを使う前に、シュガールーンの 8 枠を計画しましょう。残したい効果を選び、ロックの仕方ごとに費用と残りの目標を引く確率を比べられます。計算の基準はバージョン 1.5.002。作成画面が変わっていたら、ゲーム内のルールを確認してください。",
    ko: "룬 크리스탈을 쓰기 전에 슈가룬 8칸을 계획하세요. 남길 효과를 고른 뒤 잠금 방식마다 비용과 나머지 목표를 뽑을 확률을 비교할 수 있습니다. 1.5.002 버전 기준이므로 제작 화면이 달라졌다면 재료를 쓰기 전에 게임 안에서 규칙을 확인하세요.",
    th: "วางแผนรูนน้ำตาลให้ครบ 8 ช่องก่อนใช้คริสตัลรูน เลือกเอฟเฟกต์ที่จะเก็บไว้ แล้วเทียบต้นทุนกับโอกาสได้เอฟเฟกต์ที่เหลือของแต่ละแบบที่ล็อก ตัวเลขอิงเกมเวอร์ชัน 1.5.002 ถ้าหน้าคราฟต์เปลี่ยนแล้ว ให้เช็กกติกาในเกมก่อนใช้วัสดุ",
  },
  "stellar-link": {
    en: "Plan Starshard positions and Stellar Point spending across 10 constellations. Lock the positions you want to keep, then compare area bonuses before you copy the arrangement into the game. The calculator uses the rules from version 1.5.002 and defaults to the whole number areas displayed in that version.",
    "zh-Hant": "可以先排 10 個星座的星片位置，算好需要多少星光點數。鎖住要留的位置，比較面積加成，再到遊戲裡照著排。工具使用 1.5.002 版規則，預設以該版本遊戲畫面顯示的整數面積計算。",
    ja: "10 個の星座で星のかけらの位置と必要なポイントを試算できます。残したい位置をロックし、面積ボーナスを比べてからゲーム内で配置しましょう。バージョン 1.5.002 のルールを使い、面積は当時のゲーム表示に合わせて整数を使います。",
    ko: "별자리 10개의 별 조각 위치와 필요한 포인트를 미리 계산하세요. 남길 위치를 잠근 뒤 면적 보너스를 비교하고 게임에 배치를 옮기면 됩니다. 계산은 1.5.002 버전 규칙을 따르며, 기본값은 그 버전의 게임 화면에 표시된 정수 면적입니다.",
    th: "วางตำแหน่งชิ้นส่วนดาวและคำนวณแต้มที่ต้องใช้ได้ทั้ง 10 กลุ่มดาว ล็อกช่องที่อยากเก็บแล้วเทียบโบนัสพื้นที่ก่อนจัดตามในเกม เครื่องคำนวณอิงกติกาเวอร์ชัน 1.5.002 และใช้พื้นที่จำนวนเต็มตามที่เกมเวอร์ชันนั้นแสดงเป็นค่าเริ่มต้น",
  },
  "plate-enhancement": {
    en: "Compare protection options and budget average materials for Plating upgrades up to +25. The planner tracks 12 Plating grades and estimates gross spending before refunds. Treat those numbers as planning averages, since your own rolls will vary. The underlying rules come from game version 1.5.002.",
    "zh-Hant": "先比較保護選項，再估算鍍層強化到 +25 的平均材料。工具能記錄 12 種鍍層進度；估算用的是未扣返還的總投入。每次強化結果會有差異，請把數字當預算參考。計算規則來自 1.5.002 版。",
    ja: "保護の有無を比べて、メッキを +25 まで強化する平均素材数を見積もれます。12 種類の進行状況を記録でき、計算するのは返却分を引く前の投入量です。実際の結果は毎回変わるので、予算の目安にしてください。基準はバージョン 1.5.002 です。",
    ko: "보호 옵션을 비교하고 도금을 +25까지 올리는 데 드는 평균 재료를 알아보세요. 도금 12종의 진행 상태를 기록하며, 반환분을 빼기 전의 총 투입량을 계산합니다. 실제 강화 결과는 달라질 수 있으니 예산을 잡는 데 쓰세요. 기준은 1.5.002 버전입니다.",
    th: "เทียบตัวเลือกป้องกันแล้วประเมินวัสดุเฉลี่ยสำหรับการชุบจนถึง +25 เครื่องมือติดตามการชุบได้ 12 แบบและคำนวณยอดก่อนหักวัสดุคืน ใช้ตัวเลขเป็นแนวทางตั้งงบ เพราะผลแต่ละครั้งต่างกันได้ กติกาที่ใช้มาจากเกมเวอร์ชัน 1.5.002",
  },
} satisfies Record<string, LocalCopy>;
