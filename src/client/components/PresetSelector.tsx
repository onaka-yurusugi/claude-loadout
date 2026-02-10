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
    <div className="space-y-1">
      {presets.map((preset) => {
        const isSelected = selectedNames.has(preset.name);
        return (
          <label
            key={preset.name}
            className={`flex items-start gap-3 rounded-lg border px-3 py-2 cursor-pointer transition-colors ${
              isSelected
                ? "border-accent/50 bg-accent/5"
                : "border-border-subtle bg-bg-card/50 hover:border-border-subtle hover:bg-bg-card"
            }`}
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onToggle(preset, isSelected)}
              className="mt-0.5 accent-accent"
            />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-white truncate">
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
