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
      const existingModel = categorySlots.find((s) => s.name === preset.name);
      if (existingModel) {
        dispatch({ type: "REMOVE_SLOT", payload: existingModel.id });
      } else {
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
      <div
        className="tac-card-accent scan-line p-5 stagger-in"
        style={{ ["--_accent-color" as string]: cat.color }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="cat-badge"
            style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </div>
          {selectedModel && (
            <div className="pulse-dot" style={{ backgroundColor: cat.color }} />
          )}
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
          className="input-tactical"
        >
          <option value="">-- SELECT MODEL --</option>
          {presets.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        {selectedModel && (
          <p className="mt-2 text-sm text-text-secondary">
            {selectedModel.description}
          </p>
        )}
      </div>
    );
  }

  // Preset categories: checkbox multi-select
  if (presets) {
    return (
      <div
        className="tac-card-accent scan-line stagger-in"
        style={{ ["--_accent-color" as string]: cat.color }}
      >
        {/* Header */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center gap-3 p-5 pb-3 text-left"
        >
          <div
            className="cat-badge"
            style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </div>
          <div className="flex-1" />
          {categorySlots.length > 0 && (
            <span
              className="status-counter"
              style={{
                backgroundColor: `${cat.color}20`,
                color: cat.color,
              }}
            >
              {categorySlots.length}
            </span>
          )}
          <span
            className="text-xs transition-transform duration-200"
            style={{
              color: cat.color,
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            ▼
          </span>
        </button>

        {/* Selected items */}
        {categorySlots.length > 0 && (
          <div className="px-5 pb-3">
            <SelectedItems slots={categorySlots} onRemove={handleRemove} />
          </div>
        )}

        {/* Expandable preset list */}
        <div
          className="expand-panel"
          data-expanded={expanded}
        >
          <div>
            <div className="mx-5 mb-3 max-h-56 overflow-y-auto preset-scroll border-t border-border-subtle pt-3">
              <PresetSelector
                category={category}
                presets={presets}
                selectedSlots={slots}
                onToggle={handlePresetToggle}
              />
            </div>
          </div>
        </div>

        <div className="px-5 pb-4">
          <CustomItemForm category={category} onAdd={handleCustomAdd} />
        </div>
      </div>
    );
  }

  // Non-preset categories: free-form only
  return (
    <div
      className="tac-card-accent scan-line p-5 stagger-in"
      style={{ ["--_accent-color" as string]: cat.color }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="cat-badge"
          style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </div>
        {categorySlots.length > 0 && (
          <span
            className="status-counter"
            style={{
              backgroundColor: `${cat.color}20`,
              color: cat.color,
            }}
          >
            {categorySlots.length}
          </span>
        )}
      </div>

      <SelectedItems slots={categorySlots} onRemove={handleRemove} />
      <CustomItemForm category={category} onAdd={handleCustomAdd} />
    </div>
  );
}
