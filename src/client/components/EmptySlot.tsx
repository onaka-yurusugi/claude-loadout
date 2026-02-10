type Props = {
  onClick: () => void;
};

export function EmptySlot({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-border-subtle bg-bg-card/50 p-3 text-text-secondary transition-colors hover:border-accent hover:text-accent"
    >
      <span className="pulse-slow text-3xl">＋</span>
      <span className="mt-1 text-xs">空き</span>
    </button>
  );
}
