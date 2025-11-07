'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { MyDay } from '@/components/my/my-day'
import { MyWeek } from '@/components/my/my-week'
import { ShiftSwapModal } from '@/components/my/shift-swap-modal'
import { LeaveRequestModal } from '@/components/my/leave-request-modal'
import {
  getTodaySchedule,
  getWeekSchedule,
  getWeeklyAvailability,
  getMyChecklist,
  toggleChecklistItem,
  updateAvailabilitySlot,
  createShiftSwapRequest,
  requestLeave,
  currentUser,
  type ChecklistItem,
  type WeeklyAvailability,
  type MySchedule
} from '@/lib/mock/me'
import { Calendar, Repeat, User } from 'lucide-react'
import { toast } from 'sonner'

export default function MyPage() {
  // State
  const [activeTab, setActiveTab] = useState<'day' | 'week'>('day')
  const [todaySchedule] = useState(getTodaySchedule())
  const [weekSchedule] = useState(getWeekSchedule())
  const [checklist, setChecklist] = useState<ChecklistItem[]>(getMyChecklist())
  const [availability, setAvailability] = useState<WeeklyAvailability[]>(getWeeklyAvailability())
  
  // Modals
  const [shiftSwapModalOpen, setShiftSwapModalOpen] = useState(false)
  const [leaveModalOpen, setLeaveModalOpen] = useState(false)
  const [selectedScheduleForSwap, setSelectedScheduleForSwap] = useState<MySchedule | null>(null)

  // Handlers
  const handleChecklistToggle = (id: string) => {
    setChecklist(prev => toggleChecklistItem(id, prev))
    const item = checklist.find(c => c.id === id)
    if (item) {
      toast.success(item.completed ? '체크리스트 항목 미완료로 변경됨' : '체크리스트 항목 완료!')
    }
  }

  const handleAvailabilityToggle = (date: string, slot: 'morning' | 'afternoon' | 'evening') => {
    setAvailability(prev => {
      const day = prev.find(d => d.date === date)
      if (!day) return prev
      
      const newValue = !day.slots[slot]
      toast.success(
        `${date} ${slot === 'morning' ? '오전' : slot === 'afternoon' ? '오후' : '저녁'} 시간대를 ${newValue ? '가능' : '불가능'}으로 변경했습니다.`
      )
      
      return updateAvailabilitySlot(date, slot, newValue, prev)
    })
  }

  const handleShiftSwapRequest = (scheduleId: string, reason: string, targetPhotographerId: string) => {
    const schedule = weekSchedule.find(s => s.eventId === scheduleId)
    if (!schedule) return

    const request = createShiftSwapRequest(
      scheduleId,
      schedule.title,
      schedule.date,
      reason,
      targetPhotographerId || undefined,
      targetPhotographerId ? undefined : '전체 작가'
    )

    console.log('Shift swap request created:', request)
    
    toast.success(
      `교대 요청이 전송되었습니다. ${targetPhotographerId ? '해당 작가' : '전체 작가'}에게 알림이 발송됩니다.`
    )
  }

  const handleLeaveRequest = (startDate: string, endDate: string, reason: string) => {
    const leave = requestLeave(startDate, endDate, reason)
    console.log('Leave request created:', leave)
    
    toast.success('휴가 신청이 완료되었습니다. 관리자 승인을 기다려주세요.')
  }

  const openShiftSwapModal = () => {
    // Use the first upcoming schedule as default
    const upcomingSchedule = weekSchedule.find(s => s.status === 'upcoming')
    setSelectedScheduleForSwap(upcomingSchedule || null)
    setShiftSwapModalOpen(true)
  }

  return (
    <AdminLayout>
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <User className="h-8 w-8" />
              {currentUser.name}님의 일정
            </h1>
            <p className="text-muted-foreground mt-1">
              나의 스케줄과 가용성을 관리하세요
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => setLeaveModalOpen(true)}>
              <Calendar className="mr-2 h-4 w-4" />
              휴가 신청
            </Button>
            <Button variant="outline" onClick={openShiftSwapModal}>
              <Repeat className="mr-2 h-4 w-4" />
              교대 요청
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'day' | 'week')}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="day">오늘</TabsTrigger>
            <TabsTrigger value="week">이번 주</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-6">
            <MyDay
              schedule={todaySchedule}
              checklist={checklist}
              onChecklistToggle={handleChecklistToggle}
            />
          </TabsContent>

          <TabsContent value="week" className="mt-6">
            <MyWeek
              schedule={weekSchedule}
              availability={availability}
              onAvailabilityToggle={handleAvailabilityToggle}
            />
          </TabsContent>
        </Tabs>

        {/* Mobile Bottom Navigation - Hidden on desktop */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-white dark:bg-gray-900">
          <div className="grid grid-cols-4 gap-1 p-2">
            <button
              onClick={() => setActiveTab('day')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === 'day'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">오늘</span>
            </button>
            
            <button
              onClick={() => setActiveTab('week')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === 'week'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">주간</span>
            </button>
            
            <button
              onClick={() => setLeaveModalOpen(true)}
              className="flex flex-col items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">휴가</span>
            </button>
            
            <button
              onClick={openShiftSwapModal}
              className="flex flex-col items-center justify-center p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
            >
              <Repeat className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">교대</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ShiftSwapModal
        open={shiftSwapModalOpen}
        onOpenChange={setShiftSwapModalOpen}
        schedule={selectedScheduleForSwap}
        onSubmit={handleShiftSwapRequest}
      />

      <LeaveRequestModal
        open={leaveModalOpen}
        onOpenChange={setLeaveModalOpen}
        onSubmit={handleLeaveRequest}
      />
    </AdminLayout>
  )
}

