import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
  animationDelay?: number
}

/**
 * Statistical card component for displaying metrics and trends
 * Used in analytics and dashboard pages
 */
export function StatCard({
  title,
  icon: Icon,
  children,
  className,
  animationDelay = 0
}: StatCardProps) {
  return (
    <Card 
      className={cn(
        "border-0 ring-1 ring-zinc-200/50 shadow-sm animate-in fade-in slide-in-from-bottom",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{title}</CardTitle>
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

