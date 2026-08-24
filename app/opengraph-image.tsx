import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Subhransu Priyaranjan Nayak - Software Developer & AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  // Load premium fonts
  const [calSansRegular, interRegular, interSemiBold, jetbrainsMonoRegular] =
    await Promise.all([
      fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/cal-sans@5.0.16/files/cal-sans-latin-400-normal.woff",
      )
        .then((r) => r.arrayBuffer())
        .catch(() => null),
      fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-400-normal.woff",
      )
        .then((r) => r.arrayBuffer())
        .catch(() => null),
      fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-600-normal.woff",
      )
        .then((r) => r.arrayBuffer())
        .catch(() => null),
      fetch(
        "https://cdn.jsdelivr.net/npm/@fontsource/jetbrains-mono@5.0.18/files/jetbrains-mono-latin-400-normal.woff",
      )
        .then((r) => r.arrayBuffer())
        .catch(() => null),
    ]);

  type FontConfig = {
    name: string;
    data: ArrayBuffer;
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
    style: "normal" | "italic";
  };

  const fonts: FontConfig[] = [];
  if (calSansRegular)
    fonts.push({
      name: "Cal Sans",
      data: calSansRegular,
      weight: 400,
      style: "normal",
    });
  if (interRegular)
    fonts.push({
      name: "Inter",
      data: interRegular,
      weight: 400,
      style: "normal",
    });
  if (interSemiBold)
    fonts.push({
      name: "Inter",
      data: interSemiBold,
      weight: 600,
      style: "normal",
    });
  if (jetbrainsMonoRegular)
    fonts.push({
      name: "JetBrains Mono",
      data: jetbrainsMonoRegular,
      weight: 400,
      style: "normal",
    });

  const stats = [
    { value: "Knight", label: "LeetCode" },
    { value: "1,500+", label: "DSA Solved" },
    { value: "1345", label: "Codeforces" },
  ];

  const tags = [
    "Distributed Systems",
    "Backend Development",
    "Generative AI",
    "Competitive Programming",
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#04070f",
        fontFamily: "Inter, system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Subtle dot-grid texture ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(0,255,135,0.06) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          display: "flex",
        }}
      />

      {/* ── Primary ambient glow - emerald, top-left ── */}
      <div
        style={{
          position: "absolute",
          top: -120,
          left: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,135,0.13) 0%, rgba(0,255,135,0.04) 45%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* ── Secondary glow - deep violet, bottom-right ── */}
      <div
        style={{
          position: "absolute",
          bottom: -100,
          right: -60,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,58,237,0.18) 0%, rgba(124,58,237,0.04) 50%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* ── Left accent spine ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 3,
          height: "100%",
          background:
            "linear-gradient(180deg, transparent 0%, #00FF87 30%, rgba(0,255,135,0.35) 70%, transparent 100%)",
          display: "flex",
        }}
      />

      {/* ── Top hairline border ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,255,135,0.35) 20%, rgba(124,58,237,0.25) 80%, transparent 100%)",
          display: "flex",
        }}
      />

      {/* ── Large decorative code glyph - right side ── */}
      <div
        style={{
          position: "absolute",
          right: 72,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 200,
          fontWeight: 400,
          color: "rgba(0,255,135,0.03)",
          letterSpacing: "-0.06em",
          lineHeight: 1,
          display: "flex",
          userSelect: "none",
        }}
      >
        {"</>"}
      </div>

      {/* ── Main content - left column ── */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px 72px",
          flex: 1,
          zIndex: 2,
        }}
      >
        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#00FF87",
              boxShadow: "0 0 8px rgba(0,255,135,0.9)",
              display: "flex",
            }}
          />
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              fontWeight: 400,
              color: "#00FF87",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            IIT Bhubaneswar
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              color: "rgba(0,255,135,0.3)",
            }}
          >
            ·
          </span>
          <span
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 12,
              fontWeight: 400,
              color: "#00FF87",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Open to Work
          </span>
        </div>

        {/* Name - Cal Sans for elegant display serif-like feel */}
        <div
          style={{
            fontFamily: "Cal Sans, Inter, system-ui, sans-serif",
            fontSize: 72,
            fontWeight: 400,
            color: "#f8fafc",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Subhransu</span>
          <span
            style={{
              background:
                "linear-gradient(90deg, #f8fafc 0%, rgba(248,250,252,0.7) 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Priyaranjan Nayak
          </span>
        </div>

        {/* Role with left rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              width: 28,
              height: 2,
              background:
                "linear-gradient(90deg, #00FF87, rgba(0,255,135,0.3))",
              borderRadius: 2,
              display: "flex",
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#00FF87",
              letterSpacing: "-0.01em",
            }}
          >
            Software Developer &amp; AI Engineer
          </span>
        </div>

        {/* Tag pills */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 44,
          }}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 11,
                fontWeight: 400,
                color: "rgba(148,163,184,0.8)",
                border: "1px solid rgba(148,163,184,0.12)",
                borderRadius: 6,
                padding: "5px 12px",
                background: "rgba(148,163,184,0.04)",
                letterSpacing: "0.04em",
                display: "flex",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 14 }}>
          {stats.map(({ value, label }) => (
            <div
              key={label}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 22px",
                borderRadius: 10,
                border: "1px solid rgba(0,255,135,0.14)",
                background:
                  "linear-gradient(135deg, rgba(0,255,135,0.06) 0%, rgba(0,255,135,0.02) 100%)",
                gap: 5,
              }}
            >
              <span
                style={{
                  fontFamily: "Cal Sans, Inter, system-ui, sans-serif",
                  fontSize: 26,
                  fontWeight: 400,
                  color: "#f8fafc",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  fontWeight: 400,
                  color: "rgba(100,116,139,0.9)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom URL ── */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 72,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 12,
          fontWeight: 400,
          color: "rgba(0,255,135,0.22)",
          letterSpacing: "0.1em",
          display: "flex",
        }}
      >
        subhransu.dev
      </div>

      {/* ── Bottom-left bracket ── */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 72,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          fontWeight: 400,
          color: "rgba(0,255,135,0.1)",
          letterSpacing: "0.06em",
          display: "flex",
        }}
      >
        {"{ software · ai · systems }"}
      </div>
    </div>,
    {
      ...size,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
}
