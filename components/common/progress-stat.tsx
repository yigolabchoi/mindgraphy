import { cn } from '@/lib/utils'

interface ProgressStatProps {
  label: string
  value: number
  total: number
  percentage: number
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'yellow' | 'red'
  animationDelay?: number
}

const colorMap = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  orange: 'bg-orange-600',
  purple: 'bg-purple-600',
  yellow: 'bg-yellow-600',
  red: 'bg-red-600',
}

/**
 * Progress bar with statistics
 * Commonly used for showing completion rates, distributions, etc.
 */
export function ProgressStat({
  label,
  value,
  total,
  percentage,
  color = 'blue',
  animationDelay = 0
}: ProgressStatProps) {
  return (
    <div 
      className="space-y-2 animate-in fade-in slide-in-from-left"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {value}명 ({percentage}%)
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={cn(
            "h-2 rounded-full transition-all duration-1000",
            colorMap[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

