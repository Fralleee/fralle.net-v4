import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "@vercel/og";

const root = process.cwd();
const fontPath = (weight: number) =>
  join(root, `node_modules/@fontsource/inter/files/inter-latin-${weight}-normal.woff`);

const [regular, bold] = await Promise.all([readFile(fontPath(400)), readFile(fontPath(700))]);

const response = new ImageResponse(
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      height: "100%",
      padding: "80px",
      background: "#f5f1ea",
      color: "#121821",
      fontFamily: "Inter",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        fontSize: 26,
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        color: "rgba(18, 24, 33, 0.7)",
      }}
    >
      <div style={{ width: 32, height: 1.5, background: "rgba(18, 24, 33, 0.4)" }} />
      Fullstack Software Engineer
    </div>

    <div
      style={{
        display: "flex",
        fontSize: 168,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1,
        marginTop: 28,
      }}
    >
      Roland
    </div>
    <div
      style={{
        display: "flex",
        fontSize: 168,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        lineHeight: 1,
      }}
    >
      <span
        style={{
          padding: "0 14px",
          background: "#ffe680",
          transform: "rotate(-0.6deg)",
        }}
      >
        Chelwing
      </span>
      <span>.</span>
    </div>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "auto",
        fontSize: 28,
        fontWeight: 600,
        color: "rgba(18, 24, 33, 0.7)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 56,
            height: 56,
            borderRadius: 12,
            background: "#121821",
            color: "#f5f1ea",
            fontSize: 36,
            fontWeight: 700,
          }}
        >
          f
        </div>
        <div style={{ display: "flex" }}>fralle.net</div>
      </div>
      <div style={{ display: "flex" }}>Sweden · Remote</div>
    </div>
  </div>,
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Inter", data: regular, weight: 400, style: "normal" },
      { name: "Inter", data: bold, weight: 700, style: "normal" },
    ],
  },
);

const buffer = Buffer.from(await response.arrayBuffer());
await writeFile(join(root, "public/og.png"), buffer);
console.log("  ✓ og.png (1200×630)");
