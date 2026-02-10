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
    <div className="flex gap-3">
      <button
        type="button"
        onClick={handleCopyUrl}
        disabled={!isValid}
        className="flex items-center gap-2 rounded-lg bg-bg-card border border-border-subtle px-4 py-2.5 text-sm font-semibold text-white hover:bg-bg-card/80 disabled:opacity-40 transition-colors"
      >
        <span>{copied ? "✅" : "📋"}</span>
        {copied ? "コピーしました！" : "URL をコピー"}
      </button>
      <button
        type="button"
        onClick={handleTwitterShare}
        disabled={!isValid}
        className="flex items-center gap-2 rounded-lg bg-black border border-white/20 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 disabled:opacity-40 transition-colors"
      >
        <span>𝕏</span>
        X でシェア
      </button>
    </div>
  );
}
