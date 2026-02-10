import type { SlotCategory } from "./types";

export const MAX_SLOTS = 10;

export const CATEGORY_CONFIG: Record<
  SlotCategory,
  { icon: string; label: string; color: string }
> = {
  model: { icon: "🤖", label: "Model", color: "#60a5fa" },
  plugin: { icon: "🔌", label: "Plugin", color: "#34d399" },
  skill: { icon: "⚡", label: "Skill", color: "#fbbf24" },
  "claude-md": { icon: "📋", label: "CLAUDE.md", color: "#a78bfa" },
  "mcp-server": { icon: "🌐", label: "MCP Server", color: "#f472b6" },
  hook: { icon: "🪝", label: "Hook", color: "#fb923c" },
  custom: { icon: "✨", label: "Custom", color: "#94a3b8" },
};

export const CATEGORIES = Object.entries(CATEGORY_CONFIG).map(
  ([value, config]) => ({
    value: value as SlotCategory,
    ...config,
  })
);
