'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MyDay } from '@/components/my/my-day'
import { MyWeek } from '@/components/my/my-week'
import { AvailabilityTab } from '@/components/my/availability-tab'
import {
  getTodaySchedule,
  getAllUpcomingSchedule,
  currentUser
} from '@/lib/mock/me'
import { Calendar, User, CheckSquare } from 'lucide-react'

export default function MyPage() {
  // State
  const [activeTab, setActiveTab] = useState<'day' | 'upcoming' | 'availability'>('day')
  const [todaySchedule, setTodaySchedule] = useState(getTodaySchedule())
  const [upcomingSchedule] = useState(getAllUpcomingSchedule())

  const handleStatusChange = (scheduleId: string, newStatus: 'in_progress' | 'completed') => {
    setTodaySchedule(prev =>
      prev.map(schedule =>
        schedule.id === scheduleId
          ? { ...schedule, status: newStatus }
          : schedule
      )
    )
  }

  return (
    <AdminLayout align="left">
      <div className="space-y-6 pb-20 md:pb-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <User className="h-8 w-8" />
              {currentUser.name}님의 일정
            </h1>
            <p className="text-muted-foreground mt-1">
              나의 스케줄과 일정을 관리하세요
            </p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'day' | 'upcoming' | 'availability')}>
          <TabsList className="grid w-full max-w-2xl grid-cols-3">
            <TabsTrigger value="day">오늘</TabsTrigger>
            <TabsTrigger value="upcoming">예정된 일정</TabsTrigger>
            <TabsTrigger value="availability">일정 관리</TabsTrigger>
          </TabsList>

          <TabsContent value="day" className="mt-6">
            <MyDay
              schedule={todaySchedule}
              onStatusChange={handleStatusChange}
            />
          </TabsContent>

          <TabsContent value="upcoming" className="mt-6">
            <MyWeek
              schedule={upcomingSchedule}
            />
          </TabsContent>

          <TabsContent value="availability" className="mt-6">
            <AvailabilityTab />
          </TabsContent>
        </Tabs>

        {/* Mobile Bottom Navigation - Hidden on desktop */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t bg-white dark:bg-gray-900">
          <div className="grid grid-cols-3 gap-1 p-2">
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
              onClick={() => setActiveTab('upcoming')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <Calendar className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">예정</span>
            </button>
            
            <button
              onClick={() => setActiveTab('availability')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                activeTab === 'availability'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              <CheckSquare className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">일정</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

