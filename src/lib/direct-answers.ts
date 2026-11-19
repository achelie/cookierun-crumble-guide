import type { Locale } from "@/i18n/config";

export type LocalCopy = Record<Locale, string>;

export function contentDate(date: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long", calendar: "gregory", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}

export const updatedLabels: LocalCopy = {
  en: "Last updated:", "zh-Hant": "最後更新：", ja: "最終更新：", ko: "마지막 업데이트:", th: "อัปเดตล่าสุด:",
};

export const asOfLabels: LocalCopy = {
  en: "Data as of", "zh-Hant": "資料截至", ja: "データ基準日：", ko: "데이터 기준일:", th: "ข้อมูล ณ วันที่",
};

export function tierAnswer(s: number, total: number): LocalCopy {
  return {
    en: `Of ${total} ranked Cookies, ${s} are in S tier for PvE and PvP. Check each Cookie’s role and element before deciding who to upgrade.`,
    "zh-Hant": `推關與競技場綜合榜共評了 ${total} 位餅乾，其中 ${s} 位是 S 級。決定要培養誰之前，先看職業和屬性是否適合隊伍。`,
    ja: `ステージ攻略と対人戦の総合評価では、${total} 体中 ${s} 体が S ランクです。育成する前にロールと属性を確認しましょう。`,
    ko: `스테이지와 대전 종합 순위에서 쿠키 ${total}명 중 ${s}명이 S등급입니다. 키울 쿠키를 고르기 전에 역할과 속성을 확인하세요.`,
    th: `จากคุกกี้ ${total} ตัว มี ${s} ตัวอยู่ระดับ S ในอันดับรวมทั้งด่านและการต่อสู้กับผู้เล่น เช็กบทบาทกับธาตุก่อนเลือกว่าจะปั้นตัวไหน`,
  };
}

export function teamsAnswer(total: number, first: number): LocalCopy {
  return {
    en: `Choose from ${total} team presets, with ${first} on the first page. Each lists up to 12 Cookies in slot order and 3 Pets.`,
    "zh-Hant": `共有 ${total} 套配隊，第一頁列出 ${first} 套。每套按站位排列最多 12 位餅乾，另有 3 隻寵物。`,
    ja: `全 ${total} 編成のうち、最初のページには ${first} 編成を掲載しています。クッキーは最大 12 体を配置順に並べ、ペットは 3 枠です。`,
    ko: `전체 조합 ${total}개 중 첫 페이지에 ${first}개를 실었습니다. 각 조합은 쿠키 최대 12명을 배치 순서대로 보여 주며 펫은 3자리입니다.`,
    th: `มีทีมให้เลือก ${total} แบบ โดยหน้าแรกแสดง ${first} แบบ แต่ละทีมเรียงคุกกี้ตามตำแหน่งสูงสุด 12 ตัวและมีช่องสัตว์เลี้ยง 3 ช่อง`,
  };
}

export function codesAnswer(active: number, expired: number): LocalCopy {
  return {
    en: `The last check recorded ${active} active codes and ${expired} expired codes. Use only the active list on the official DevPlay coupon page, where each code can be redeemed once per account. After claiming a reward, restart the game and check your in-game mail. The count is a dated snapshot.`,
    "zh-Hant": `上次查核記錄了 ${active} 組有效序號和 ${expired} 組過期序號。兌換時只用有效清單上的序號，到 DevPlay 官方頁面輸入；每個帳號每組限用一次。領取後重開遊戲，再到遊戲信箱確認。數量以這次查核為準。`,
    ja: `前回の確認では、有効なクーポンが ${active} 件、期限切れが ${expired} 件でした。有効欄のコードを公式の DevPlay クーポンページで入力してください。各コードは 1 アカウントにつき 1 回使えます。受け取ったらゲームを再起動し、ゲーム内メールを確認しましょう。`,
    ko: `마지막 확인에서 사용 가능한 쿠폰은 ${active}개, 만료된 쿠폰은 ${expired}개였습니다. 사용 가능 목록의 코드만 공식 DevPlay 쿠폰 페이지에 입력하세요. 코드는 계정마다 한 번씩 쓸 수 있습니다. 보상을 받았다면 게임을 다시 열어 우편함을 확인하세요.`,
    th: `ตอนตรวจครั้งล่าสุดพบโค้ดที่ใช้ได้ ${active} โค้ดและโค้ดหมดอายุ ${expired} โค้ด ให้ใช้เฉพาะโค้ดในรายการที่ยังใช้ได้บนหน้าคูปองทางการของ DevPlay แต่ละโค้ดใช้ได้หนึ่งครั้งต่อบัญชี หลังรับรางวัลให้เปิดเกมใหม่แล้วตรวจกล่องจดหมายในเกม`,
  };
}

export function cookieAnswer(name: string, rarity: string, element: string, role: string, stars: number): LocalCopy {
  return {
    en: `${name} has ${rarity} rarity, the ${element} element, and the ${role} role. This profile lists the promotion steps through ${stars} stars, along with base stats and skill details. Compare the role and Synergy before adding the Cookie to a lineup, and check the promotion section before spending copies.`,
    "zh-Hant": `${name}是 ${rarity} 稀有度、${element}屬性的${role}餅乾。這頁列出最高 ${stars} 星的升星資料，也整理基礎能力和技能。想把這位餅乾排進隊伍，先看職業與協同效果；要用重複餅乾升星時，再核對各階段需求。`,
    ja: `${name}はレア度 ${rarity}、${element}属性で、ロールは${role}です。このページでは最大 ${stars} 星までの昇星段階と、基礎ステータスやスキルを確認できます。編成に入れる前にロールとシナジーを見て、重複分を使う前に昇星条件を確かめましょう。`,
    ko: `${name}의 희귀도는 ${rarity}, 속성은 ${element}, 역할은 ${role}입니다. 이 페이지에는 최대 ${stars}성까지의 승급 단계와 기본 능력치, 스킬 정보가 나옵니다. 팀에 넣기 전에 역할과 시너지를 살펴보고, 중복 쿠키를 쓰기 전에 승급에 필요한 수량을 확인하세요.`,
    th: `${name} เป็นคุกกี้ระดับ ${rarity} ธาตุ${element} และมีบทบาท${role} หน้านี้รวมข้อมูลการเลื่อนขั้นถึง ${stars} ดาว พร้อมค่าสถานะพื้นฐานและรายละเอียดสกิล ก่อนจัดลงทีมให้ดูบทบาทกับซินเนอร์จีก่อน และเช็กจำนวนตัวซ้ำที่ต้องใช้ก่อนเลื่อนขั้น`,
  };
}
