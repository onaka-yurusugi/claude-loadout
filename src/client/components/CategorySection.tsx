import { useState } from "react";
import type { Slot, SlotCategory, FormationAction } from "../lib/types";
import { CATEGORY_CONFIG } from "../lib/constants";
import { PRESETS } from "../lib/presets";
import { PresetSelector } from "./PresetSelector";
import { CustomItemForm } from "./CustomItemForm";
import { SelectedItems } from "./SelectedItems";

type Props = {
  category: SlotCategory;
  slots: Slot[];
  dispatch: (action: FormationAction) => void;
};

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function CategorySection({ category, slots, dispatch }: Props) {
  const cat = CATEGORY_CONFIG[category];
  const presets = PRESETS[category];
  const categorySlots = slots.filter((s) => s.category === category);
  const isModel = category === "model";
  const [expanded, setExpanded] = useState(!!presets && !isModel);

  const handlePresetToggle = (
    preset: { name: string; description: string },
    isSelected: boolean
  ) => {
    if (isModel) {
      // Model: single-select — remove existing model slots, then add new one
      const existingModel = categorySlots.find((s) => s.name === preset.name);
      if (existingModel) {
        // Deselect
        dispatch({ type: "REMOVE_SLOT", payload: existingModel.id });
      } else {
        // Remove all existing models, then add
        for (const s of categorySlots) {
          dispatch({ type: "REMOVE_SLOT", payload: s.id });
        }
        dispatch({
          type: "ADD_SLOT",
          payload: {
            id: generateId(),
            name: preset.name,
            category,
            description: preset.description,
          },
        });
      }
      return;
    }

    if (isSelected) {
      const slot = categorySlots.find((s) => s.name === preset.name);
      if (slot) dispatch({ type: "REMOVE_SLOT", payload: slot.id });
    } else {
      dispatch({
        type: "ADD_SLOT",
        payload: {
          id: generateId(),
          name: preset.name,
          category,
          description: preset.description,
        },
      });
    }
  };

  const handleCustomAdd = (name: string, description: string) => {
    if (isModel) {
      for (const s of categorySlots) {
        dispatch({ type: "REMOVE_SLOT", payload: s.id });
      }
    }
    dispatch({
      type: "ADD_SLOT",
      payload: { id: generateId(), name, category, description },
    });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_SLOT", payload: id });
  };

  // Model: special dropdown UI
  if (isModel && presets) {
    const selectedModel = categorySlots[0];
    return (
      <div className="rounded-lg border border-border-subtle bg-bg-card/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">{cat.icon}</span>
          <span className="text-sm font-bold text-white">{cat.label}</span>
        </div>
        <select
          value={selectedModel?.name ?? ""}
          onChange={(e) => {
            const preset = presets.find((p) => p.name === e.target.value);
            if (preset) {
              handlePresetToggle(preset, false);
            } else if (e.target.value === "") {
              for (const s of categorySlots) {
                dispatch({ type: "REMOVE_SLOT", payload: s.id });
              }
            }
          }}
          className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white focus:border-accent focus:outline-none"
        >
          <option value="">-- モデルを選択 --</option>
          {presets.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        {selectedModel && (
          <p className="mt-1.5 text-xs text-text-secondary">
            {selectedModel.description}
          </p>
        )}
      </div>
    );
  }

  // Preset categories: checkbox multi-select
  if (presets) {
    return (
      <div className="rounded-lg border border-border-subtle bg-bg-card/30 p-4">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-2 text-left"
        >
          <span className="text-lg">{cat.icon}</span>
          <span className="text-sm font-bold text-white flex-1">
            {cat.label}
          </span>
          <span className="text-xs text-text-secondary">
            {categorySlots.length > 0 && `${categorySlots.length} 選択中`}
          </span>
          <span className="text-text-secondary text-xs">
            {expanded ? "▲" : "▼"}
          </span>
        </button>

        {/* Selected items always visible */}
        {categorySlots.length > 0 && (
          <div className="mt-3">
            <SelectedItems
              slots={categorySlots}
              onRemove={handleRemove}
            />
          </div>
        )}

        {/* Expandable preset list */}
        {expanded && (
          <div className="mt-3 max-h-64 overflow-y-auto">
            <PresetSelector
              category={category}
              presets={presets}
              selectedSlots={slots}
              onToggle={handlePresetToggle}
            />
          </div>
        )}

        <CustomItemForm category={category} onAdd={handleCustomAdd} />
      </div>
    );
  }

  // Non-preset categories: free-form only
  return (
    <div className="rounded-lg border border-border-subtle bg-bg-card/30 p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{cat.icon}</span>
        <span className="text-sm font-bold text-white">{cat.label}</span>
        {categorySlots.length > 0 && (
          <span className="text-xs text-text-secondary">
            {categorySlots.length} 件
          </span>
        )}
      </div>

      <SelectedItems slots={categorySlots} onRemove={handleRemove} />
      <CustomItemForm category={category} onAdd={handleCustomAdd} />
    </div>
  );
}
