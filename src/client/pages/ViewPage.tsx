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
    <div className="rounded-lg border border-border-subtle bg-bg-card/30 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{cat.icon}</span>
        <span className="text-sm font-bold text-white">{cat.label}</span>
        <span className="text-xs text-text-secondary">
          {filtered.length} 件
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
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-4xl">😵</p>
          <p className="mt-4 text-lg text-text-secondary">
            編成データを読み込めませんでした
          </p>
          <a
            href="/"
            className="mt-4 inline-block text-accent hover:underline"
          >
            新しい編成を作成する →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Title */}
      <h1 className="font-[family-name:var(--font-orbitron)] text-2xl font-black tracking-wide text-white mb-6">
        <span className="mr-2">⚔</span>
        Claude Loadout
      </h1>

      {/* Formation Header (readonly) */}
      <FormationHeader
        formation={formation}
        dispatch={() => {}}
        readonly
      />

      {/* Category Sections */}
      <div className="mt-6 space-y-4">
        {CATEGORY_ORDER.map((category) => (
          <ViewCategorySection
            key={category}
            category={category}
            slots={formation.slots}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="mt-6 flex gap-3">
        <a
          href="/"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent/80 transition-colors"
        >
          ⚔ 自分の編成を作成する
        </a>
        <button
          type="button"
          onClick={() => {
            const url = window.location.href;
            navigator.clipboard.writeText(url);
          }}
          className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-card px-4 py-2.5 text-sm font-semibold text-white hover:bg-bg-card/80 transition-colors"
        >
          📋 URL をコピー
        </button>
      </div>
    </div>
  );
}
