import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 16, color: "#fff8eb", background: "#d94f3f", fontFamily: "sans-serif", fontSize: 38, fontWeight: 900 }}>C</div>,
    size,
  );
}
