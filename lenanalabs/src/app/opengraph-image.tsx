import { ImageResponse } from "next/og";

export const alt = "LenanaLabs — Technology for the real world";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#F3EEE3", color: "#17150F" }}>
      <div style={{ display: "flex", fontSize: 30 }}>LenanaLabs<span style={{ color: "#C13A17" }}>.</span></div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 102, lineHeight: 1, letterSpacing: -6 }}><span>Built for</span><span>the real world.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24 }}><span>Engineering. Products. Experiments.</span><span>Nairobi, Kenya</span></div>
    </div>, size,
  );
}
