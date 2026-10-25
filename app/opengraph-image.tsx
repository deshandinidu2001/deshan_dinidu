import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
export const alt = "Deshan Dinidu, Computer Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background: "#0B0D10",
        color: "#EDEAE2",
        padding: "65px",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: 3,
        }}
      >
        <span>COMPUTER ENGINEER</span>
        <span>DESHAN DINIDU</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 132,
          fontWeight: 700,
          letterSpacing: -8,
          lineHeight: 1,
        }}
      >
        <span>DESHAN</span>
        <span style={{ color: "#C8FF3D" }}>DINIDU.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          borderTop: "1px solid #30373D",
          paddingTop: 25,
          justifyContent: "space-between",
        }}
      >
        <span>{profile.tagline}</span>
        <span>deshandinidu2001</span>
      </div>
    </div>,
    size,
  );
}
