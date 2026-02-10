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
        className="mt-2 flex items-center gap-1.5 rounded-lg border border-dashed border-border-subtle px-3 py-1.5 text-xs text-text-secondary hover:border-accent hover:text-accent transition-colors"
      >
        <span>＋</span>
        <span>カスタム追加</span>
      </button>
    );
  }

  return (
    <div className="mt-2 rounded-lg border border-border-subtle bg-bg-card/50 p-3 space-y-2">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前"
        autoFocus
        className="w-full rounded border border-border-subtle bg-bg-primary px-2 py-1.5 text-sm text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="説明（任意）"
        className="w-full rounded border border-border-subtle bg-bg-primary px-2 py-1.5 text-sm text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!name.trim()}
          className="rounded bg-accent px-3 py-1 text-xs font-semibold text-white hover:bg-accent/80 disabled:opacity-40 transition-colors"
        >
          追加
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setName("");
            setDescription("");
          }}
          className="rounded border border-border-subtle px-3 py-1 text-xs text-text-secondary hover:bg-bg-card transition-colors"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
