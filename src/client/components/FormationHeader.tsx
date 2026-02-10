import type { Formation, FormationAction } from "../lib/types";

type Props = {
  formation: Formation;
  dispatch: (action: FormationAction) => void;
  readonly?: boolean;
};

export function FormationHeader({ formation, dispatch, readonly }: Props) {
  if (readonly) {
    return (
      <div className="rounded-lg border border-border-subtle bg-bg-card p-5">
        <h2
          className="font-[family-name:var(--font-orbitron)] text-xl font-bold text-white"
        >
          {formation.title || "無題の編成"}
        </h2>
        {formation.scenario && (
          <p className="mt-2 text-sm text-text-secondary">
            🎯 {formation.scenario}
          </p>
        )}
        {formation.author && (
          <p className="mt-1 text-sm text-text-secondary">
            👤 {formation.author}
          </p>
        )}
        {formation.description && (
          <p className="mt-2 text-sm text-text-secondary">
            {formation.description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border-subtle bg-bg-card p-5 space-y-3">
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
          📝 編成名
        </label>
        <input
          type="text"
          value={formation.title}
          onChange={(e) =>
            dispatch({ type: "SET_TITLE", payload: e.target.value })
          }
          placeholder="例: Next.js 小規模サービスの最適解"
          className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            🎯 シナリオ
          </label>
          <input
            type="text"
            value={formation.scenario}
            onChange={(e) =>
              dispatch({ type: "SET_SCENARIO", payload: e.target.value })
            }
            placeholder="例: 個人開発 / Web"
            className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            👤 著者
          </label>
          <input
            type="text"
            value={formation.author}
            onChange={(e) =>
              dispatch({ type: "SET_AUTHOR", payload: e.target.value })
            }
            placeholder="例: @tomo"
            className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
          📄 説明（任意）
        </label>
        <textarea
          value={formation.description}
          onChange={(e) =>
            dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
          }
          placeholder="この編成の説明..."
          rows={2}
          className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none resize-none"
        />
      </div>
    </div>
  );
}
