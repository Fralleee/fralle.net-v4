import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";
import pngToIco from "png-to-ico";

const root = process.cwd();
const sourcePath = join(root, "src/assets/icon.svg");
const publicDir = join(root, "public");
const fontFile = join(
  root,
  "node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
);
const ICON_BG = "#121821";

const baseSvg = await readFile(sourcePath, "utf8");

// Maskable variant: inset the original 256×256 mark into ~80% of a padded
// 320×320 canvas so Android can crop a circle without clipping the mark.
const maskableSvg = baseSvg
  .replace(/viewBox="[^"]+"/, 'viewBox="-32 -32 320 320"')
  .replace(
    '<rect width="256" height="256"',
    `<rect x="-32" y="-32" width="320" height="320" fill="${ICON_BG}"/><rect width="256" height="256"`,
  );

function renderPng(svg: string, size: number) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    font: {
      fontFiles: [fontFile],
      defaultFontFamily: "JetBrains Mono",
    },
  });
  return resvg.render().asPng();
}

async function writePng(svg: string, size: number, fileName: string) {
  await writeFile(join(publicDir, fileName), renderPng(svg, size));
  console.log(`  ✓ ${fileName} (${size}×${size})`);
}

async function writeIco(svg: string, sizes: number[], fileName: string) {
  const pngs = sizes.map((size) => renderPng(svg, size));
  const ico = await pngToIco(pngs);
  await writeFile(join(publicDir, fileName), ico);
  console.log(`  ✓ ${fileName} (${sizes.join(", ")})`);
}

console.log("Generating icon set from src/assets/icon.svg...");
await Promise.all([
  writeFile(join(publicDir, "icon.svg"), baseSvg),
  writePng(baseSvg, 180, "apple-touch-icon.png"),
  writePng(baseSvg, 192, "android-chrome-192x192.png"),
  writePng(baseSvg, 512, "android-chrome-512x512.png"),
  writePng(maskableSvg, 192, "android-chrome-maskable-192x192.png"),
  writePng(maskableSvg, 512, "android-chrome-maskable-512x512.png"),
  writeIco(baseSvg, [16, 32, 48], "favicon.ico"),
]);
console.log("  ✓ icon.svg (copied from src/assets/)");
console.log("Done.");
