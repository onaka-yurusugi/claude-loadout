import { useEffect } from "react";
import { useFormation } from "../hooks/useFormation";
import { FormationHeader } from "../components/FormationHeader";
import { CategorySection } from "../components/CategorySection";
import { ShareBar } from "../components/ShareBar";
import { CATEGORY_ORDER } from "../lib/presets";

export function EditorPage() {
  const { formation, dispatch, saveDraft } = useFormation();

  // Auto-save draft
  useEffect(() => {
    saveDraft(formation);
  }, [formation, saveDraft]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Title */}
      <h1 className="font-[family-name:var(--font-orbitron)] text-2xl font-black tracking-wide text-white mb-6">
        <span className="mr-2">⚔</span>
        Claude Loadout
      </h1>

      {/* Formation Header */}
      <FormationHeader formation={formation} dispatch={dispatch} />

      {/* Category Sections */}
      <div className="mt-6 space-y-4">
        {CATEGORY_ORDER.map((category) => (
          <CategorySection
            key={category}
            category={category}
            slots={formation.slots}
            dispatch={dispatch}
          />
        ))}
      </div>

      {/* Share Bar */}
      <div className="mt-6">
        <ShareBar formation={formation} />
      </div>
    </div>
  );
}
