interface DiceListItemPreviewProps {
  value: number;
  hue: number;
}

export default function DiceListItemPreview({
  value,
  hue,
}: DiceListItemPreviewProps) {
  return (
    <div
      style={{
        backgroundColor: `oklch(65% 0.14 ${hue})`,
        color: `oklch(30% 0.14 ${hue})`,
      }}
      className="size-6 rounded flex items-center justify-center text-xs font-bold"
    >
      {value}
    </div>
  );
}
