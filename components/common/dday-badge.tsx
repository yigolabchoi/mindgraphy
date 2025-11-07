import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { calculateDDay } from '@/lib/utils'

interface DdayBadgeProps {
  targetDate: string | Date
  showIcon?: boolean
  variant?: 'default' | 'outline' | 'secondary'
  className?: string
}

export function DdayBadge({
  targetDate,
  showIcon = true,
  variant = 'outline',
  className
}: DdayBadgeProps) {
  const dDay = calculateDDay(targetDate)
  
  const getText = () => {
    if (dDay > 0) return `D-${dDay}`
    if (dDay === 0) return 'D-Day'
    return `D+${Math.abs(dDay)}`
  }

  const getColor = () => {
    if (dDay > 7) return 'text-zinc-600'
    if (dDay > 3) return 'text-orange-600'
    if (dDay >= 0) return 'text-red-600'
    return 'text-zinc-400'
  }

  return (
    <Badge
      variant={variant}
      className={cn('inline-flex items-center gap-1.5', getColor(), className)}
    >
      {showIcon && <Calendar className="h-3 w-3" />}
      <span className="font-semibold">{getText()}</span>
    </Badge>
  )
}

