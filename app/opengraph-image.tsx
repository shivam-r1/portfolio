import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/data";
import { getSiteUrl } from "@/lib/site";

export const alt = `${siteConfig.name} · ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time. Mirrors the dark theme. */
export default function OpenGraphImage() {
  const host = new URL(getSiteUrl()).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#34d399",
              color: "#022c22",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>{host}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#34d399", fontWeight: 600 }}>
            {siteConfig.title}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a1a1aa" }}>{siteConfig.tagline}</div>
        </div>

        <div style={{ display: "flex", height: 6, width: 160, borderRadius: 999, background: "#34d399" }} />
      </div>
    ),
    { ...size }
  );
}
