'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Calendar, CheckCircle2, XCircle, Save } from 'lucide-react'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface AvailabilityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface DayAvailability {
  date: Date
  isAvailable: boolean
}

export function AvailabilityModal({ open, onOpenChange }: AvailabilityModalProps) {
  // Generate next 4 weeks of dates
  const generateDates = () => {
    const dates: DayAvailability[] = []
    const today = new Date()
    
    for (let i = 0; i < 28; i++) {
      dates.push({
        date: addDays(today, i),
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
    onOpenChange(false)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Calendar className="h-5 w-5" />
            가능한 일정 관리
          </DialogTitle>
          <DialogDescription>
            촬영 가능한 날짜를 선택하세요. 불가능한 날짜는 클릭하여 표시할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Statistics */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Badge variant="default" className="bg-green-600">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                가능: {availableCount}일
              </Badge>
              <Badge variant="secondary">
                <XCircle className="mr-1 h-3 w-3" />
                불가능: {unavailableCount}일
              </Badge>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleSelectAll}>
                전체 선택
              </Button>
              <Button variant="outline" size="sm" onClick={handleDeselectAll}>
                전체 해제
              </Button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 border-2 border-green-600" />
              <span>촬영 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 border-2 border-red-600" />
              <span>촬영 불가능</span>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="space-y-6">
            {weeks.map((week, weekIndex) => (
              <Card key={weekIndex} className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-sm text-muted-foreground">
                    {format(week[0].date, 'M월 d일', { locale: ko })} 주차
                  </h3>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {week.map((day, dayIndex) => {
                    const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6
                    const isToday = isSameDay(day.date, new Date())
                    
                    return (
                      <button
                        key={dayIndex}
                        onClick={() => toggleDay(day.date)}
                        className={cn(
                          'aspect-square rounded-lg border-2 p-2 transition-all hover:scale-105',
                          'flex flex-col items-center justify-center gap-1',
                          day.isAvailable
                            ? 'bg-green-50 border-green-600 hover:bg-green-100'
                            : 'bg-red-50 border-red-600 hover:bg-red-100',
                          isToday && 'ring-2 ring-blue-500 ring-offset-2'
                        )}
                      >
                        <div className={cn(
                          'text-xs font-medium',
                          isWeekend && 'text-red-600'
                        )}>
                          {format(day.date, 'E', { locale: ko })}
                        </div>
                        <div className="text-lg font-bold">
                          {format(day.date, 'd')}
                        </div>
                        {day.isAvailable ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                      </button>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>

          {/* Tip */}
          <Card className="border-blue-200 bg-blue-50">
            <div className="p-4">
              <div className="flex gap-3">
                <div className="text-blue-600 mt-0.5">💡</div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-blue-900">안내사항</p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• 날짜를 클릭하여 촬영 가능/불가능을 전환할 수 있습니다</li>
                    <li>• 불가능으로 표시된 날짜는 일정 배정에서 제외됩니다</li>
                    <li>• 이미 배정된 일정은 영향을 받지 않습니다</li>
                    <li>• 변경사항은 저장 버튼을 눌러야 반영됩니다</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            취소
          </Button>
          <Button onClick={handleSave} className="w-full sm:w-auto">
            <Save className="mr-2 h-4 w-4" />
            저장
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

