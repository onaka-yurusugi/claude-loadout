import LZString from "lz-string";
import type { Formation } from "../client/lib/types";

const CATEGORY_ICONS: Record<string, string> = {
  model: "🤖",
  plugin: "🔌",
  skill: "⚡",
  "claude-md": "📋",
  "mcp-server": "🌐",
  hook: "🪝",
  custom: "✨",
};

const CATEGORY_COLORS: Record<string, string> = {
  model: "#60a5fa",
  plugin: "#34d399",
  skill: "#fbbf24",
  "claude-md": "#a78bfa",
  "mcp-server": "#f472b6",
  hook: "#fb923c",
  custom: "#94a3b8",
};

function decodeFormation(encoded: string): Formation | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    return JSON.parse(json) as Formation;
  } catch {
    return null;
  }
}

export async function generateOgImage(encoded: string): Promise<ArrayBuffer> {
  const formation = decodeFormation(encoded);

  const title = formation?.title || "Claude Loadout";
  const scenario = formation?.scenario || "";
  const slots = formation?.slots || [];

  const slotBoxes = slots
    .slice(0, 10)
    .map((slot, i) => {
      const x = (i % 5) * 220 + 40;
      const y = Math.floor(i / 5) * 150 + 260;
      const icon = CATEGORY_ICONS[slot.category] || "✨";
      const color = CATEGORY_COLORS[slot.category] || "#94a3b8";
      const name =
        slot.name.length > 8 ? slot.name.slice(0, 8) + "…" : slot.name;

      return `
        <rect x="${x}" y="${y}" width="200" height="130" rx="10" fill="#1a1f35" stroke="${color}" stroke-width="2"/>
        <text x="${x + 100}" y="${y + 50}" text-anchor="middle" font-size="32">${icon}</text>
        <text x="${x + 100}" y="${y + 85}" text-anchor="middle" font-size="16" fill="white" font-family="sans-serif">${escapeXml(name)}</text>
      `;
    })
    .join("");

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0e1a"/>
          <stop offset="100%" style="stop-color:#111827"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#bg)"/>
      <text x="40" y="60" font-size="24" fill="#6366f1" font-family="sans-serif" font-weight="bold">⚔ Claude Loadout</text>
      <text x="40" y="120" font-size="36" fill="white" font-family="sans-serif" font-weight="bold">${escapeXml(title.length > 30 ? title.slice(0, 30) + "…" : title)}</text>
      ${scenario ? `<text x="40" y="170" font-size="20" fill="#94a3b8" font-family="sans-serif">🎯 ${escapeXml(scenario)}</text>` : ""}
      <text x="40" y="210" font-size="16" fill="#94a3b8" font-family="sans-serif">${slots.length} slots</text>
      ${slotBoxes}
    </svg>
  `;

  const encoder = new TextEncoder();
  return encoder.encode(svg).buffer as ArrayBuffer;
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
