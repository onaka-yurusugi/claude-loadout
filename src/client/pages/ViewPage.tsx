import { useMemo } from "react";
import { decodeFormation } from "../lib/encoding";
import { FormationHeader } from "../components/FormationHeader";
import { SelectedItems } from "../components/SelectedItems";
import { CATEGORY_CONFIG } from "../lib/constants";
import { CATEGORY_ORDER } from "../lib/presets";
import type { Slot, SlotCategory } from "../lib/types";

type Props = {
  encoded: string;
};

const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  x: `${(i * 12.5 + 5) % 100}%`,
  delay: `${i * 1.5}s`,
  duration: `${14 + (i % 4) * 3}s`,
}));

function ViewCategorySection({
  category,
  slots,
}: {
  category: SlotCategory;
  slots: Slot[];
}) {
  const filtered = slots.filter((s) => s.category === category);
  if (filtered.length === 0) return null;

  const cat = CATEGORY_CONFIG[category];

  return (
    <div
      className="view-cat-card rounded-sm p-4"
      style={{ ["--_accent-color" as string]: cat.color }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="cat-badge"
          style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </div>
        <span
          className="status-counter"
          style={{
            backgroundColor: `${cat.color}20`,
            color: cat.color,
          }}
        >
          {filtered.length}
        </span>
      </div>
      <SelectedItems slots={filtered} onRemove={() => {}} readonly />
    </div>
  );
}

export function ViewPage({ encoded }: Props) {
  const formation = useMemo(() => decodeFormation(encoded), [encoded]);

  if (!formation) {
    return (
      <div className="bg-tactical min-h-screen flex items-center justify-center">
        <div className="text-center hud-frame p-12">
          <p className="text-5xl mb-4">😵</p>
          <p className="text-lg text-text-secondary mb-2">
            編成データを読み込めませんでした
          </p>
          <p className="text-sm text-text-secondary/50 mb-6">
            URL が無効か、データが破損しています
          </p>
          <a
            href="/"
            className="btn-deploy inline-flex"
          >
            <span>⚔</span>
            <span>新しい編成を作成する</span>
          </a>
        </div>
      </div>
    );
  }

  const totalSlots = formation.slots.length;
  const categoryBreakdown = CATEGORY_ORDER
    .map((cat) => ({
      category: cat,
      count: formation.slots.filter((s) => s.category === cat).length,
      config: CATEGORY_CONFIG[cat],
    }))
    .filter((b) => b.count > 0);

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

      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* ═══ HEADER ═══ */}
        <div className="flex items-center gap-4 mb-6 stagger-in">
          <div className="orb" />
          <div>
            <h1 className="gradient-text font-[family-name:var(--font-orbitron)] text-xl md:text-2xl font-black tracking-wide">
              CLAUDE LOADOUT
            </h1>
            <div className="data-line mt-1" />
          </div>
        </div>

        {/* ═══ FORMATION HEADER (readonly) ═══ */}
        <div className="stagger-in">
          <FormationHeader
            formation={formation}
            dispatch={() => {}}
            readonly
          />
        </div>

        {/* ═══ STATS BAR ═══ */}
        <div className="status-bar my-6 stagger-in">
          <div className="status-bar-item">
            <span>TOTAL</span>
            <span className="status-bar-value">{totalSlots}</span>
          </div>
          <div className="w-px h-3 bg-border-subtle" />
          {categoryBreakdown.map(({ category, count, config }) => (
            <span
              key={category}
              className="flex items-center gap-1 text-[10px]"
              style={{ color: config.color }}
              title={config.label}
            >
              <span>{config.icon}</span>
              <span className="font-[family-name:var(--font-orbitron)]">{count}</span>
            </span>
          ))}
        </div>

        {/* ═══ CATEGORY SECTIONS ═══ */}
        <div className="space-y-4 stagger-in">
          {CATEGORY_ORDER.map((category) => (
            <ViewCategorySection
              key={category}
              category={category}
              slots={formation.slots}
            />
          ))}
        </div>

        {/* ═══ ACTIONS ═══ */}
        <div className="flex flex-wrap gap-3 mt-8 stagger-in">
          <a href="/" className="btn-deploy">
            <span>⚔</span>
            <span>自分の編成を作成する</span>
          </a>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="btn-tactical"
          >
            <span>◈</span>
            <span>URL をコピー</span>
          </button>
        </div>

        {/* ═══ FOOTER ═══ */}
        <div className="footer-line mt-10">CLAUDE LOADOUT v0.1.0</div>
      </div>
    </div>
  );
}
