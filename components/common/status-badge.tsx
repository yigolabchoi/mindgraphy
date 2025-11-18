import { Badge } from '@/components/ui/badge'
import { getStatusColor, getStatusLabel } from '@/lib/utils/status.utils'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

/**
 * Standardized status badge component
 * Uses centralized status utilities for consistent styling
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <Badge className={cn('border', getStatusColor(status), className)}>
      {getStatusLabel(status)}
    </Badge>
  )
}

