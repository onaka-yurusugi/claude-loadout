import { useState } from "react";
import type { Formation } from "../lib/types";
import { buildShareUrl, buildTwitterShareUrl } from "../lib/encoding";

type Props = {
  formation: Formation;
};

export function ShareBar({ formation }: Props) {
  const [copied, setCopied] = useState(false);

  const isValid = formation.title.trim() && formation.slots.length > 0;

  const handleCopyUrl = async () => {
    if (!isValid) return;
    const url = buildShareUrl(formation);
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    if (!isValid) return;
    const url = buildShareUrl(formation);
    const twitterUrl = buildTwitterShareUrl(formation, url);
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="hud-frame p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="hex-separator flex-1">DEPLOY</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={handleCopyUrl}
          disabled={!isValid}
          className="btn-deploy"
        >
          <span>{copied ? "✓" : "◈"}</span>
          {copied ? "COPIED" : "COPY URL"}
        </button>
        <button
          type="button"
          onClick={handleTwitterShare}
          disabled={!isValid}
          className="btn-tactical"
        >
          <span>𝕏</span>
          SHARE
        </button>
      </div>
      {!isValid && (
        <p className="text-center text-xs text-text-secondary/50 mt-3 font-[family-name:var(--font-orbitron)] tracking-wider uppercase">
          編成名とスロット1個以上が必要です
        </p>
      )}
    </div>
  );
}
