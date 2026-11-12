import { ImageResponse } from "next/og";
export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

// Keep the existing public image URL without Next's file-based metadata
// inference, which supplies localhost on the generated fallback page.
export function GET() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f4ead7", color: "#2a211f", padding: "70px", fontFamily: "sans-serif", border: "20px solid #d94f3f" }}>
      <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: "#d94f3f" }}>CRUMBLE GUIDE</div>
      <div style={{ display: "flex", flexDirection: "column" }}><div style={{ display: "flex", fontSize: 82, fontWeight: 800, lineHeight: 1.05 }}>Less guessing.<br />More crumbling.</div><div style={{ display: "flex", marginTop: 28, fontSize: 30 }}>Cookies, pets, guides, tier lists, teams, and codes.</div></div>
      <div style={{ display: "flex", fontSize: 24 }}>www.cookieruncrumbles.com</div>
    </div>, size,
  );
}
