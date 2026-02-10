import type { Slot } from "../lib/types";
import { CATEGORY_CONFIG } from "../lib/constants";

type Props = {
  slots: Slot[];
  onRemove: (id: string) => void;
  readonly?: boolean;
};

export function SelectedItems({ slots, onRemove, readonly }: Props) {
  if (slots.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-1.5">
      {slots.map((slot) => {
        const cat = CATEGORY_CONFIG[slot.category];
        return (
          <span
            key={slot.id}
            className="eq-chip"
            style={{
              borderColor: `${cat.color}35`,
              backgroundColor: `${cat.color}0a`,
              color: cat.color,
              ["--_chip-glow" as string]: `${cat.color}40`,
            }}
            title={slot.description}
          >
            <span className="truncate max-w-[180px]">{slot.name}</span>
            {!readonly && (
              <button
                type="button"
                onClick={() => onRemove(slot.id)}
                className="ml-1 opacity-50 hover:opacity-100 transition-opacity text-[10px]"
              >
                ✕
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}
