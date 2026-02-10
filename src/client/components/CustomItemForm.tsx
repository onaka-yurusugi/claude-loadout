import { useState } from "react";
import type { SlotCategory } from "../lib/types";

type Props = {
  category: SlotCategory;
  onAdd: (name: string, description: string) => void;
};

export function CustomItemForm({ category: _category, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), description.trim());
    setName("");
    setDescription("");
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-2 flex items-center gap-2 text-xs text-text-secondary hover:text-accent transition-colors font-semibold tracking-wide uppercase group"
      >
        <span className="text-[10px] transition-transform group-hover:rotate-90 duration-200">＋</span>
        <span>Custom Add</span>
      </button>
    );
  }

  return (
    <div className="mt-3 space-y-2 border-t border-border-subtle pt-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
        autoFocus
        className="input-tactical text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="説明（任意）"
        className="input-tactical text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAdd();
        }}
      />
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!name.trim()}
          className="btn-tactical btn-tactical-primary text-[10px] !py-1.5 !px-3"
        >
          ADD
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setName("");
            setDescription("");
          }}
          className="btn-tactical text-[10px] !py-1.5 !px-3"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}
