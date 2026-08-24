import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Subhransu Priyaranjan Nayak : Software Developer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #09090b 0%, #0f172a 50%, #09090b 100%)",
          padding: "72px 80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10b981",
            }}
          />
          <span
            style={{
              fontSize: "14px",
              fontWeight: 600,
              color: "#10b981",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            IIT Bhubaneswar · Open to Work
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 900,
            color: "#f4f4f5",
            lineHeight: 1.05,
            marginBottom: "16px",
            letterSpacing: "-0.02em",
          }}
        >
          Subhransu Nayak
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "28px",
            fontWeight: 600,
            color: "#10b981",
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          Software Engineer & AI Developer
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "18px",
            color: "#71717a",
            marginBottom: "48px",
            maxWidth: "680px",
            lineHeight: 1.5,
          }}
        >
          Backend · Distributed Systems · GenAI · LeetCode Top 4% · IIT Bhubaneswar
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: "32px" }}>
          {[
            { label: "LeetCode Peak", value: "1934" },
            { label: "DSA Problems", value: "1,500+" },
            { label: "Scale", value: "600K+ Users" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "12px 20px",
                borderRadius: "12px",
                border: "1px solid rgba(16,185,129,0.2)",
                background: "rgba(16,185,129,0.06)",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#f4f4f5",
                  lineHeight: 1,
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginTop: "4px",
                  fontWeight: 500,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "14px",
            color: "#3f3f46",
            fontWeight: 500,
          }}
        >
          subhransu.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
