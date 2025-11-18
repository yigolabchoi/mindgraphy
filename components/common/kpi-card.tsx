import { LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    isPositive?: boolean
  }
  className?: string
  valueClassName?: string
  href?: string
  onClick?: () => void
}

export function KPICard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  valueClassName,
  onClick
}: KPICardProps) {
  const cardContent = (
    <>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn(
          "h-4 w-4 transition-all",
          onClick ? "text-muted-foreground group-hover:scale-110" : "text-muted-foreground"
        )} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold transition-colors", valueClassName)}>
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium mt-2",
            trend.isPositive ? "text-green-600" : "text-red-600"
          )}>
            <span>{trend.isPositive ? '↑' : '↓'} {trend.value}%</span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </>
  )

  const baseClassName = cn(
    "border-0 ring-1 ring-zinc-200/50 transition-all duration-200",
    onClick && "cursor-pointer hover:shadow-lg hover:scale-[1.02] group",
    className
  )

  return (
    <Card className={baseClassName} onClick={onClick}>
      {cardContent}
    </Card>
  )
}

