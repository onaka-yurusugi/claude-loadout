import type { Formation, FormationAction } from "../lib/types";

type Props = {
  formation: Formation;
  dispatch: (action: FormationAction) => void;
  readonly?: boolean;
};

export function FormationHeader({ formation, dispatch, readonly }: Props) {
  if (readonly) {
    return (
      <div className="tac-card p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-widest text-accent uppercase">
            Mission Briefing
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent" />
        </div>
        <h2 className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white mt-3">
          {formation.title || "無題の編成"}
        </h2>
        {formation.scenario && (
          <p className="mt-3 text-sm text-text-secondary flex items-center gap-2">
            <span className="text-accent-cyan">🎯</span>
            {formation.scenario}
          </p>
        )}
        {formation.author && (
          <p className="mt-1 text-sm text-text-secondary flex items-center gap-2">
            <span className="text-accent">👤</span>
            {formation.author}
          </p>
        )}
        {formation.description && (
          <p className="mt-3 text-sm text-text-secondary/70 leading-relaxed border-t border-border-subtle pt-3">
            {formation.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="tac-card p-6 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-[family-name:var(--font-orbitron)] text-[10px] tracking-widest text-accent uppercase">
          Mission Briefing
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-border-subtle to-transparent" />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
          編成名
        </label>
        <input
          type="text"
          value={formation.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
          placeholder="例: Next.js 小規模サービスの最適解"
          className="input-tactical"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
            シナリオ
          </label>
          <input
            type="text"
            value={formation.scenario}
            onChange={(e) =>
              dispatch({ type: "SET_SCENARIO", payload: e.target.value })
            }
            placeholder="例: 個人開発 / Web"
            className="input-tactical"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
            著者
          </label>
          <input
            type="text"
            value={formation.author}
            onChange={(e) =>
              dispatch({ type: "SET_AUTHOR", payload: e.target.value })
            }
            placeholder="例: @tomo"
            className="input-tactical"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
          説明（任意）
        </label>
        <textarea
          value={formation.description}
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
          placeholder="この編成の説明..."
          rows={2}
          className="input-tactical resize-none"
        />
      </div>
    </div>
  );
}
