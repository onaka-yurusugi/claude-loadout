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
            className="inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs"
            style={{
              borderColor: `${cat.color}40`,
              backgroundColor: `${cat.color}10`,
              color: cat.color,
            }}
            title={slot.description}
          >
            {slot.name}
            {!readonly && (
              <button
                type="button"
                onClick={() => onRemove(slot.id)}
                className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            )}
          </span>
        );
      })}
    </div>
  );
}
