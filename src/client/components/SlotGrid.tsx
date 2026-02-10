import type { Slot } from "../lib/types";
import { MAX_SLOTS } from "../lib/constants";
import { SlotCard } from "./SlotCard";
import { EmptySlot } from "./EmptySlot";

type Props = {
  slots: Slot[];
  onSlotClick: (slot: Slot) => void;
  onEmptyClick: () => void;
  readonly?: boolean;
};

export function SlotGrid({ slots, onSlotClick, onEmptyClick, readonly }: Props) {
  const emptyCount = readonly ? 0 : MAX_SLOTS - slots.length;

  return (
    <div className="grid grid-cols-5 gap-3">
      {slots.map((slot) => (
        <div key={slot.id} className="aspect-square">
          <SlotCard
            slot={slot}
            onClick={readonly ? undefined : () => onSlotClick(slot)}
          />
        </div>
      ))}
      {Array.from({ length: emptyCount }, (_, i) => (
        <div key={`empty-${i}`} className="aspect-square">
          <EmptySlot onClick={onEmptyClick} />
        </div>
      ))}
    </div>
  );
}
