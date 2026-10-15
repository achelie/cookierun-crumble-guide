// Custom planner copy. Game names and guides are resolved from the database first.
// Each source phrase is retained for repeatable imports and translation provenance.
export const customEnglish = new Map(String.raw`
 個||| units
160个配置结果统一按权重总和13050归一，已核实原生概率展示；不把权重当万分比。|||All 160 configured outcomes use total weight 13,050, matching the native probability display. Weights are not basis-point probabilities.
BasisPoint 原生换算已核实：百分比词条 raw/100，平值 raw/10000。|||Verified native BasisPoint conversion: percentage effects use raw/100; flat effects use raw/10000.
全部8槽的锁定计入费用，包括未启用栏位；只有已启用词条计入本工具目标和加成。本轮两次手动加工观察到未启用槽也生成或更新，锁定的未启用槽保留。|||Locks in all 8 slots count toward fees, including inactive slots. Only active effects count toward targets and bonuses. Two manual crafts showed inactive effects generating/updating while locked inactive effects remained.
有效折扣按 gameBoostValues[0]×Count 累加。费用=max(0,基准费用-trunc(基准费用×总折扣/100))。工具默认0%，账号生效状态由用户填写。|||Active discounts sum gameBoostValues[0]×Count. Cost=max(0,base cost−trunc(base cost×total discount/100)). Default: 0%; enter your account's active discount.
客户端自动停止跳过锁定词条；勾选忽略停用栏位才排除未启用词条。稀有度至少达到所选等级，任一选中效果达标；空效果选择接受全部。|||Client auto-stop skips locked effects. Inactive effects are excluded only when Ignore Inactive Slots is checked. Rarity must reach the selected level and any chosen effect must match; choosing no effects accepts all.
网页数量目标、数值门槛及逐步锁定属于规划功能；独立槽位/轮次抽样、期望和预算概率继续是模型假设。|||Count/value targets and progressive locking are planner features. Independent slots/crafts, expected values and budget probabilities remain model assumptions.
本轮同版Devil Cookie实机：两次加工分别扣20与40，后一笔锁定未启用第3槽；共扣60。其后余额额外增加30，来源未读取，另行记账。|||Same-version Devil Cookie observation: two crafts cost 20 and 40, the latter locking inactive slot 3; total 60. The balance later increased by 30 from an unread source, recorded separately.
0～7锁费用全部对上；8槽可全部锁定，此时加工与自动加工按钮禁用。测试锁已解除。|||Fees for 0–7 locks all matched. All 8 slots can be locked, disabling Craft and Auto-Craft. Test locks were cleared.
游戏概率表五稀有度及12条SSR明细与权重/13050吻合；两次结果不能证明随机独立性或不存在隐藏保底。|||The five rarities and 12 SSR entries in-game match weight/13,050. Two outcomes cannot prove independence or the absence of hidden pity.
官方完整表已核对160项概率、160项效果值及14种单位，旧UI仅12条明细的观察范围不再构成公开概率资料缺口。随机独立性及保底规则仍未由本次官方资料确认。|||The full official table verifies 160 probabilities, 160 effect values and 14 units. The earlier 12-entry UI sample no longer leaves a gap in published probability data. These sources still do not confirm independence or pity rules.
正在读取糖符文配置…|||Loading Sugar Rune configuration…
已锁定的 |||Locked effects: 
。配置來源：LinkBonuss、LinkSuffleCosts、ConstellationUnlocks、StatBoosts、CombatPropertyCalculates、Items 與官方中英文文本。星位外觀來自 StellarLinkPage 預製體；十二點排列與原生繪製座標吻合；交點分割與各封閉面填充已由載入客戶端核實。網頁使用理想十二邊形的雙精度參考；本輪同版UI支持向下取整，星位模式據此估算整數面積。服務端數值與退化邊界未全核實。|||. Sources: LinkBonuss, LinkSuffleCosts, ConstellationUnlocks, StatBoosts, CombatPropertyCalculates, Items and official Chinese/English text. Artwork comes from the StellarLinkPage prefab; the twelve points match native drawing coordinates. Loaded-client evidence verifies intersection splitting and filling each enclosed face. This page uses a double-precision regular dodecagon reference. The same-version UI supports rounding down for geometric integer-area estimates. Server values and degenerate boundaries are not fully verified.
倍率按原始 BasisPoint 換算顯示。遊戲整數面積轉為 BasisPoint 時先向下取整，再與配置倍率做整數相乘。這段換算及跨星座累積已由同版載入客戶端核實。交叉連線按各封閉區域填充已核實；三張原遊戲截圖支持正十二邊形面積分母；另有8月8日原始遊戲錄像的完整星位顯示71%，各封閉面參考71.132%，奇偶填充48.871%和非零繞數56.480%均不符。舊錄像版本未確認。本輪完整7星布局顯示68%，理想面積68.8996%：向下取整68吻合，四捨五入69不符；直接素材坐標面積69.0974%也不符。官方已公開等概率完整排列。預設仍填遊戲整數，取消勾選按星位向下取整估算，再使用原生加成換算；只取得一個當前有區分力布局。|||Multipliers convert from raw BasisPoint values. Integer in-game area converts to BasisPoints with truncation, then multiplies by the configured multiplier using integer arithmetic. This conversion and cross-constellation accumulation are verified in the loaded same-version client. Enclosed-face filling is verified. Three original game screenshots support a regular-dodecagon denominator. August 8 footage shows 71% for a complete layout: enclosed faces give 71.132%, unlike even-odd fill (48.871%) or nonzero winding (56.480%). The footage version is unconfirmed. A current seven-Starshard layout shows 68% versus ideal area 68.8996%: flooring to 68 matches, rounding to 69 does not; direct asset coordinates give 69.0974% and also do not match. Official sources publish equally likely complete configurations. Default to the in-game integer; uncheck for floored geometric estimates followed by native bonus conversion. Only one current distinguishing layout is available.
本輪同版面積與鎖星實測|||Same-version area and lock observations
68%實機原圖|||Original 68% game screenshot
官方英文機率公告（3～11星）|||Official English probabilities (3–11 Starshards)
交叉區域原生核實|||Native intersecting-region verification
三張原遊戲截圖數值核對|||Three original screenshot comparisons
71%原始錄像核對|||Original 71% footage comparison
原始錄像00:32|||Original footage at 00:32
原生规则证据 JSON|||Native rule evidence JSON
下載本站整理資料 JSON|||Download compiled tool data JSON
。2026-10-15已進入雷電模擬器9的裝備盤：逐級讀取 +0～+24 的無保護機率、強化費用、大成功返還比例和可見修復費，共185個數值全部與配置吻合。高階畫面是詳情預覽，不是實際高階強化結果。|||. On 2026-10-15, Plating was inspected in LDPlayer 9: unprotected probabilities, enhancement costs, Super refund rates and visible repair fees for +0–+24 gave 185 values, all matching configuration. High-grade screens are detail previews, not actual high-grade enhancement outcomes.
保護規則由同版已載入客戶端核實，本輪遊戲說明也確認：防止降階使降階機率歸零；減緩碎裂把碎裂機率減半。客戶端將避免的機率轉入維持，成功與大成功不變。實際高階保護開關尚未操作。+10 開始有降階，+15 開始有碎裂，以逐級機率表為準。|||Protection is verified in the loaded same-version client and supported by in-game help: Prevent Downgrade makes its probability zero; Reduce Break Chance halves Break probability. The avoided probability moves to No Change, leaving Upgrade and Super unchanged. High-grade protection toggles have not been exercised live. Downgrade starts at +10 and Break at +15; refer to the grade probability table.
遊戲資訊列及說明均顯示碎裂降2階，與已核實的 GetNextGrade 一致；付修復費則回到強化前階級，原次材料不退。結果限制0～25，+24大成功到+25。本輪沒有實際碎裂或修復交易。|||Game information and help show Break reduces two grades, matching verified GetNextGrade logic. Paying for repair restores the pre-attempt grade without refunding that attempt's materials. Results stay within 0–25; a Super at +24 reaches +25. No live Break or repair transaction was performed in this round.
已用免費簽到材料完成4次低階強化：3次普通成功、1次大成功。盔甲 +0 → +2，費用1鋼、返還1鋼，餘額2 → 2。+0配置／預覽返還比例為10%，直接對0.1向下取整或四捨五入得到0，與此樣本不符；向上取整和「最少返1」都仍相容，尚不能選定全階級公式。未支付保護材料，不能判定保護費是否返還。|||Four low-grade enhancements used free check-in materials: three Upgrades and one Super. Armor +0 → +2 cost 1 Chocosteel and refunded 1; balance 2 → 2. The +0 configuration/preview refund rate is 10%. Flooring or rounding 0.1 gives 0 and does not match this sample. Ceiling and a minimum refund of 1 both remain possible, so no universal grade formula is established. No protection materials were paid, so their refund eligibility is undetermined.
本輪領取免費鋼5、支付4、返還1，淨耗3、剩2；未消耗糖漿、水晶或勳章。材料預算繼續列總投入，不扣未核實的返還。4次結果不證明隨機獨立性、保底或機率頻率；預測仍採固定策略、固定配置及獨立抽取，達標後停止。|||This round received 5 free Chocosteel, paid 4, refunded 1, spent 3 net and retained 2. No Metal Syrup, Crystals or Medals were used. Budgets retain gross investment without uncertain refunds. Four outcomes do not establish independence, pity or empirical frequencies. Forecasts use a fixed strategy, fixed configuration and independent draws, stopping at the target.
已追蹤的普通強化返還鏈接收伺服器Rewards的整數數量，再按材料ID合併顯示；這15個方法未發現返還比例或取整計算。尚未完整覆蓋全客戶端的配置讀取者及間接呼叫，不能排除其他位置存在相關邏輯。完整返還材料範圍與服務端算法仍未知。|||The traced normal enhancement refund chain receives integer quantities from server Rewards and groups them by material ID for display. These 15 methods contain no refund-rate or rounding calculation. Client configuration readers and indirect calls are not fully covered, so related logic elsewhere cannot be ruled out. The full eligible-material scope and server algorithm remain unknown.
個非空方法區間；已確認的返還比例讀寫用於配置儲存與百分比展示，未取得完整返還取整公式。索引區間約佔程式碼段35.44%，其餘未綁定區間、間接呼叫及指標別名仍未排除。|||nonempty method intervals. Verified refund-rate reads/writes store configuration and display percentages; the full integer refund formula was not recovered. Indexed intervals cover about 35.44% of the code section; unbound intervals, indirect calls and pointer aliases remain unexcluded. 
個恢復程序集，掃描|||recovered assemblies; scanned 
2026-10-16追加解包：索引全部|||Additional extraction 2026-10-16: indexed all 
數值|||number
整數|||integer
 的||| 
缺少完整锁定消耗曲线|||Missing the full lock-cost curve
逐步保留计划使用完整基准消耗曲线，不支持单点手动消耗|||Keep-match planning requires the full base-cost curve; manual single-point cost is unsupported
次数|||Attempt count
未锁槽位不足|||Not enough unlocked slots
未锁槽位|||Unlocked slots
尚需词条|||Remaining effects needed
手动单次消耗|||Manual cost per craft
缺少对应锁定数量的消耗表|||No cost row for this lock count
所有已开启槽位均已锁定，无法加工。|||All active Rune slots are locked. Crafting is unavailable.
未锁定槽位不足；已锁定的非目标词条占用了位置。|||Not enough unlocked slots; non-matching locked effects occupy the available space.
目标数量超过已开启槽位，请降低目标或提高角色阶级。|||The target exceeds active slots. Lower the target or increase the Cookie grade.
制作次数|||Craft count
目标词条数|||Target effect count
当前总折扣|||Current total discount
空词条不能锁定|||An empty effect cannot be locked
词条配置不存在|||Unknown effect configuration
角色阶级|||Cookie grade
基准消耗|||Base cost
没有有效权重|||No valid weights
结果权重无效|||Invalid outcome weight
请输入有效数值门槛|||Enter a valid value threshold
数值门槛只能用于单一效果|||A value threshold requires exactly one effect
目标效果不存在|||Unknown target effect
请选择有效目标稀有度|||Choose a valid target rarity
目标数量|||Target count
槽位数|||Slot count
无效概率|||Invalid probability
超出有效范围|||Outside the valid range
找不到此鎖定數的費用配置。|||No cost configuration for this lock count.
星座倍率無效。|||Invalid constellation multiplier.
遊戲面積須為 0–100 的整數。|||In-game area must be an integer from 0–100.
遊戲顯示面積須為 0–100 的整數百分比。|||In-game area must be an integer percentage from 0–100.
重設次數須為 0–1,000,000 的整數。|||Reset count must be an integer from 0–1,000,000.
點數預算須為 0–1兆之間的整數。|||Point budget must be an integer from 0–1 trillion.
每顆星星須使用不同的有效星位。|||Each Starshard must occupy a different valid point.
此位置上的星星已鎖定。|||The Starshard at this point is locked.
請選擇有效星位。|||Choose a valid point.
請先解除這顆星星的鎖定。|||Unlock this Starshard first.
請先解除將移除星星的鎖定。|||Unlock the Starshard to be removed first.
星星數量須為 3–12。|||Starshard count must be 3–12.
階級必須在配置範圍內。|||Grade must be within the configured range.
嘗試次數须為 0–1,000,000 的整數。|||Attempt count must be an integer from 0–1,000,000.
此策略的期望值過大，無法可靠求值；請使用有限次數預測。|||Expected values are too large for a reliable result. Use the finite-attempt forecast.
碎裂規則資料尚未更新，請重新整理。|||Break rules are unavailable. Reload the page.
缺少已核實的強化結果規則，請重新整理。|||Verified enhancement outcome rules are unavailable. Reload the page.
保護規則資料尚未更新，請重新整理。|||Protection rules are unavailable. Reload the page.
0～24阶125项基础概率一致；保护重分配、成功阶级变化已有客户端依据及内置官方指南。新增官方公告确认碎裂降2阶、修复回尝试前、修复不退本次投入、全部10档修复费、上限25及24阶100%配置返还。|||All 125 base probabilities for grades 0–24 match. Client evidence and the built-in official guide support protection redistribution and outcome grade changes. New official notices confirm Break −2, repair to the pre-attempt grade without refunding that attempt's investment, all 10 repair fees, the +25 cap and the configured 100% refund at +24.
碎裂由旧版固定回10阶改为降2阶，公告明确自2026-09-23更新应用。|||Break changed from resetting to +10 to losing two grades, effective from the 2026-09-23 update according to the notice.
修复回强化尝试前阶级，不能把修复解释为退还该次钢／糖浆。|||Repair restores the pre-attempt grade; it does not refund that attempt's Chocosteel/Metal Syrup.
15～24阶修复费10项全部匹配；20～24阶新增概率25项全部匹配。|||All 10 repair fees for +15–+24 and all 25 new probabilities for +20–+24 match.
+25上限、+24大成功100%返还比例获得外部官方公告佐证。|||An external official notice supports the +25 cap and +24 Super's 100% configured refund rate.
全阶级大成功返还整数公式|||Integer Super refund formula across grades
原始比例和逐级显示已取得，但向上取整、最低返1或其他服务端整数算法尚无法区分。官方100%公告不解决低于100%时的小数取整。|||Raw rates and per-grade displays are available, but ceiling, a minimum refund of 1 and other server integer algorithms cannot yet be distinguished. The official 100% notice does not resolve fractional rounding below 100%.
不能准确给出扣除返还后的净耗；+0返1样本不能外推全部阶级。|||Net costs after refunds cannot be stated precisely. The +0 refund-of-1 sample cannot be extrapolated to every grade.
期望和预算继续按未扣返还的平均总投入。|||Expected values and budgets continue to show average gross investment before refunds.
保护材料返还资格与计量基数|||Protection-material eligibility and refund base
大成功“材料／财货返还”没有逐项列出防降阶、减缓碎裂糖浆是否包含，以及两项保护费合并后还是分别处理。修复不退款是另一条规则。|||Super's material/currency refund does not itemize eligibility of Downgrade/Break protection Syrup, or whether the two fees are combined or handled separately. Non-refundable repair is a separate rule.
不能用100%返还文案直接推定保护糖浆全部返还。|||The 100% refund wording does not establish that all protection Syrup is refunded.
不扣任何未知保护返还，不给默认资格。|||Do not deduct unknown protection refunds or assume eligibility.
历史相关概率／隐藏保底|||History-dependent probabilities / hidden pity
官方有逐阶结果表，但未明确不存在按历史变化的机制，也未给出完整服务端抽样算法。|||Official sources provide grade outcome tables but do not rule out history-dependent mechanics or publish the complete server sampling algorithm.
平均材料和有限次数预测采用固定逐阶转移模型。|||Average materials and finite-attempt forecasts use a fixed grade-transition model.
保留数学模型口径；平均值不作为保证或材料上限。|||Keep the mathematical-model label; averages are neither guarantees nor material caps.
保护策略及是否修复由用户选择；费用采用1.5.002快照。|||Choose protection and repair strategy yourself; fees use the 1.5.002 snapshot.
未实际触发高阶保护、碎裂或修复交易属于观察覆盖限制，不能把已有官方指南／客户端／公告支持的规则全部写成未知。|||No live high-grade protection, Break or repair transactions were observed. This limits observation coverage; it does not invalidate rules already supported by official guides, client evidence and notices.
9月公告的一次性旧版补偿与每次强化的大成功返还分开处理，补偿不参与工具净耗公式。|||September's one-time compensation for the older version is separate from Super refunds per enhancement. Compensation is excluded from tool cost formulas.
官方碎裂与修复改版公告|||Official Break and repair update notice
搭配糖符文、锁定想保留的效果，再规划你的加工次数与符文水晶。|||Equip Sugar Runes, lock the effects you want, then plan crafting attempts and Rune Crystals.
制作规划|||Planner
详细词条概率|||Detailed effect probabilities
糖符文加工|||Craft Runes
本地规划|||Local planner
每次消耗|||Per craft
角色详情|||Cookie details
选择角色|||Choose Cookie
糖符文角色|||Sugar Rune Cookie
已开启糖符文槽位|||Active Sugar Rune slots
已开启槽位|||Active slots
已开启|||active
已锁定|||locked
可加工|||to craft
糖符文盘|||Sugar Rune wheel
向左旋转符文盘|||Rotate Rune wheel left
向右旋转符文盘|||Rotate Rune wheel right
选择一个符文槽位|||Select a Rune slot
点击符文查看并调整词条|||Select a Rune to view and edit its effect
目标设置|||Target settings
查看加工计划|||View crafting plan
锁定的词条会保留，全 8 槽锁定计费；只有已启用词条计入加成。|||Locked effects stay. Locks in all 8 slots affect cost; only active effects add bonuses.
符文效果|||Rune effects
锁定已有达标词条|||Lock current matching effects
锁定达标|||Lock matches
清空当前词条|||Clear current effects
清空|||Clear
当前配置加成合计|||Current total bonuses
按相同效果汇总，仅表示糖符文配置，不模拟角色最终战斗数值。|||Totals group matching effects from Sugar Runes only; they do not simulate final Cookie combat stats.
设置制作目标|||Set crafting targets
目标最低稀有度|||Minimum target rarity
最低稀有度|||Minimum rarity
所选稀有度及以上|||Selected rarity or higher
全部稀有度|||All rarities
目标词条数量|||Target effect count
目标效果数值下限|||Minimum target effect value
目标效果|||Target effects
最多 3 类 · 不选表示任意效果|||Up to 3 types · Leave empty for any effect
所选效果任选一类即达标，不要求每类都出现。|||Any selected type counts; you do not need every type.
单一效果数值下限|||Minimum value for one effect
留空 = 不限数值|||Empty = any value
选择单一效果后可填写。数量与数值门槛属于网页规划；游戏自动停止只需一个未锁词条满足稀有度及任一效果。|||Choose one effect to set a minimum. Count and value targets are planner features; in-game auto-crafting stops when one unlocked effect meets the rarity and any chosen effect.
符文水晶预算|||Rune Crystal budget
水晶预算|||Crystal budget
计划加工次数|||Planned crafts
糖符文制作计划|||Sugar Rune crafting strategy
制作计划|||Crafting strategy
固定锁定 · 每次保留相同槽位|||Fixed locks · Keep the same slots
逐步保留 · 新达标词条立即锁定|||Keep matches · Lock new matches
当前有效总折扣（%）|||Total active discount (%)
当前有效总折扣|||Total active discount
填写当前有效折扣之和，默认无折扣。账号生效状态以游戏为准。|||Enter the sum of active discounts. Default: none. Check your active account bonuses in-game.
使用游戏内显示的单次消耗|||Use the cost shown in-game
实际每次消耗|||Actual cost per craft
手动单次水晶消耗|||Manual Crystal cost per craft
保存本角色方案|||Save Cookie plan
复制方案链接|||Copy plan link
糖符文方案链接|||Sugar Rune plan link
方案链接|||Plan link
方案保存在当前浏览器，也可复制包含设置的本地链接。|||Plans stay in this browser. Copy a link to share these settings.
制作计划结果|||Crafting forecast
配置权重模型|||Configured weight model
计算口径|||Model assumptions
按当前配置池归一化，假设各槽位、各次加工独立抽取；本计划只统计已启用槽的目标与加成，全部 8 槽的锁定计入费用；既有两次手动加工已观察到未启用槽生成／更新及锁定保留，仍未证明抽样独立性。结果用于规划，不表示必定获得。逐步保留由本工具模拟手动锁定策略，不代替游戏的自动加工行为。|||Weights are normalized across the current pool, assuming independent slots and crafts. Targets and bonuses use active slots; all 8 slots count toward lock fees. Two recorded manual crafts showed inactive slots generating/updating and retaining locked effects, but do not prove independence. Results are planning estimates, not guarantees. Keep matches simulates manual locking, rather than in-game auto-crafting.
目标结果与制作规则|||Target outcomes and crafting rules
下载原始词条表 CSV|||Download original effect pool CSV
槽位开启与锁定成本|||Slot unlocks and lock costs
单槽稀有度权重|||Single-slot rarity weights
这是整个配置池的权重归一化结果，不是只在已选目标中重新分配。|||Weights are normalized across the full pool, rather than redistributed among selected targets.
符合目标条件的结果|||Outcomes matching your target
数据来源与规则限制|||Sources and rule limits
2026-10-16与官方表逐项比对：160项概率按官方六位小数显示精度一致，160项效果值和14种效果单位一致；移动速度和技能加速为固定值，其余为百分比。|||Checked against the official table on 2026-10-16: all 160 probabilities match at six decimal places, along with 160 effect values and 14 units. Mov SPD and Skill Haste are flat values; the others are percentages.
官方概率说明|||Official probability notes
逐项比对记录|||Item-by-item comparison
下载锁定成本 JSON|||Download lock costs JSON
下载槽位规则 JSON|||Download slot rules JSON
无法达到|||Unreachable
糖符文数据读取失败|||Could not load Sugar Rune data
不记录当前词条|||No current effect recorded
尚未记录词条|||No effect recorded
编辑符文槽位|||Edit Rune slot
选择符文槽位|||Select Rune slot
空符文|||Empty Rune
当前词条|||Current effect
选择已有词条…|||Choose current effect…
未启用 · 不计加成，锁定仍计费|||Inactive · No bonus; locks still cost
解除锁定|||Unlock
锁定保留|||Lock to keep
锁定槽位|||Lock slot
槽位|||Slot
个达标词条|||matching effects
个结果满足条件 · 命中权重|||matching outcomes · Matching weight
单槽概率|||Single-slot chance
单槽占比|||Single-slot share
单槽|||Per slot
稀有度|||Rarity
效果|||Effect
数值|||Value
权重|||Weight
配置池中没有满足该门槛的结果。|||No outcomes in the pool meet this threshold.
个词条满足目标。无需继续加工。|||locked effects meet the target. No more crafting needed.
还需消耗的符文水晶|||Remaining Rune Crystals needed
当前目标已经完成。可提高目标数量或更改目标效果后再规划。|||Target complete. Increase the count or change the target effects to plan again.
配置池中没有符合目标的结果。请调整最低稀有度、效果或数值门槛。|||No pool outcomes match. Adjust the minimum rarity, effect or value.
已锁|||Locked
槽，其中|||slots, with
个达标；尚需|||matches; still need
个，|||more.
个已启用槽纳入目标规划。|||active slots included in the target plan.
另有|||Also,
个未启用槽已锁，计入费用。|||inactive locked slots count toward fees.
水晶预算下的完成率范围|||Crystal budget: completion chance range
随锁定数增加，单次消耗会改变。按每次消耗的最小/最大值给出保守范围；这是独立抽取模型的概率界，不是精确预算完成率。|||Cost changes as locks increase. Minimum/maximum costs provide conservative bounds under independent draws, rather than an exact budget completion rate.
水晶可加工|||Crystals available; crafts:
无水晶限制|||unlimited by Crystals
在预算内至少有一次加工完成目标的模型概率；锁定状态在整个计划中保持不变。|||Model chance of completing the target at least once within budget. Locks stay fixed throughout the plan.
逐步增加锁定数，各阶段均应用总折扣|||Locks increase in stages; the total discount applies at each stage
全槽锁定数量对应费用，已应用总折扣|||Cost for locks across all slots, with total discount applied
使用你填写的游戏内单次消耗|||Uses your entered in-game cost per craft
每次水晶消耗|||Crystals per craft
次内完成率|||craft completion chance
按所选制作计划计算|||Based on the selected crafting strategy
达到目标的期望加工次数|||Expected crafts to target
期望值不能视为必定完成的次数|||An average is not a guaranteed completion count
达到目标的期望水晶|||Expected Crystals to target
从当前已锁状态出发|||Starting from the current locks
次固定加工计划消耗|||fixed-lock crafts cost
水晶|||Crystals
超过预算|||Over budget by
预算可覆盖该次数。|||The budget covers these attempts.
单次加工完成目标的概率：|||Chance of completing the target in one craft:
逐步锁定的消耗阶段|||Keep-match cost stages
新保留达标词条|||New matches kept
总锁定数|||Total locks
可重铸槽|||Slots to reroll
每次水晶|||Crystals per craft
一轮可能同时出现多个达标词条，模型会直接跳过中间阶段。只在达到目标前继续加工。|||Multiple matches can appear in one craft, so the model skips intervening stages. Crafting stops at the target.
如果逐步保留新达标词条|||If you keep new matching effects
相同总折扣下，模型期望|||With the same total discount, the model expects
这里使用完整配置曲线与总折扣，未使用单点实际费用。|||This uses the full configured cost curve and total discount, without the manual single-point cost.
锁定能保留结果，也会提高后续每次成本；本工具不会把这一方案标成必然更省。|||Locks retain effects and increase later costs. This strategy is not always cheaper.
配置平值|||configured flat value
每轮将新达标词条保留并锁定，随后按增加的锁定数继续加工，达到目标即停止。|||Keep and lock new matches after each craft, continue with the increased lock count, and stop at the target.
每次加工保留相同的已锁槽位；未锁定槽位每次都会重新抽取。|||Keep the same locked slots; every unlocked slot rolls again each craft.
全 8 槽的锁定数计费。总折扣按当前有效增益相加填写（如 10% + 5% = 15%），默认 0%；先向下取整减免额，再从基准费用扣除。单点实际费用优先，不再重复打折。|||Locks across all 8 slots determine cost. Add active discounts (e.g. 10% + 5% = 15%); default 0%. Round the reduction down, then subtract it from the base cost. A manual actual cost takes priority, without applying the discount again.
个当前达标词条未锁定，下一次加工会重置这些词条。可先点击「锁定已有达标词条」。|||current matching effects are unlocked and will roll again. Use “Lock current matching effects” to keep them.
仅已启用槽的词条计入目标与加成；未启用槽的锁定也会提高费用。|||Only active slots count toward targets and bonuses; inactive locks still increase cost.
还未填写当前词条。|||No current effects entered.
目标条件或输入无效|||Invalid target or input
类效果|||effect types
个结果 · 总权重|||outcomes · Total weight
数据版本|||Data version
开启阶级|||Unlock grade
全槽已锁数量|||Locked slots (all slots)
基准水晶|||Base Crystals
核实范围：同版已载入客户端代码、原始配置与两次实机手动加工（扣20与40）。本轮已验证未启用槽生成、锁定保留和计费，另对照了概率面板。服务端随机独立性、隐藏保底与账号权益记录未恢复。|||Evidence covers loaded client code of the same version, original configuration, and two manual in-game crafts costing 20 and 40. Inactive slot generation, lock retention and fees were observed, and the probability panel was compared. Server-side independence, hidden pity and account entitlement records remain unrecovered.
下载原生规则证据 JSON|||Download native rule evidence JSON
本轮实机加工与概率核对|||Current in-game crafting and probability checks
未启用槽锁定实机图|||Inactive slot lock screenshot
槽已开启|||slots active
及以上|||or higher
链接中的方案无效，已使用默认设置|||Invalid shared plan. Default settings restored.
最多选择 3 类目标效果|||Choose up to 3 target effect types
当前词条已清空|||Current effects cleared
当前没有满足目标的已记录词条|||No recorded effects match the target
已保存「|||Saved “
」方案；下次选择该角色会恢复。|||” plan. It will restore when you choose this Cookie again.
本角色方案已保存|||Cookie plan saved
方案链接已复制，可在同一台电脑上的浏览器恢复这组设置。|||Plan link copied. Open it in another browser to restore these settings.
方案链接已复制|||Plan link copied
方案链接已显示，请手动复制。|||Plan link shown. Copy it manually.
浏览器未允许自动复制，请复制下方方案链接|||Clipboard access unavailable. Copy the plan link below.
。请确认本地服务和 data/sugar-runes.json 可用。|||. Please reload and check that the tool data is available.
角色|||Cookie
糖符文|||Sugar Runes
选择|||Choose
次|||attempts
有 |||There are 
个||| 
槽|||slots
核实范围|||Evidence scope
规则核实清单|||Rule verification checklist
官方资料核对|||Official source check
官方资料已覆盖|||Covered by official sources
仍待明确的规则|||Rules still unconfirmed
对计算的影响：|||Effect on calculations:
需要用户填写|||Your inputs
证据范围说明|||Evidence scope
未确认仅指本次实际读取的资料范围，不表示所有官方渠道均未公开。本轮没有新增游戏操作或材料交易。|||Unconfirmed refers to the sources examined here, not every official channel. This round added no in-game actions or material transactions.
完整核对与缺口 JSON|||Full audit and open questions JSON
官方糖符文／装备盘概率表|||Official Sugar Rune / Plating probabilities
已补充的官方依据与仍待确认的 2 项规则|||Added official evidence and 2 open rules
已补充的官方依据与仍待确认的 3 项规则|||Added official evidence and 3 open rules
160项概率、160项效果值及14种单位已与官方表一致；基准费用、锁定范围、折扣取整和自动停止条件有配置／客户端依据。|||All 160 probabilities, 160 effect values and 14 units match the official table. Configuration and client evidence support base fees, lock scope, discount rounding and auto-stop conditions.
旧清单“其余148条概率明细未逐行读UI”已由完整官方160项对照覆盖，无需再逐条实测。|||The complete 160-entry official comparison covers the 148 entries not previously read from the UI; individual live tests are no longer needed for these published probabilities.
跨槽／跨轮随机关系与保底|||Independence across slots/crafts and pity
官方公布单项概率，但未明确各槽和每次加工相互独立，也未明确排除隐藏保底或历史相关机制。|||Official sources publish individual probabilities but do not explicitly confirm independence across slots and crafts or rule out hidden pity/history-dependent mechanics.
单槽权重可直接核对；多词条达标率、平均次数和预算概率仍依赖独立抽样假设。|||Single-slot weights can be checked directly. Multiple-effect completion rates, expected attempts and budget probabilities still assume independent draws.
保留模型假设标签，不把期望值当保底。|||Keep the model-assumption label. An expected value is not a pity guarantee.
自动加工批次与边界状态|||Auto-crafting batches and edge states
客户端停止条件已恢复；服务器批次是否在中途命中后继续扣费，以及全部已启用槽锁定、仍有未启用槽未锁时的行为，没有完整证据。|||Client stop conditions are recovered. Evidence does not fully establish server charges after a mid-batch match, or behavior when all active slots are locked while inactive slots remain unlocked.
不影响已有单项概率；不能宣称网页模拟完全复刻游戏自动加工交易。|||Published individual probabilities are unaffected. The planner cannot claim to reproduce every in-game auto-crafting transaction.
逐步保留继续作为手动规划；未启用槽行为保留既有两笔观察的有限范围。|||Keep matches remains a manual planning strategy. Inactive-slot behavior stays limited to the two recorded observations.
当前账号实际生效的折扣权益属于账号输入，非通用规则缺口；默认0%，可填游戏显示的单次费用。|||Your active discount is an account input, not a missing general rule. Default: 0%; you may enter the per-craft cost shown in-game.
折扣叠加及取整已有客户端公式，不再列为通用未知。|||Client formulas establish discount stacking and rounding; these are no longer general unknowns.
未启用槽生成／更新及锁定保留已有两笔手动加工观察；不再笼统写成未核实。|||Two manual crafts document inactive-slot generation/updating and lock retention; these are no longer broadly labeled unverified.
关闭选项列表|||Close options
搜索选项|||Search options
搜索名称、稀有度或数值…|||Search name, rarity or value…
没有匹配选项|||No matching options
选择选项|||Choose an option
配置星星的順序與位置，保留鎖定點，規劃下一次重設連線。|||Arrange Starshard order and positions, retain locked points, and plan your next link reset.
查看原始配置|||View original configuration
正在讀取星際連線資料…|||Loading Stellar Link data…
星盤規劃|||Constellation planner
本地方案|||Local plan
每次重設|||Per reset
選擇星座|||Constellation
已放置星星數|||Placed Starshard count
已放置星星|||Starshards
納入方案總覽|||Include
配置倍率|||Multiplier
封閉區域面積參考|||Enclosed area reference
包圍範圍上限|||Envelope upper bound
點星星選取；點空星位移動。從下拉選單可交換未鎖定的星星。|||Select a Starshard; choose an empty point to move it. Use the dropdown to swap unlocked Starshards.
幾何最大範圍方案|||Maximum geometric outline
解除全部鎖定|||Clear all locks
建議會保留鎖定星星的順序與位置，不替遊戲執行重設。|||Suggestions keep locked Starshards in order and position. They do not perform an in-game reset.
連線順序與鎖星|||Link order and locks
序號決定連線次序，最後一顆連回第一顆。P1–P12 是本頁的候選位置標記。按已放置數配置：遊戲 7/8 代表已放置 7 顆、已啟用 8 顆；新增星星在重設後加入。|||Numbers set the link order; the last connects to the first. P1–P12 label candidate positions here. Use the placed count: in-game 7/8 means 7 placed, 8 activated; newly activated Starshards join after a reset.
本星座加成 · 客户端规则|||Constellation bonus · Client rules
重設費用與預算|||Reset costs and budget
星際點數預算|||Stellar Point budget
計劃重設次數|||Planned resets
固定保留相同鎖星數，按 1.5.002 的基準費用計算。隨後改變鎖定數時，請重新規劃。|||Uses a fixed lock count and base fees from 1.5.002. Recalculate when the lock count changes.
加成參考|||Bonus reference
使用遊戲顯示的星座面積|||Use the constellation area shown in-game
遊戲顯示面積（%）|||In-game area (%)
遊戲顯示的星座面積|||In-game constellation area
0–100 的整數|||Integer from 0–100
預設填入遊戲顯示的整數面積，按已核實的客戶端取整規則換算加成（如 57% 面積、20% 倍率 = 11.39%）。取消勾選按星位的封閉區域面積向下取整估算，再按相同客戶端規則換算加成。本輪同版樣本 68.8996%→68% 支持此估算；服務端數值與退化邊界未全核實。星位編輯不會更新遊戲面積；請同步填寫遊戲當前值。|||By default, enter the integer area shown in-game. Verified client rounding converts it into bonuses (e.g. 57% area at a 20% multiplier = 11.39%). Uncheck to estimate enclosed geometric area, round it down, then apply the same client conversion. The same-version 68.8996% → 68% sample supports this estimate; server precision and degenerate boundaries remain incompletely verified. Editing positions does not change the entered in-game area; update it yourself.
保存全部星座方案|||Save all constellations
複製方案連結|||Copy plan link
本地方案連結|||Plan link
星際連線方案連結|||Stellar Link plan link
方案保存在目前瀏覽器，包含 10 個星座的配置與進度。|||This browser saves configurations and progress for all 10 constellations.
各星座方案總覽|||Constellation overview
加成方案|||Bonus plans
官方指南確認先前星座加成會保留並同時套用。此處匯總勾選方案。遊戲面積使用客戶端規則；星位值先向下取整為整數面積再換算，尚未填寫面積的方案不計入數字總和。|||The official guide confirms earlier constellation bonuses remain active together. Checked plans are totaled here. In-game areas use client rules; geometric estimates round area down first. Plans without an area are excluded from the numeric total.
星星解鎖條件|||Starshard unlock requirements
原始門檻表|||Original requirements table
已通過主線關卡（配置序號）|||Main Stage cleared (configuration index)
已通過主線關卡|||Main Stage cleared
累積餅乾升階次數|||Cumulative Cookie promotions
上一星座全部星星啟用後，才可啟用下一星座。第 1 星座的官方說明按餅乾欄位開啟，配置表以關卡門檻記錄；實際自動啟用狀態請以遊戲為準。|||Activate every Starshard in a constellation to unlock the next. The official first-constellation guide refers to Cookie slots; the configuration records stage thresholds. Check actual automatic activation in-game.
重設費用表與規則|||Reset fee table and rules
官方配置機率表|||Official placement probabilities
完整的星位與連線順序配置等機率；各種面積的機率不一定相同。面積和加成由配置計算，不另抽機率。下表為未鎖星時，抽中某一個指定完整配置的機率。|||Complete configurations of positions and link order have equal probability; different areas need not. Area and bonuses derive from the configuration, without a separate roll. The table gives the probability of one specific complete configuration with no locks.
鎖星後，鎖定星星的位置及順序維持不動，其餘合法配置等機率。由此推導：N 顆星、鎖定 L 顆時，剩餘配置數為 P(12−L, N−L)；此公式為組合推導，官方未另列鎖星機率表。|||Locked Starshards keep their order and positions; all remaining legal configurations are equally likely. For N Starshards and L locks, this implies P(12−L, N−L) remaining configurations. This is a combinatorial derivation; no separate official locked-Starshard table is published.
官方指南、資料來源與模型口徑|||Official guide, sources and model
星座配置 JSON|||Constellation configuration JSON
費用 CSV|||Costs CSV
解鎖 CSV|||Unlocks CSV
星際連線資料讀取失敗|||Could not load Stellar Link data
目前位置|||Current position
與第 |||Swap with Starshard 
星交換||| 
空星位|||Empty point
目前選取第 |||Selected Starshard 
星 · P||| · P
已鎖定|||Locked
，空星位|||, empty point
，第 |||, Starshard 
目前有 |||Current crossings: 
處交叉。各封閉區域分別計入面積參考；服務端整數取整仍未知，請填遊戲顯示值。|||. Each enclosed region contributes to the area reference. Server integer rounding is not fully known; use the value shown in-game.
按正十二邊形分母與封閉區域填充的面積參考，不代替遊戲整數值。|||Area reference uses a regular dodecagon denominator and filled enclosed regions. It does not replace the in-game integer.
選取第 |||Select Starshard 
星的位置|||position
第 |||Starshard 
交換第 |||Swap with Starshard 
解除鎖定|||Unlock
鎖定順序與位置|||Lock order and position
鎖定第 |||Lock Starshard 
鎖星|||locked Starshards
每次重設費用|||Cost per reset
預算最多可重設|||Resets within budget
鎖定／可重新配置|||Locked / Movable
計劃總消耗|||Planned total cost
所有星星均已鎖定；本計劃不再重設，先解鎖一顆才能重新配置。|||All Starshards are locked. No resets planned; unlock one to rearrange.
目前計劃超出預算 |||The plan exceeds the budget by 
點數。|||points.
預算可覆蓋計劃次數。按最多可重設次數計，剩餘 |||Budget covers the planned resets. After the maximum affordable resets, remaining points: 
使用遊戲顯示面積：|||In-game area: 
；請填入 0–100 的整數|||; enter an integer from 0–100
星位估算面積：|||Geometric area estimate: 
（向下取整）|||(rounded down)
本星座加成 · 星位估算|||Constellation bonus · Geometric estimate
下一顆星星（|||Next Starshard (
星）：|||):
已規劃全部 12 星。遊戲中須全部啟用，才能開啟下一星座。|||All 12 Starshards planned. Activate them all in-game to open the next constellation.
已規劃第 10 星座全部 12 星。|||All 12 Starshards in constellation 10 planned.
客户端规则|||Client rules
星位估算|||Geometric estimate
納入|||Include
面積來源|||Area source
三類加成|||All three bonuses
遊戲值|||In-game
個方案 · |||plans · 
已填面積小計|||Known-area subtotal
三類加成各|||Each bonus
個待填面積）|||areas missing)
· 含 |||· Includes 
個星位估算|||geometric estimates
請填入有效的非負整數進度。|||Enter valid non-negative integer progress.
按配置進度可啟用：|||Unlocked by configured progress: 
個星座。第 |||constellations. Constellation 
星座：|||: 
顆星星符合門檻|||Starshards meet the requirements
尚未符合啟用門檻或需先完成上一星座|||Requirements unmet, or complete the previous constellation first
星星數|||Starshards
配置門檻|||Configured requirement
按所填進度|||Your progress
未符合|||Not met
符合|||Met
解鎖進度須為非負整數。|||Unlock progress must be a non-negative integer.
3～12 星：10 行與本地有序配置模型逐項一致|||3–12 Starshards: all 10 rows match the local ordered-configuration model
完整配置數|||Complete configurations
單一配置機率|||Chance per configuration
官方約值|||Official rounded value
約 |||Approx. 
2026-10-16 核對：組合數、機率分母及公布精度全部一致。|||Checked 2026-10-16: configuration counts, denominators and published precision all match. 
官方繁中機率公告|||Official Traditional Chinese probability notice
逐項核對 JSON|||Item-by-item comparison JSON
。此公告未提供重設費用、星座倍率或面積取整公式。|||. This notice does not provide reset fees, constellation multipliers or area rounding formulas.
鎖定星星數|||Locked Starshards
每次星際點數|||Stellar Points per reset
連結方案無效，使用預設方案。|||Invalid shared plan. Default plan restored.
此配置最多支持鎖定 6 顆星星。|||You can lock up to 6 Starshards.
目前鎖星的順序無法組成不交叉的外圍連線。解除部分鎖定後再試。|||The locked order cannot form a non-crossing outline. Clear some locks and try again.
已套用保留鎖星的無交叉方案，幾何參考 |||Applied a non-crossing outline retaining locks. Geometric reference: 
。這是幾何上限建議，不是遊戲重設結果。|||. This is a geometric upper-bound suggestion, not an in-game reset result.
全部星座方案與解鎖進度已保存，下次打開會恢復。|||All constellations and unlock progress saved; they will restore next time.
星際連線方案已保存。|||Stellar Link plan saved.
方案連結已複製。|||Plan link copied.
請複製下方顯示的方案連結。|||Copy the plan link shown below.
連結包含本地方案，可在這台電腦上的其他瀏覽器打開。|||The link includes this plan and can be opened in another browser.
，請確認本地服務與星際連線資料。|||. Reload and check that Stellar Link data is available.
星際連線|||Stellar Link
顆星星|||Starshards
星星|||Starshards
星座|||Constellation
星||| 
3～12星10行官方完整配置概率一致；锁星固定顺序和位置，其余合法配置等概率；面积不另抽概率。费用、倍率和整数面积到加成的换算有配置／客户端依据。|||All 10 official complete-configuration probabilities for 3–12 Starshards match. Locks fix order and position; remaining legal configurations are equally likely. Area has no separate roll. Configuration/client evidence supports fees, multipliers and integer-area bonus conversion.
繁中及韩文公告均完整列出3～12星；不是各面积等概率。|||Traditional Chinese and Korean notices cover 3–12 Starshards. Equal probability applies to configurations, not areas.
锁星后P(12−L,N−L)为组合推导，明确标示为推导。|||P(12−L,N−L) after locks is explicitly labeled as a combinatorial derivation.
完整面积算法及数值边界|||Complete area algorithm and numeric boundaries
理想封闭面面积向下取整得到当前样本，但服务端精度、交点合并、近共线等退化情况未完整恢复；官方公告没有面积公式。|||Rounding ideal enclosed area down reproduces the current sample, but server precision, intersection merging and near-collinear/degenerate cases are not fully recovered. The official notice has no area formula.
几何排布的整数面积和加成属于估算；已输入游戏整数面积后的客户端加成换算有依据。|||Integer area and bonuses from geometry are estimates. Client conversion of an entered in-game integer area is supported by evidence.
默认输入游戏面积，几何模式继续标估算。|||Default to in-game area; label geometric mode as an estimate.
第一星座栏位与关卡门槛映射|||First-constellation slot/stage mapping
官方内置指南按已开启饼干栏位数说明，配置表按通关序号记录；完整栏位到关卡的对应逻辑未恢复。|||The built-in official guide refers to unlocked Cookie slots; configuration uses cleared-stage indices. The complete slot-to-stage mapping is not recovered.
解锁进度追踪不能替代账号实际解锁状态。|||Progress tracking cannot replace your account's actual unlock state.
保留配置门槛参考，以实际任务和游戏状态为准。|||Keep configured requirements as reference; check actual quests and game state.
连续重设的独立性|||Independence between resets
官方说明每种完整配置等概率，但没有单独声明不同轮次相互独立。|||Official sources say complete configurations are equally likely, but do not separately state that successive resets are independent.
现有工具没有达到目标面积的多轮概率预测，当前费用和排布规划不依赖这项假设。|||This tool has no multi-reset target-area forecast. Current cost and layout planning do not depend on this assumption.
保持未验证，不新增多轮成功率结论。|||Keep this unverified; do not add multi-reset success claims.
已放置／已启用星数及游戏整数面积由用户输入。|||Enter placed/activated Starshard counts and the in-game integer area yourself.
全部星座均未逐个实测，不等于配置倍率未知；10个倍率和100条门槛已有配置依据。|||Not testing every constellation individually does not make configured multipliers unknown. Configuration supports all 10 multipliers and 100 requirements.
官方星际配置概率表|||Official Stellar Link placement probabilities
查強化機率、比較裝備加成，規劃巧克力鋼與糖漿熔液。|||Check Plating probabilities, compare equipment bonuses, and plan Chocosteel and Metal Syrup.
裝備盤強化|||Plating Enhancement
正在讀取裝備盤資料…|||Loading Plating data…
鐵匠的強化工作檯|||The Sugarsmith's workbench
本地規劃|||Local planner
本次巧克力鋼|||Chocosteel per attempt
目前階級|||Current grade
目標階級|||Target grade
劍裝備盤|||Sword Plating
階級儲存在裝備盤，更換裝備仍保留加成。|||Grades stay on the Plating; bonuses remain when you change equipment.
這一次的強化結果|||Next enhancement outcomes
防止降階|||Prevent Downgrade
減緩碎裂|||Reduce Break Chance
+10 開始可用|||Available from +10
+15 開始可用|||Available from +15
查看既有返還觀察|||View recorded refund observation
材料預估採總投入，不扣返還|||Material estimates show gross investment, before refunds
計入重試、所選保護與修復費。返還材料及整數規則尚未知，這裡不預估返還後的淨消耗；平均投入也不是保證達標的材料上限。|||Includes retries, selected protection and repairs. Refund materials and integer rules remain uncertain, so net costs are not estimated. Average investment is not a guaranteed material cap.
目標加成對比|||Compare target bonuses
顯示主要功能、附加功能的增幅配置；不是角色總屬性的直接增幅。|||Shows configured amplification of Main and Sub Effects, rather than a direct increase to total Cookie stats.
換算裝備功能數值|||Convert equipment effect values
主要功能原始數值|||Base Main Effect value
附加功能原始數值|||Base Sub Effect value
例如 100|||e.g. 100
例如 10|||e.g. 10
按原始數值 ×（1 + 增幅）作換算參考；實際取整以遊戲為準。|||Reference: base value × (1 + amplification). Actual rounding follows the game.
強化到目標 · 平均總投入|||To target · Average gross investment
碎裂時每次修復至強化前階級|||Repair every Break to the previous grade
依所選策略與固定機率逐階計算，包含維持、降階和碎裂造成的重試。各項材料均列未扣返還的平均總投入，適合比較保護與修復方案。|||Calculated grade by grade using the chosen strategy and fixed probabilities, including retries after No Change, Downgrade and Break. Materials show average gross investment before refunds to compare protection and repair strategies.
已核實強化規則|||Verified enhancement rules
大成功 +2、成功 +1、維持不變、降階 −1、碎裂 −2。|||Super +2, Upgrade +1, No Change +0, Downgrade −1, Break −2.
防止降階：將降階機率全部轉入維持。|||Prevent Downgrade: all Downgrade probability moves to No Change.
減緩碎裂：將碎裂機率減半，避免的一半轉入維持。|||Reduce Break Chance: halves Break probability; the avoided half moves to No Change.
兩種保護不增加成功與大成功機率；結果限制在 0～25 階。|||Neither protection increases Upgrade or Super probability. Results are capped at grades 0–25.
按遊戲 1.5.002 已載入客戶端邏輯核實。碎裂後可另付費修復至強化前階級。材料預算仍為概率模型，投入不扣大成功返還。|||Verified against loaded client logic for 1.5.002. After a Break, pay separately to restore the previous grade. Material budgets remain probability models and do not deduct Super refunds.
計劃嘗試次數|||Plan attempt count
達標後停止|||Stop at target
最多嘗試次數|||Maximum attempts
碎裂處理|||Break handling
每次支付修復費用|||Pay for every repair
接受碎裂後的階級|||Accept the post-Break grade
固定策略與獨立抽取的規劃模型。假設材料足夠完成計劃，達到或超過目標即停止；顯示未扣返還的平均總投入，不代表每次都花相同數量，也不是完成計劃所需材料的保證上限。|||Planning model with a fixed strategy and independent draws. Assumes enough materials for the plan and stops at or above the target. Average gross investment excludes refunds; actual spending varies and this is not a guaranteed material cap.
保存裝備盤進度|||Save Plating progress
匯出方案 JSON|||Export plan JSON
裝備盤方案連結|||Plating plan link
各裝備盤的目前階級保存在此瀏覽器。|||Current grades for each Plating stay in this browser.
查看 / 複製方案 JSON|||View / copy plan JSON
裝備盤方案 JSON|||Plating plan JSON
複製 JSON|||Copy JSON
12 種裝備盤進度|||12 Plating progress slots
烤箱等級|||Oven level
點選裝備盤繼續規劃。不同種類使用相同的強化概率、費用和增幅曲線；各自記錄階級。|||Choose a Plating to continue. Every type uses the same probability, cost and amplification curves; grades are recorded separately.
逐階配置表|||Grade-by-grade configuration
費用列按「從該階級嘗試一次」記錄。+25 是目前配置上限。|||Fees are for one attempt from the listed grade. The current configured cap is +25.
官方指南、資料來源與計算依據|||Official guide, sources and calculations
2026-10-16與官方公布表逐項比對：0～24階共125項無保護機率全部一致。官方頁首四捨五入說明適用於機率公布精度，未公開材料返還取整或保護材料資格。|||Checked 2026-10-16: all 125 unprotected probabilities for grades 0–24 match the official table. Its rounding note concerns published probability precision, not material refund rounding or protection-material eligibility.
官方機率說明|||Official probability notes
逐項比對記錄|||Item-by-item comparison
增幅 JSON|||Amplification JSON
機率 CSV|||Probabilities CSV
本工具資料 JSON|||Tool data JSON
瀏覽器無法保存，請使用方案連結或匯出 JSON。|||Browser storage is unavailable. Use a plan link or export JSON.
烤箱 Lv.|||Oven Lv.
已記錄 +|||Recorded +
主要 +|||Main +
附加 +|||Sub +
支付修復費用，回到原階級|||Pay to repair and restore the previous grade
放棄修復，從碎裂後階級繼續|||Skip repair and continue from the post-Break grade
已達配置上限|||Configured cap reached
從 +|||From +
嘗試|||attempt
本次不消耗 · 自 +10 適用|||No cost now · Applies from +10
已達上限|||Cap reached
個／次|||per attempt
本次不消耗 · 自 +15 適用|||No cost now · Applies from +15
裝備盤已達配置上限|||Plating is at the configured cap
可以切換裝備盤，或查看各階級加成。|||Choose another Plating or inspect grade bonuses.
請更新規則資料|||Please update rule data
修復回 +|||Repair to +
配置返還比例|||Configured refund rate
此策略與階級不會出現|||Not possible with this grade and strategy
碎裂後修復另需|||Repair after Break also costs
已核實客戶端規則：避免的降階／碎裂機率轉入「維持」，成功與大成功機率不變。|||Verified client rules: avoided Downgrade/Break probability moves to No Change. Upgrade and Super probabilities stay unchanged.
目前顯示無保護的原始配置機率。|||Showing original unprotected probabilities.
保護規則資料尚未更新，請重新整理。|||Protection rules are unavailable. Reload the page.
主要功能|||Main Effect
附加功能|||Sub Effect
增幅|||Amplification
個百分點|||percentage points
填入裝備功能的原始數值，查看增幅後的換算參考。|||Enter base equipment effect values to preview amplified values.
規劃 +|||Plan +
自 +10 防止降階；|||Prevent Downgrade from +10; 
不使用防止降階；|||No Downgrade prevention; 
自 +15 減半碎裂機率；|||Halve Break chance from +15; 
不使用減緩碎裂；|||No Break reduction; 
每次碎裂付費修復。|||Pay for every Break repair. 
碎裂後降兩階並繼續。|||Drop two grades after Break and continue. 
強化規則已按 1.5.002 客戶端核實。|||Enhancement rules verified against the 1.5.002 client.
平均嘗試|||Expected attempts
巧克力鋼總投入|||Gross Chocosteel
未扣返還|||Before refunds
糖漿熔液總投入|||Gross Metal Syrup
保護 + 修復；未扣返還|||Protection + repairs; before refunds
期望修復|||Expected repairs
目前階級已達到目標。|||Current grade has reached the target.
次內達到 +|||attempts to reach +
平均執行次數|||Average attempts used
達標即停止|||Stop at target
平均巧克力鋼總投入|||Average gross Chocosteel
平均糖漿熔液總投入|||Average gross Metal Syrup
裝備盤，目前 +|||Plating, current +
解鎖|||Unlock
已解鎖|||Unlocked
一次巧克力鋼|||Chocosteel / attempt
主要增幅|||Main AMP
附加增幅|||Sub AMP
保護／修復糖漿|||Protection / repair Syrup
目前|||Current
目標|||Target
機率列為無保護配置；糖漿依序為防止降階／減緩碎裂／碎裂後修復。返還比例為配置值，尚未確定返還材料範圍及整數數量。|||Probabilities are unprotected. Syrup columns: Prevent Downgrade / Reduce Break Chance / post-Break repair. Refund rates are configured values; eligible materials and integer amounts remain uncertain.
既有大成功返還觀察|||Recorded Super refund observation
盔甲裝備盤 +0 → +2 · 無保護|||Armor Plating +0 → +2 · No protection
支付|||Paid
返還|||Refund
淨耗|||Net cost
此為既有單筆記錄，未套用為全階級計算規則。所有材料預估均不扣返還。|||One recorded observation, not a rule applied to every grade. All material estimates exclude refunds.
查看實機結果|||View in-game result
追加解包與覆蓋範圍|||Additional extraction and coverage
25級機率與費用界面核對|||25-grade UI probability and cost check
4次實際交易與返還證據|||4 transactions and refund evidence
+15預覽原圖|||Original +15 preview
保護與修復說明|||Protection and repair help
碎裂降2階資訊|||Break −2 grade information
原生返還邊界|||Native refund boundary analysis
擴大核查|||Expanded analysis
8月舊版返還觀察（非本輪）|||August refund observations (earlier version)
請輸入 |||Enter 
的整數|||as an integer
的數值|||as a number
無法讀取工具資料|||Could not load tool data
已保留舊方案進度與保護策略，並按核實後的遊戲規則重新計算。|||Old plan progress and protection settings retained; recalculated using verified game rules.
裝備盤進度已自動保存。|||Plating progress saved automatically.
已保存 12 種裝備盤進度及強化策略。|||Saved all 12 Plating grades and enhancement strategy.
方案連結已複製；可在這台電腦開啟還原。|||Plan link copied. Open it to restore this plan.
請複製上方方案連結。|||Copy the plan link above.
方案 JSON 已生成；亦可從下方查看或複製。|||Plan JSON generated. View or copy it below.
方案 JSON 已複製。|||Plan JSON copied.
已選取方案 JSON，請複製。|||Plan JSON selected. Copy it manually.
讀取失敗：|||Loading failed: 
裝備盤||| Plating
巧克力鋼|||Chocosteel
糖漿熔液|||Metal Syrup
版本|||Version
`.trim().split('\n').map(line => line.split('|||')));
