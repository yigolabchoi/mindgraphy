'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { MySchedule, WeeklyAvailability } from '@/lib/mock/me'
import {
  Calendar,
  Clock,
  MapPin,
  Navigation,
  CheckSquare,
  X,
  Check
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface MyWeekProps {
  schedule: MySchedule[]
  availability: WeeklyAvailability[]
  onAvailabilityToggle: (date: string, slot: 'morning' | 'afternoon' | 'evening') => void
}

export function MyWeek({ schedule, availability, onAvailabilityToggle }: MyWeekProps) {
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  // Group schedules by date
  const schedulesByDate = schedule.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = []
    }
    acc[item.date].push(item)
    return acc
  }, {} as Record<string, MySchedule[]>)

  // Group availability by week
  const weeks: WeeklyAvailability[][] = []
  for (let i = 0; i < availability.length; i += 7) {
    weeks.push(availability.slice(i, i + 7))
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      available: 'outline',
      booked: 'default',
      leave: 'secondary',
      requested_swap: 'destructive'
    }
    const labels = {
      available: '가능',
      booked: '예약',
      leave: '휴가',
      requested_swap: '교대요청'
    }
    return (
      <Badge 
        variant={(variants[status as keyof typeof variants] || 'default') as 'default' | 'destructive' | 'outline' | 'secondary'} 
        className="text-xs"
      >
        {labels[status as keyof typeof labels]}
      </Badge>
    )
  }

  const getSlotLabel = (slot: 'morning' | 'afternoon' | 'evening') => {
    const labels = {
      morning: '오전 (09-13)',
      afternoon: '오후 (13-18)',
      evening: '저녁 (18-22)'
    }
    return labels[slot]
  }

  return (
    <div className="space-y-6">
      {/* Week Schedule List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          이번 주 일정
        </h2>

        {schedule.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              이번 주 예정된 일정이 없습니다
            </CardContent>
          </Card>
        ) : (
          schedule.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(parseISO(item.date), 'M월 d일 (EEE)', { locale: ko })}
                    </p>
                  </div>
                  <Badge variant={item.status === 'upcoming' ? 'outline' : 'default'}>
                    {item.status === 'upcoming' ? '예정' : item.status === 'in_progress' ? '진행중' : '완료'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {item.startTime} - {item.endTime}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span>예식 {item.ceremonyTime}</span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <span>{item.venueName}</span>
                </div>

                {item.travelTimeMinutes > 60 && (
                  <div className="flex items-center gap-2 text-sm text-orange-600">
                    <Navigation className="h-4 w-4" />
                    <span>
                      이동시간 {Math.floor(item.travelTimeMinutes / 60)}시간{' '}
                      {item.travelTimeMinutes % 60 > 0 && `${item.travelTimeMinutes % 60}분`} - 전날 출발 필요
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm">
                  <CheckSquare className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    준비 상태: {item.checklistCompleted}/{item.checklistTotal}
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden ml-2">
                    <div
                      className="h-full bg-green-500"
                      style={{
                        width: `${(item.checklistCompleted / item.checklistTotal) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Weekly Availability Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            가용성 관리
          </h2>
          <p className="text-sm text-muted-foreground">
            클릭하여 가능/불가능 토글
          </p>
        </div>

        {weeks.map((week, weekIdx) => (
          <Card key={weekIdx}>
            <CardHeader>
              <CardTitle className="text-base">
                {format(parseISO(week[0].date), 'M월 d일', { locale: ko })} 주간
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2 font-medium">시간대</th>
                      {week.map((day) => (
                        <th key={day.date} className="text-center p-2 font-medium min-w-[80px]">
                          <div>
                            {dayNames[day.dayOfWeek]}
                          </div>
                          <div className="text-xs text-muted-foreground font-normal">
                            {format(parseISO(day.date), 'd일')}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                      <tr key={slot} className="border-b">
                        <td className="p-2 font-medium text-muted-foreground">
                          {getSlotLabel(slot)}
                        </td>
                        {week.map((day) => {
                          const isBooked = day.status === 'booked'
                          const isAvailable = day.slots[slot]
                          const isDisabled = isBooked

                          return (
                            <td key={day.date} className="p-2 text-center">
                              <button
                                onClick={() => !isDisabled && onAvailabilityToggle(day.date, slot)}
                                disabled={isDisabled}
                                className={cn(
                                  "w-full h-10 rounded-md border-2 transition-all",
                                  "flex items-center justify-center",
                                  isDisabled && "cursor-not-allowed opacity-50 bg-gray-100",
                                  !isDisabled && "cursor-pointer hover:scale-105",
                                  isAvailable && !isDisabled && "bg-green-50 border-green-500",
                                  !isAvailable && !isDisabled && "bg-red-50 border-red-500",
                                  isBooked && "bg-blue-50 border-blue-500"
                                )}
                              >
                                {isBooked ? (
                                  <span className="text-xs font-medium text-blue-700">예약</span>
                                ) : isAvailable ? (
                                  <Check className="h-4 w-4 text-green-600" />
                                ) : (
                                  <X className="h-4 w-4 text-red-600" />
                                )}
                              </button>
                            </td>
                          )
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-green-50 border-2 border-green-500" />
                  <span>가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-red-50 border-2 border-red-500" />
                  <span>불가능</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-blue-50 border-2 border-blue-500" />
                  <span>예약됨</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

