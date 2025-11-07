'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DdayBadge } from '@/components/common/dday-badge'
import { EmptyState } from '@/components/common/empty-state'
import type { MySchedule, ChecklistItem } from '@/lib/mock/me'
import {
  Clock,
  MapPin,
  Phone,
  Navigation,
  CheckCircle2,
  Circle,
  Package,
  AlertCircle,
  Calendar
} from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface MyDayProps {
  schedule: MySchedule[]
  checklist: ChecklistItem[]
  onChecklistToggle: (id: string) => void
}

export function MyDay({ schedule, checklist, onChecklistToggle }: MyDayProps) {
  if (schedule.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="오늘 일정이 없습니다"
        description="편안한 하루 보내세요!"
      />
    )
  }

  const getTravelTimeBadge = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    let label = '이동시간: '
    if (hours > 0) label += `${hours}시간 `
    if (mins > 0) label += `${mins}분`
    
    return (
      <Badge variant="outline" className="text-xs">
        <Navigation className="mr-1 h-3 w-3" />
        {label}
      </Badge>
    )
  }

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      upcoming: '예정',
      in_progress: '진행중',
      completed: '완료'
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <div className="space-y-6">
      {/* Today's Schedule */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5" />
          오늘의 일정
        </h2>

        {schedule.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {item.venueName}
                  </p>
                </div>
                <Badge className={cn("border", getStatusColor(item.status))}>
                  {getStatusLabel(item.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Time & Meta */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <div className="flex items-center gap-1 font-medium">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {item.startTime} - {item.endTime}
                </div>
                <span className="text-muted-foreground">·</span>
                <span>예식 {item.ceremonyTime}</span>
                {getTravelTimeBadge(item.travelTimeMinutes)}
                <DdayBadge targetDate={item.date} showIcon={false} />
              </div>

              {/* Venue */}
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">{item.venueName}</p>
                  <p className="text-muted-foreground">{item.venueAddress}</p>
                </div>
              </div>

              {/* Package & Options */}
              <div className="flex items-start gap-2 text-sm">
                <Package className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex flex-wrap gap-1">
                  <Badge variant="secondary">{item.packageType}</Badge>
                  {item.options.map((option, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {option}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              {item.specialRequests && (
                <div className="flex items-start gap-2 text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <p className="text-yellow-800">{item.specialRequests}</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <a href={`tel:${item.groomPhone}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    신랑
                  </Button>
                </a>
                <a href={`tel:${item.bridePhone}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="mr-2 h-4 w-4" />
                    신부
                  </Button>
                </a>
                <a
                  href={`https://map.kakao.com/?q=${encodeURIComponent(item.venueAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <MapPin className="mr-2 h-4 w-4" />
                    지도
                  </Button>
                </a>
              </div>

              {/* Checklist Progress */}
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">체크리스트</span>
                  <span className="font-medium">
                    {item.checklistCompleted} / {item.checklistTotal}
                  </span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all"
                    style={{
                      width: `${(item.checklistCompleted / item.checklistTotal) * 100}%`
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* My Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>내 체크리스트</span>
            <Badge variant="secondary">
              {checklist.filter(item => item.completed).length} / {checklist.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {checklist.map((item) => (
              <label
                key={item.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                  "hover:bg-zinc-50 dark:hover:bg-zinc-800",
                  item.completed && "opacity-60"
                )}
              >
                <button
                  type="button"
                  onClick={() => onChecklistToggle(item.id)}
                  className="flex-shrink-0"
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                <span
                  className={cn(
                    "text-sm flex-1",
                    item.completed && "line-through text-muted-foreground"
                  )}
                >
                  {item.text}
                </span>
                <Badge variant="outline" className="text-xs">
                  {item.category === 'equipment' && '장비'}
                  {item.category === 'preparation' && '준비'}
                  {item.category === 'travel' && '이동'}
                  {item.category === 'post' && '사후'}
                </Badge>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

