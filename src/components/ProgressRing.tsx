interface ProgressRingProps {
  value: number;   // 0..100
  size?: number;   // px
  stroke?: number; // px
  label?: string;
}

export default function ProgressRing({
  value,
  size = 88,
  stroke = 8,
  label,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} className="shrink-0">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-muted"
          strokeWidth={stroke}
          fill="none"
          opacity={0.25}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          className="text-primary"
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-foreground text-sm font-semibold"
        >
          {Math.round(value)}%
        </text>
      </svg>
      {label && <div className="text-sm text-muted-foreground">{label}</div>}
    </div>
  );
}
