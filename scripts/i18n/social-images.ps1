# Optional offline authoring task on Windows. Generated PNGs are checked in;
# normal builds do not need Windows fonts or any network font service.
Add-Type -AssemblyName System.Drawing
$socialFolder = Join-Path $PSScriptRoot '../../public/images/social'
[System.IO.Directory]::CreateDirectory($socialFolder) | Out-Null
$cards = @(
  @{ locale='zh-Hant'; font='Microsoft JhengHei'; title='薑餅人放置大戰爭'; subtitle='角色強度・配隊攻略・兌換序號'; label='玩家攻略' },
  @{ locale='ja'; font='Yu Gothic'; title='クッキーラン：クランブル'; subtitle='最強キャラ・編成・クーポンコード'; label='攻略ガイド' },
  @{ locale='ko'; font='Malgun Gothic'; title='쿠키런 키우기 / 쿠키런 크럼블'; subtitle='등급표 · 덱 조합 · 쿠폰 코드'; label='공략 가이드' },
  @{ locale='th'; font='Leelawadee UI'; title='CookieRun: Crumble'; subtitle='จัดทีม · อันดับคุกกี้ · โค้ดแลกรางวัล'; label='คู่มือผู้เล่น' }
)
foreach ($card in $cards) {
  $bitmap = [System.Drawing.Bitmap]::new(1200,630)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = 'AntiAlias'
  $graphics.TextRenderingHint = 'AntiAliasGridFit'
  $paper = [System.Drawing.ColorTranslator]::FromHtml('#f4ead7')
  $ink = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#2a211f'))
  $red = [System.Drawing.SolidBrush]::new([System.Drawing.ColorTranslator]::FromHtml('#d94f3f'))
  $gradient = [System.Drawing.Drawing2D.LinearGradientBrush]::new([System.Drawing.Point]::new(0,0),[System.Drawing.Point]::new(1200,630),$paper,[System.Drawing.ColorTranslator]::FromHtml('#e8d7b9'))
  $graphics.FillRectangle($gradient,0,0,1200,630)
  $texture = [System.Drawing.SolidBrush]::new([System.Drawing.Color]::FromArgb(28,111,81,52))
  for ($x=15; $x -lt 1200; $x+=17) { for ($y=13; $y -lt 630; $y+=19) { $graphics.FillEllipse($texture,$x,$y,1,1) } }
  $graphics.FillRectangle($red,0,0,20,630)
  $small = [System.Drawing.Font]::new($card.font,23,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $title = [System.Drawing.Font]::new($card.font,56,[System.Drawing.FontStyle]::Bold,[System.Drawing.GraphicsUnit]::Pixel)
  $subtitle = [System.Drawing.Font]::new($card.font,31,[System.Drawing.FontStyle]::Regular,[System.Drawing.GraphicsUnit]::Pixel)
  $graphics.DrawString($card.label,$small,$red,75,75)
  $graphics.DrawString($card.title,$title,$ink,[System.Drawing.RectangleF]::new(70,205,1070,175))
  $graphics.DrawString($card.subtitle,$subtitle,$ink,75,410)
  $graphics.DrawString('www.cookieruncrumbles.com',$small,$ink,75,545)
  $bitmap.Save((Join-Path $socialFolder ($card.locale+'.png')),[System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose(); $bitmap.Dispose(); $small.Dispose(); $title.Dispose(); $subtitle.Dispose(); $ink.Dispose(); $red.Dispose(); $gradient.Dispose(); $texture.Dispose()
}
