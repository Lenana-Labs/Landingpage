import { ImageResponse } from "next/og";

export const alt = "Lenana Labs — Built for the real world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#fafafa", color: "#0d0d0d" }}>
      <div style={{ display: "flex", fontSize: 30 }}>Lenana Labs<span style={{ color: "#c8102e" }}>.</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 102, lineHeight: 1, letterSpacing: -6 }}><span>Built for</span><span>the real world.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>Digital products. Data. Infrastructure.</span><span>Nairobi, Kenya</span></div>
    </div>, size,
  );
}
