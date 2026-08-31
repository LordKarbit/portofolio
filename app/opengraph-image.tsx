import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "74px 82px",
        color: "#172338",
        background: "#f3f4f7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: "790px" }}>
        <div style={{ color: "#f9004d", fontSize: 22, fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>Operations systems · Process improvement</div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 40, fontSize: 78, fontWeight: 800, lineHeight: 1.02, letterSpacing: "-4px" }}>
          <span>Proses operasi</span>
          <span style={{ color: "#f9004d" }}>menjadi sistem kerja.</span>
        </div>
        <div style={{ marginTop: 38, color: "#667085", fontSize: 26 }}>Samsul Arifin | Operations Systems & Automation Specialist</div>
      </div>
      <div style={{ width: 210, height: 210, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 54, color: "white", background: "#172338", fontSize: 70, fontWeight: 800 }}>SA</div>
    </div>,
    size,
  );
}
