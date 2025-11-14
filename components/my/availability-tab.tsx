'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Calendar, CheckCircle2, XCircle, Save } from 'lucide-react'
import { format, addDays, isSameDay, startOfWeek, getDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface DayAvailability {
  date: Date
  isAvailable: boolean
}

export function AvailabilityTab() {
  // Generate 4 weeks starting from this Sunday
  const generateDates = () => {
    const dates: DayAvailability[] = []
    const today = new Date()
    // Get this week's Sunday (start of week)
    const startSunday = startOfWeek(today, { weekStartsOn: 0 }) // 0 = Sunday
    
    // Generate 4 weeks (28 days) starting from Sunday
    for (let i = 0; i < 28; i++) {
      dates.push({
        date: addDays(startSunday, i),
        isAvailable: true // Default all days as available
      })
    }
    
    return dates
  }

  const [availability, setAvailability] = useState<DayAvailability[]>(generateDates())

  const toggleDay = (date: Date) => {
    setAvailability(prev =>
      prev.map(day =>
        isSameDay(day.date, date)
          ? { ...day, isAvailable: !day.isAvailable }
          : day
      )
    )
  }

  const handleSave = () => {
    const unavailableDates = availability
      .filter(day => !day.isAvailable)
      .map(day => format(day.date, 'yyyy-MM-dd'))
    
    console.log('Saved availability:', {
      unavailableDates,
      totalDays: availability.length,
      unavailableDays: unavailableDates.length
    })
    
    toast.success(`가능한 일정이 저장되었습니다. (불가능: ${unavailableDates.length}일)`)
  }

  const handleSelectAll = () => {
    setAvailability(prev => prev.map(day => ({ ...day, isAvailable: true })))
    toast.success('모든 날짜를 가능으로 설정했습니다.')
  }

  const handleDeselectAll = () => {
    setAvailability(prev => prev.map(day => ({ ...day, isAvailable: false })))
    toast.success('모든 날짜를 불가능으로 설정했습니다.')
  }

  // Group dates by week
  const weeks: DayAvailability[][] = []
  for (let i = 0; i < availability.length; i += 7) {
    weeks.push(availability.slice(i, i + 7))
  }

  const availableCount = availability.filter(d => d.isAvailable).length
  const unavailableCount = availability.filter(d => !d.isAvailable).length
  
  // Day names for header
  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            가능한 일정 관리
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            4주간의 촬영 가능 여부를 설정하세요. 클릭하여 가능/불가능을 전환할 수 있습니다.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            가능 {availableCount}일
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="mr-1 h-3 w-3" />
            불가능 {unavailableCount}일
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleSelectAll}>
          <CheckCircle2 className="mr-2 h-4 w-4" />
          전체 가능
        </Button>
        <Button variant="outline" size="sm" onClick={handleDeselectAll}>
          <XCircle className="mr-2 h-4 w-4" />
          전체 불가능
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-6">
        {weeks.map((week, weekIndex) => (
          <Card key={weekIndex} className="p-4">
            {/* Week Header */}
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">
                {format(week[0].date, 'M월 d일', { locale: ko })} -{' '}
                {format(week[week.length - 1].date, 'M월 d일', { locale: ko })}
              </div>
              <div className="text-xs text-muted-foreground">
                {weekIndex + 1}주차
              </div>
            </div>

            {/* Day Names Header */}
            <div className="grid grid-cols-7 gap-2 mb-2">
              {dayNames.map((dayName, index) => (
                <div
                  key={dayName}
                  className={cn(
                    "text-center text-xs font-semibold py-2 rounded-md",
                    index === 0 ? "text-red-600 bg-red-50" : index === 6 ? "text-blue-600 bg-blue-50" : "text-muted-foreground bg-zinc-50"
                  )}
                >
                  {dayName}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-2">
              {week.map((day) => {
                const isToday = isSameDay(day.date, new Date())
                const dayOfWeek = getDay(day.date) // 0 = Sunday, 6 = Saturday
                
                return (
                  <button
                    key={day.date.toISOString()}
                    onClick={() => toggleDay(day.date)}
                    className={cn(
                      "relative p-3 rounded-lg border-2 transition-all hover:scale-105",
                      day.isAvailable
                        ? "bg-green-50 border-green-300 hover:bg-green-100"
                        : "bg-red-50 border-red-300 hover:bg-red-100",
                      isToday && "ring-2 ring-blue-500 ring-offset-2"
                    )}
                  >
                    {/* Date */}
                    <div className={cn(
                      "text-lg font-bold mb-1",
                      day.isAvailable ? "text-green-900" : "text-red-900",
                      dayOfWeek === 0 && "text-red-600",
                      dayOfWeek === 6 && "text-blue-600"
                    )}>
                      {format(day.date, 'd')}
                    </div>
                    
                    {/* Status Icon */}
                    <div className="flex justify-center">
                      {day.isAvailable ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>

                    {/* Today Badge */}
                    {isToday && (
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-blue-600 text-xs px-1 py-0">오늘</Badge>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end sticky bottom-0 bg-background pt-4 border-t">
        <Button onClick={handleSave} size="lg" className="w-full sm:w-auto">
          <Save className="mr-2 h-4 w-4" />
          저장하기
        </Button>
      </div>
    </div>
  )
}

