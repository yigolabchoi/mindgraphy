import { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  secondaryAction?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  className?: string
  iconClassName?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  iconClassName
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-4 animate-in fade-in slide-in-from-bottom duration-300',
      className
    )}>
      {Icon && (
        <div className={cn(
          "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 transition-all hover:scale-105",
          iconClassName
        )}>
          <Icon className="h-8 w-8 text-zinc-400" />
        </div>
      )}
      <h3 className="mb-2 text-lg md:text-xl font-semibold text-zinc-900">{title}</h3>
      {description && (
        <p className="mb-6 max-w-md text-center text-sm md:text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {action && (
            <Button 
              onClick={action.onClick} 
              variant={action.variant || 'default'}
              size="sm"
              className="w-full sm:w-auto"
            >
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button 
              onClick={secondaryAction.onClick} 
              variant={secondaryAction.variant || 'outline'}
              size="sm"
              className="w-full sm:w-auto"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

