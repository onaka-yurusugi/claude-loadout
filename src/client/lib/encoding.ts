import LZString from "lz-string";
import type { Formation } from "./types";

export function encodeFormation(formation: Formation): string {
  const json = JSON.stringify(formation);
  return LZString.compressToEncodedURIComponent(json);
}

export function decodeFormation(encoded: string): Formation | null {
  try {
    const json = LZString.decompressFromEncodedURIComponent(encoded);
    if (!json) return null;
    const parsed = JSON.parse(json) as Formation;
    if (!parsed.v || !parsed.slots || !Array.isArray(parsed.slots)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function buildShareUrl(formation: Formation): string {
  const encoded = encodeFormation(formation);
  return `${window.location.origin}/s/${encoded}`;
}

export function buildTwitterShareUrl(
  formation: Formation,
  shareUrl: string
): string {
  const text = `⚔ ${formation.title}\n🎯 ${formation.scenario}\n${formation.slots.map((s) => `・${s.name}`).join("\n")}\n\n#ClaudeLoadout`;
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
}
