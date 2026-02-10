import { useState } from "react";
import type { Slot, SlotCategory } from "../lib/types";
import { CATEGORIES, CATEGORY_CONFIG } from "../lib/constants";
import { PRESETS } from "../lib/presets";

type Props = {
  slot: Slot | null;
  onSave: (slot: Slot) => void;
  onDelete?: () => void;
  onClose: () => void;
};

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function SlotModal({ slot, onSave, onDelete, onClose }: Props) {
  const [name, setName] = useState(slot?.name ?? "");
  const [category, setCategory] = useState<SlotCategory>(
    slot?.category ?? "plugin"
  );
  const [description, setDescription] = useState(slot?.description ?? "");

  const isEditing = slot !== null;
  const presets = PRESETS[category];

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({
      id: slot?.id ?? generateId(),
      name: name.trim(),
      category,
      description: description.trim(),
    });
  };

  const handlePresetSelect = (value: string) => {
    if (!value) return;
    const preset = presets?.find((p) => p.name === value);
    if (preset) {
      setName(preset.name);
      setDescription(preset.description);
    }
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-xl border border-border-subtle bg-bg-modal p-6 shadow-2xl">
        <h3 className="font-[family-name:var(--font-orbitron)] text-lg font-bold text-white">
          {isEditing ? "スロット編集" : "スロット追加"}
        </h3>

        {/* Category */}
        <div className="mt-4">
          <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            カテゴリ
          </label>
          <div className="grid grid-cols-4 gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => {
                  setCategory(cat.value);
                  setName("");
                  setDescription("");
                }}
                className={`flex flex-col items-center rounded-lg border-2 px-2 py-2 text-xs transition-colors ${
                  category === cat.value
                    ? "border-accent bg-accent/10 text-white"
                    : "border-border-subtle bg-bg-card text-text-secondary hover:border-accent/50"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="mt-0.5">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preset Dropdown */}
        {presets && (
          <div className="mt-4">
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
              人気のプリセットから選択
            </label>
            <select
              value=""
              onChange={(e) => handlePresetSelect(e.target.value)}
              className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white focus:border-accent focus:outline-none"
            >
              <option value="">-- プリセットを選択 --</option>
              {presets.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Name */}
        <div className="mt-4">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            名前
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例: ESLint Plugin"
            className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none"
            autoFocus={!presets}
          />
        </div>

        {/* Description */}
        <div className="mt-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-text-secondary">
            説明
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="このスロットの説明..."
            rows={2}
            className="w-full rounded border border-border-subtle bg-bg-primary px-3 py-2 text-white placeholder:text-text-secondary/50 focus:border-accent focus:outline-none resize-none"
          />
        </div>

        {/* Preview */}
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-border-subtle bg-bg-card p-3">
          <span className="text-2xl">{CATEGORY_CONFIG[category].icon}</span>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-bold text-white">
              {name || "名前を入力..."}
            </div>
            <div
              className="text-xs"
              style={{ color: CATEGORY_CONFIG[category].color }}
            >
              {CATEGORY_CONFIG[category].label}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-5 flex gap-2">
          {isEditing && onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
            >
              削除
            </button>
          )}
          <div className="flex-1" />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border-subtle px-4 py-2 text-sm text-text-secondary hover:bg-bg-card transition-colors"
          >
            キャンセル
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/80 disabled:opacity-40 transition-colors"
          >
            {isEditing ? "更新" : "追加"}
          </button>
        </div>
      </div>
    </div>
  );
}
