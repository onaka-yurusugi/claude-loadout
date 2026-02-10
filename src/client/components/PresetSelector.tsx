import type { Slot, SlotCategory } from "../lib/types";

type Preset = { name: string; description: string };

type Props = {
  category: SlotCategory;
  presets: Preset[];
  selectedSlots: Slot[];
  onToggle: (preset: Preset, selected: boolean) => void;
};

export function PresetSelector({
  category,
  presets,
  selectedSlots,
  onToggle,
}: Props) {
  const selectedNames = new Set(
    selectedSlots
      .filter((s) => s.category === category)
      .map((s) => s.name)
  );

  return (
    <div className="space-y-0.5">
      {presets.map((preset) => {
        const isSelected = selectedNames.has(preset.name);
        return (
          <label
            key={preset.name}
            className="preset-row"
            data-selected={isSelected}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(preset, isSelected)}
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-text-primary truncate">
                {preset.name}
              </div>
              <div className="text-xs text-text-secondary truncate">
                {preset.description}
              </div>
            </div>
          </label>
        );
      })}
    </div>
  );
}
