'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { MySchedule } from '@/lib/mock/me'
import {
  Calendar,
  Clock,
  MapPin,
  CheckSquare
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MyWeekProps {
  schedule: MySchedule[]
}

export function MyWeek({ schedule }: MyWeekProps) {
  // Group schedules by date
  const schedulesByDate = schedule.reduce((acc, item) => {
    if (!acc[item.date]) {
      acc[item.date] = []
    }
    acc[item.date].push(item)
    return acc
  }, {} as Record<string, MySchedule[]>)

  return (
    <div className="space-y-6">
      {/* Schedule List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          예정된 일정
        </h2>

        {schedule.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              예정된 일정이 없습니다
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
    </div>
  )
}

