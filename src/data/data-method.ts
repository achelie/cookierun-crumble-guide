import type { Locale } from "@/i18n/config";

export const dataMethod: Record<Locale, { title: string; description: string; paragraphs: string[] }> = {
  en: {
    title: "Data sources and verification",
    description: "See how Crumble Guide checks CookieRun: Crumble game data, tests lineups, marks estimates, revises guides, and handles corrections.",
    paragraphs: [
      "Cookie and Pet names, rarities, skills, and effects come from dated game data snapshots. We compare them with the in-game Collection and official patch or coupon notices where available. The calculator pages name the snapshot their estimates use.",
      "For lineup and stage advice, we compare repeated attempts on the same stage and change one slot or stat at a time where possible. A guide may also report a specific recorded run. We label estimates and examples so you can tell them apart from game rules.",
      "There is no fixed refresh interval. We check the pages affected by a balance patch, new character, or coupon announcement, and revisit recommendations when evidence changes. A guide's date changes only after an editorial review of its advice.",
    ],
  },
  "zh-Hant": {
    title: "資料來源與查核方法",
    description: "了解 Crumble Guide 如何查核遊戲資料、測試隊伍、標示估算、更新攻略及處理更正。",
    paragraphs: [
      "餅乾與寵物的名稱、稀有度、技能和效果取自有日期的遊戲資料快照。有可對照的內容時，會查看遊戲內圖鑑、官方更新公告或序號通知。計算器也會寫明估算採用哪一版資料。",
      "查核陣容和關卡建議時，我們會在同一關多試幾次，能控制的話，每次只改一個站位或數值。有些攻略也會引用一場有記錄的實戰。文章會標出估算和案例，避免和遊戲規則混在一起。",
      "本站沒有固定更新週期。平衡調整、新角色或序號公告會觸發相關頁面的查核；證據有變時再回頭看建議。攻略只有在重新檢查建議後才會改更新日期。",
    ],
  },
  ja: {
    title: "データの出典と確認方法",
    description: "Crumble Guide がゲームデータを照合し、編成を試し、推定値を示して攻略を更新する方法を紹介します。",
    paragraphs: [
      "クッキーとペットの名前、レア度、スキル、効果は、取得日が分かるゲームデータをもとにしています。確認できる場合はゲーム内の図鑑や公式の更新・クーポン告知と照合します。計算ページには使用したデータの版を記載しています。",
      "編成や攻略の確認では同じステージを複数回試し、できるだけ一度に変える枠や数値を一つに絞ります。記録した一戦を紹介する場合もあります。推定値や実戦例にはその旨を示します。",
      "更新日は固定していません。バランス調整、新キャラクター、クーポンの告知で影響を受けるページを確認し、新しい根拠が出たら推奨内容を見直します。記事の日付は攻略内容を確認してから変更します。",
    ],
  },
  ko: {
    title: "데이터 출처와 검증 방법",
    description: "Crumble Guide에서 게임 데이터를 확인하고, 팀을 시험하고, 추정치를 표시하고, 공략을 수정하는 방법입니다.",
    paragraphs: [
      "쿠키와 펫의 이름, 희귀도, 스킬과 효과는 날짜가 기록된 게임 데이터에서 가져옵니다. 비교할 자료가 있으면 게임 내 도감과 공식 업데이트·쿠폰 공지를 확인합니다. 계산기에는 추정에 쓴 데이터 버전을 표시합니다.",
      "팀과 스테이지를 검증할 때는 같은 스테이지를 여러 번 돌고, 가능하면 한 번에 자리나 수치 하나만 바꿉니다. 공략에 기록된 특정 전투를 소개하기도 합니다. 추정과 실전 예시는 게임 규칙과 구분해 표시합니다.",
      "정해진 갱신 주기는 없습니다. 밸런스 패치, 신규 캐릭터, 쿠폰 공지가 나오면 관련 페이지를 확인하고 근거가 달라지면 추천을 다시 살펴봅니다. 공략 날짜는 내용을 재검토했을 때만 바꿉니다.",
    ],
  },
  th: {
    title: "แหล่งข้อมูลและวิธีตรวจสอบ",
    description: "ดูว่า Crumble Guide ตรวจข้อมูลเกม ทดสอบทีม ระบุค่าประมาณ ปรับคู่มือ และแก้ไขข้อผิดพลาดอย่างไร",
    paragraphs: [
      "ชื่อ ระดับ สกิล และเอฟเฟกต์ของคุกกี้กับสัตว์เลี้ยงมาจากชุดข้อมูลเกมที่ระบุวันที่ไว้ เมื่อมีข้อมูลให้เทียบ เราจะเช็กกับสารานุกรมในเกม ประกาศแพตช์ หรือประกาศคูปองทางการ หน้าเครื่องคำนวณระบุเวอร์ชันข้อมูลที่ใช้",
      "ตอนตรวจคำแนะนำเรื่องทีมและด่าน เราลองด่านเดิมหลายครั้ง และถ้าทำได้จะเปลี่ยนทีละตำแหน่งหรือทีละค่า บางคู่มือยกผลจากรอบที่บันทึกไว้ เราระบุว่าตัวเลขไหนเป็นค่าประมาณและตรงไหนเป็นเพียงตัวอย่าง",
      "ไม่มีรอบอัปเดตตายตัว เมื่อมีแพตช์ปรับสมดุล ตัวละครใหม่ หรือประกาศคูปอง เราจะตรวจหน้าที่เกี่ยวข้องและกลับมาดูคำแนะนำเมื่อหลักฐานเปลี่ยน วันที่ของคู่มือจะเปลี่ยนเมื่อทบทวนคำแนะนำแล้วเท่านั้น",
    ],
  },
};
