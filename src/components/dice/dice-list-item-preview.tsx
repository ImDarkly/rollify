interface DiceListItemPreviewProps {
  value: number;
  hue: number;
  isLocked: boolean;
}

export default function DiceListItemPreview({
  value,
  hue,
  isLocked,
}: DiceListItemPreviewProps) {
  return (
    <div
      style={{
        backgroundColor: `oklch(75% 0.14 ${hue})`,
        color: `oklch(35% 0.14 ${hue})`,
      }}
      className={`size-6 rounded flex items-center justify-center text-xs font-bold ${isLocked ? "opacity-30" : "opacity-100"}`}
    >
      {value}
    </div>
  );
}
