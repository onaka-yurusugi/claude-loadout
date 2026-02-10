import { useState, useEffect } from "react";
import type { Slot } from "../lib/types";
import { useFormation } from "../hooks/useFormation";
import { FormationHeader } from "../components/FormationHeader";
import { SlotGrid } from "../components/SlotGrid";
import { SlotModal } from "../components/SlotModal";
import { ShareBar } from "../components/ShareBar";

export function EditorPage() {
  const { formation, dispatch, saveDraft } = useFormation();
  const [modalSlot, setModalSlot] = useState<Slot | null | "new">(null);

  // Auto-save draft
  useEffect(() => {
    saveDraft(formation);
  }, [formation, saveDraft]);

  const handleSlotClick = (slot: Slot) => {
    setModalSlot(slot);
  };

  const handleEmptyClick = () => {
    setModalSlot("new");
  };

  const handleSave = (slot: Slot) => {
    if (modalSlot === "new") {
      dispatch({ type: "ADD_SLOT", payload: slot });
    } else {
      dispatch({ type: "UPDATE_SLOT", payload: slot });
    }
    setModalSlot(null);
  };

  const handleDelete = () => {
    if (modalSlot && modalSlot !== "new") {
      dispatch({ type: "REMOVE_SLOT", payload: modalSlot.id });
    }
    setModalSlot(null);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Title */}
      <h1 className="font-[family-name:var(--font-orbitron)] text-2xl font-black tracking-wide text-white mb-6">
        <span className="mr-2">⚔</span>
        Claude Loadout
      </h1>

      {/* Formation Header */}
      <FormationHeader formation={formation} dispatch={dispatch} />

      {/* Slot Grid */}
      <div className="mt-6">
        <SlotGrid
          slots={formation.slots}
          onSlotClick={handleSlotClick}
          onEmptyClick={handleEmptyClick}
        />
      </div>

      {/* Share Bar */}
      <div className="mt-6">
        <ShareBar formation={formation} />
      </div>

      {/* Modal */}
      {modalSlot !== null && (
        <SlotModal
          slot={modalSlot === "new" ? null : modalSlot}
          onSave={handleSave}
          onDelete={modalSlot !== "new" ? handleDelete : undefined}
          onClose={() => setModalSlot(null)}
        />
      )}
    </div>
  );
}
