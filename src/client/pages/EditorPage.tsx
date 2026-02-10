import { useEffect } from "react";
import { useFormation } from "../hooks/useFormation";
import { FormationHeader } from "../components/FormationHeader";
import { CategorySection } from "../components/CategorySection";
import { ShareBar } from "../components/ShareBar";
import { CATEGORY_CONFIG } from "../lib/constants";
import type { SlotCategory } from "../lib/types";

const MAIN_CATEGORIES = ["model", "mcp-server", "plugin", "skill"] as const;
const AUX_CATEGORIES = ["claude-md", "hook", "custom"] as const;

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  x: `${(i * 8.3 + 3) % 100}%`,
  delay: `${i * 1.2}s`,
  duration: `${12 + (i % 5) * 3}s`,
}));

function countByCategory(
  slots: { category: SlotCategory }[]
): Partial<Record<SlotCategory, number>> {
  const counts: Partial<Record<SlotCategory, number>> = {};
  for (const slot of slots) {
    counts[slot.category] = (counts[slot.category] ?? 0) + 1;
  }
  return counts;
}

export function EditorPage() {
  const { formation, dispatch, saveDraft } = useFormation();

  useEffect(() => {
    saveDraft(formation);
  }, [formation, saveDraft]);

  const totalSlots = formation.slots.length;
  const categoryCounts = countByCategory(formation.slots);
  const activeCategories = Object.keys(categoryCounts).length;

  return (
    <div className="bg-tactical min-h-screen">
      {/* Floating particles */}
      <div className="particle-field">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle"
            style={{
              ["--x" as string]: p.x,
              ["--delay" as string]: p.delay,
              ["--duration" as string]: p.duration,
            }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">

        {/* ═══ HEADER BAR ═══ */}
        <div className="flex items-center justify-between mb-6 stagger-in">
          <div className="flex items-center gap-4">
            <div className="orb" />
            <div className="relative">
              <h1 className="gradient-text font-[family-name:var(--font-orbitron)] text-2xl md:text-3xl font-black tracking-wider">
                CLAUDE LOADOUT
              </h1>
              <div className="data-line mt-1" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="pulse-dot bg-accent-cyan" />
            <span className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-widest text-text-secondary uppercase">
              {totalSlots} equipped
            </span>
          </div>
        </div>

        {/* ═══ STATUS BAR ═══ */}
        <div className="status-bar mb-6 stagger-in">
          <div className="status-bar-item">
            <span>SLOTS</span>
            <span className="status-bar-value">{totalSlots}</span>
          </div>
          <div className="w-px h-3 bg-border-subtle" />
          <div className="status-bar-item">
            <span>CATEGORIES</span>
            <span className="status-bar-value">{activeCategories}</span>
          </div>
          <div className="w-px h-3 bg-border-subtle" />
          <div className="flex items-center gap-2">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const config = CATEGORY_CONFIG[cat as SlotCategory];
              return (
                <span
                  key={cat}
                  className="flex items-center gap-1 text-[10px]"
                  style={{ color: config.color }}
                  title={config.label}
                >
                  <span>{config.icon}</span>
                  <span className="font-[family-name:var(--font-orbitron)]">{count}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* ═══ FORMATION HEADER ═══ */}
        <div className="stagger-in">
          <FormationHeader formation={formation} dispatch={dispatch} />
        </div>

        {/* ═══ SEPARATOR ═══ */}
        <div className="hex-separator my-8">LOADOUT CONFIG</div>

        {/* ═══ MAIN GRID: 2-col on desktop ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {MAIN_CATEGORIES.map((category) => (
            <CategorySection
              key={category}
              category={category}
              slots={formation.slots}
              dispatch={dispatch}
            />
          ))}
        </div>

        {/* ═══ AUX SEPARATOR ═══ */}
        <div className="hex-separator my-8">AUXILIARY</div>

        {/* ═══ AUX GRID: 3-col on desktop ═══ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {AUX_CATEGORIES.map((category) => (
            <CategorySection
              key={category}
              category={category}
              slots={formation.slots}
              dispatch={dispatch}
            />
          ))}
        </div>

        {/* ═══ SHARE BAR ═══ */}
        <div className="mt-10">
          <ShareBar formation={formation} />
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="footer-line mt-8">CLAUDE LOADOUT v0.1.0</div>
      </div>
    </div>
  );
}
