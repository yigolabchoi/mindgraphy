'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DdayBadge } from '@/components/common/dday-badge'
import { EmptyState } from '@/components/common/empty-state'
import type { MySchedule, ChecklistItem } from '@/lib/mock/me'
import {
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  Circle,
  Package,
  AlertCircle,
  Calendar,
  Play,
  CheckCheck
} from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface MyDayProps {
  schedule: MySchedule[]
  checklist: ChecklistItem[]
  onChecklistToggle: (id: string) => void
  onStatusChange?: (scheduleId: string, newStatus: 'in_progress' | 'completed') => void
}

export function MyDay({ schedule, checklist, onChecklistToggle, onStatusChange }: MyDayProps) {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean
    scheduleId: string
    action: 'start' | 'complete'
    title: string
  }>({
    open: false,
    scheduleId: '',
    action: 'start',
    title: ''
  })

  const handleStatusChangeClick = (item: MySchedule, action: 'start' | 'complete') => {
    setConfirmDialog({
      open: true,
      scheduleId: item.id,
      action,
      title: item.title
    })
  }

  const handleConfirm = () => {
    const newStatus = confirmDialog.action === 'start' ? 'in_progress' : 'completed'
    
    if (onStatusChange) {
      onStatusChange(confirmDialog.scheduleId, newStatus)
    }
    
    const message = confirmDialog.action === 'start' 
      ? '촬영을 시작했습니다!' 
      : '촬영이 완료되었습니다!'
    
    toast.success(message)
    setConfirmDialog({ ...confirmDialog, open: false })
  }

  if (schedule.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="오늘 일정이 없습니다"
        description="편안한 하루 보내세요!"
      />
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

              {/* Start/Complete Button */}
              {item.status !== 'completed' && (
                <div className="pt-2">
                  {item.status === 'upcoming' ? (
                    <Button
                      onClick={() => handleStatusChangeClick(item, 'start')}
                      className="w-full bg-green-600 hover:bg-green-700"
                      size="lg"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      촬영 시작
                    </Button>
                  ) : item.status === 'in_progress' ? (
                    <Button
                      onClick={() => handleStatusChangeClick(item, 'complete')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                    >
                      <CheckCheck className="mr-2 h-5 w-5" />
                      촬영 완료
                    </Button>
                  ) : null}
                </div>
              )}

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

      {/* Confirmation Dialog */}
      <Dialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({...confirmDialog, open})}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {confirmDialog.action === 'start' ? (
                <>
                  <Play className="h-5 w-5 text-green-600" />
                  촬영 시작 확인
                </>
              ) : (
                <>
                  <CheckCheck className="h-5 w-5 text-blue-600" />
                  촬영 완료 확인
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {confirmDialog.action === 'start' ? (
                <>
                  <strong>{confirmDialog.title}</strong> 촬영을 시작하시겠습니까?
                  <br />
                  <span className="text-xs text-muted-foreground mt-2 block">
                    시작 시간이 기록되며 실시간 현황판에 표시됩니다.
                  </span>
                </>
              ) : (
                <>
                  <strong>{confirmDialog.title}</strong> 촬영을 완료하시겠습니까?
                  <br />
                  <span className="text-xs text-muted-foreground mt-2 block">
                    완료 시간이 기록되며 일정이 종료됩니다.
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setConfirmDialog({...confirmDialog, open: false})}
            >
              취소
            </Button>
            <Button
              onClick={handleConfirm}
              className={confirmDialog.action === 'start' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
            >
              {confirmDialog.action === 'start' ? '시작하기' : '완료하기'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

