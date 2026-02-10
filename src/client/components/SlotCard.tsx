import type { Slot } from "../lib/types";
import { CATEGORY_CONFIG } from "../lib/constants";

type Props = {
  slot: Slot;
  onClick?: () => void;
};

export function SlotCard({ slot, onClick }: Props) {
  const cat = CATEGORY_CONFIG[slot.category];

  return (
    <button
      type="button"
      onClick={onClick}
      className="slot-card flex h-full w-full flex-col items-center justify-between rounded-lg border-2 bg-bg-card p-3 text-center transition-colors hover:bg-bg-card/80"
      style={{ borderColor: cat.color }}
    >
      <span className="text-2xl">{cat.icon}</span>
      <span
        className="mt-1 line-clamp-2 text-xs font-bold leading-tight text-white"
        title={slot.name}
      >
        {slot.name}
      </span>
      <span className="text-[10px] mt-0.5" style={{ color: cat.color }}>
        {cat.label}
      </span>
    </button>
  );
}
