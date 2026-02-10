import { useMemo } from "react";
import { decodeFormation } from "../lib/encoding";
import { FormationHeader } from "../components/FormationHeader";
import { SlotGrid } from "../components/SlotGrid";

type Props = {
  encoded: string;
};

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

      {/* Slot Grid (readonly) */}
      <div className="mt-6">
        <SlotGrid
          slots={formation.slots}
          onSlotClick={() => {}}
          onEmptyClick={() => {}}
          readonly
        />
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
