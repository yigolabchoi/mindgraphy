import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  showLabel?: boolean
  className?: string
  barClassName?: string
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showLabel = true,
  className,
  barClassName
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className={cn('space-y-2', className)}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm">
          {label && <span className="text-muted-foreground">{label}</span>}
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
        <div
          className={cn(
            'h-full bg-zinc-900 transition-all duration-300 ease-in-out',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}

