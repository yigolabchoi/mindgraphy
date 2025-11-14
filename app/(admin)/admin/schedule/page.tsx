'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { CreateScheduleEventDialog } from '@/components/schedule/create-schedule-event-dialog'
import { 
  CalendarCheck, 
  Plus, 
  Search,
  Clock,
  MapPin,
  Users as UsersIcon,
  Filter,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react'
import { 
  mockScheduleEvents,
  getTodayEvents,
  getUpcomingEvents,
  type ScheduleEvent,
  type ScheduleEventType,
  type ScheduleEventStatus
} from '@/lib/mock/schedule-events'
import { mockUsers } from '@/lib/mock-data'
import { formatDateWithWeekday } from '@/lib/utils'
import { format, startOfMonth, endOfMonth, addMonths, subMonths } from 'date-fns'
import { ko } from 'date-fns/locale'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { EventClickArg, EventContentArg } from '@fullcalendar/core'

const EVENT_TYPE_LABELS: Record<ScheduleEventType, string> = {
  'meeting': '미팅',
  'conference': '회의',
  'appointment': '약속',
  'vacation': '휴가',
  'training': '교육',
  'other': '기타',
}

const EVENT_STATUS_LABELS: Record<ScheduleEventStatus, string> = {
  'scheduled': '예정',
  'confirmed': '확정',
  'cancelled': '취소',
  'completed': '완료',
}

const EVENT_TYPE_COLORS: Record<ScheduleEventType, { bg: string, border: string, text: string }> = {
  'meeting': { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  'conference': { bg: '#e9d5ff', border: '#a855f7', text: '#6b21a8' },
  'appointment': { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  'vacation': { bg: '#fed7aa', border: '#f97316', text: '#9a3412' },
  'training': { bg: '#fce7f3', border: '#ec4899', text: '#9f1239' },
  'other': { bg: '#f3f4f6', border: '#9ca3af', text: '#4b5563' },
}

const EVENT_STATUS_COLORS: Record<ScheduleEventStatus, string> = {
  'scheduled': 'bg-yellow-100 text-yellow-800',
  'confirmed': 'bg-green-100 text-green-800',
  'cancelled': 'bg-red-100 text-red-800',
  'completed': 'bg-gray-100 text-gray-800',
}

type ViewType = 'month' | 'week' | 'day'

export default function SchedulePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<ScheduleEventType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<ScheduleEventStatus | 'all'>('all')
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [eventDetailOpen, setEventDetailOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewType, setViewType] = useState<ViewType>('month')
  
  // FullCalendar ref
  const [calendarApi, setCalendarApi] = useState<any>(null)
  
  useEffect(() => {
    if (calendarApi) {
      calendarApi.changeView(
        viewType === 'month' ? 'dayGridMonth' : 
        viewType === 'week' ? 'timeGridWeek' : 
        'timeGridDay'
      )
    }
  }, [viewType, calendarApi])
  
  // Convert schedule events to FullCalendar events
  const getCalendarEvents = () => {
    let events = [...mockScheduleEvents]
    
    // Apply type filter
    if (typeFilter !== 'all') {
      events = events.filter(e => e.type === typeFilter)
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      events = events.filter(e => e.status === statusFilter)
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      events = events.filter(event => 
        event.title.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query)
      )
    }
    
    return events.map(event => {
      const colors = EVENT_TYPE_COLORS[event.type]
      return {
        id: event.id,
        title: event.title,
        start: `${event.date}T${event.startTime}`,
        end: `${event.date}T${event.endTime}`,
        backgroundColor: colors.bg,
        borderColor: colors.border,
        textColor: colors.text,
        extendedProps: {
          originalEvent: event
        }
      }
    })
  }
  
  const calendarEvents = getCalendarEvents()
  
  // Statistics
  const todayCount = getTodayEvents().length
  const upcomingCount = getUpcomingEvents().length
  const confirmedCount = mockScheduleEvents.filter(e => e.status === 'confirmed').length
  
  const getUserName = (userId: string) => {
    const user = mockUsers.find(u => u.id === userId)
    return user ? `${user.lastName}${user.firstName}` : '알 수 없음'
  }
  
  const handleEventClick = (clickInfo: EventClickArg) => {
    const originalEvent = clickInfo.event.extendedProps.originalEvent as ScheduleEvent
    setSelectedEvent(originalEvent)
    setEventDetailOpen(true)
  }
  
  const handlePrevMonth = () => {
    if (calendarApi) {
      calendarApi.prev()
      setCurrentDate(calendarApi.getDate())
    }
  }
  
  const handleNextMonth = () => {
    if (calendarApi) {
      calendarApi.next()
      setCurrentDate(calendarApi.getDate())
    }
  }
  
  const handleToday = () => {
    if (calendarApi) {
      calendarApi.today()
      setCurrentDate(new Date())
    }
  }

  return (
    <AdminLayout align="left">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              <CalendarCheck className="h-8 w-8" />
              일정 관리
            </h1>
            <p className="text-muted-foreground mt-1">
              미팅, 회의, 교육 등 일반 일정을 관리하세요
            </p>
          </div>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => setCreateDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            새 일정 등록
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">오늘 일정</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayCount}</div>
              <p className="text-xs text-muted-foreground">
                오늘 예정된 일정
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">예정된 일정</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{upcomingCount}</div>
              <p className="text-xs text-muted-foreground">
                다가오는 일정
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">확정된 일정</CardTitle>
              <CalendarCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{confirmedCount}</div>
              <p className="text-xs text-muted-foreground">
                확정 완료
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 일정</CardTitle>
              <Filter className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockScheduleEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                총 등록된 일정
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and View Controls */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="일정 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="유형 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 유형</SelectItem>
                    <SelectItem value="meeting">미팅</SelectItem>
                    <SelectItem value="conference">회의</SelectItem>
                    <SelectItem value="appointment">약속</SelectItem>
                    <SelectItem value="vacation">휴가</SelectItem>
                    <SelectItem value="training">교육</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="상태 필터" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 상태</SelectItem>
                    <SelectItem value="scheduled">예정</SelectItem>
                    <SelectItem value="confirmed">확정</SelectItem>
                    <SelectItem value="cancelled">취소</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Calendar Navigation */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handlePrevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleToday}>
                    오늘
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleNextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <div className="text-lg font-semibold ml-2">
                    {format(currentDate, 'yyyy년 M월', { locale: ko })}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewType === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewType('month')}
                  >
                    월
                  </Button>
                  <Button
                    variant={viewType === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewType('week')}
                  >
                    주
                  </Button>
                  <Button
                    variant={viewType === 'day' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewType('day')}
                  >
                    일
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card>
          <CardContent className="pt-6">
            <FullCalendar
              ref={(ref) => {
                if (ref) setCalendarApi(ref.getApi())
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              locale="ko"
              height="auto"
              headerToolbar={false}
              events={calendarEvents}
              eventClick={handleEventClick}
              slotMinTime="06:00:00"
              slotMaxTime="22:00:00"
              allDaySlot={false}
              nowIndicator={true}
              slotDuration="01:00:00"
              eventContent={(arg: EventContentArg) => {
                const event = arg.event.extendedProps.originalEvent as ScheduleEvent
                return (
                  <div className="p-1 overflow-hidden">
                    <div className="font-medium text-xs truncate">
                      {arg.timeText && <span className="mr-1">{arg.timeText}</span>}
                      {arg.event.title}
                    </div>
                    {event.location && (
                      <div className="text-xs opacity-75 truncate">
                        {event.location}
                      </div>
                    )}
                  </div>
                )
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Create Schedule Event Dialog */}
      <CreateScheduleEventDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          // TODO: Refresh data after successful creation
        }}
      />
      
      {/* Event Detail Sheet */}
      <Sheet open={eventDetailOpen} onOpenChange={setEventDetailOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedEvent && (
            <>
              <SheetHeader>
                <SheetTitle className="text-xl">{selectedEvent.title}</SheetTitle>
                <SheetDescription className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className={EVENT_TYPE_COLORS[selectedEvent.type].bg}>
                    {EVENT_TYPE_LABELS[selectedEvent.type]}
                  </Badge>
                  <Badge className={EVENT_STATUS_COLORS[selectedEvent.status]}>
                    {EVENT_STATUS_LABELS[selectedEvent.status]}
                  </Badge>
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Date and Time */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="font-medium">일시</span>
                  </div>
                  <div className="ml-6">
                    <div className="font-medium">{formatDateWithWeekday(selectedEvent.date)}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </div>
                  </div>
                </div>

                {/* Location */}
                {selectedEvent.location && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="font-medium">장소</span>
                    </div>
                    <div className="ml-6">
                      <div>{selectedEvent.location}</div>
                    </div>
                  </div>
                )}

                {/* Attendees */}
                {selectedEvent.attendees.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <UsersIcon className="h-4 w-4" />
                      <span className="font-medium">참석자 ({selectedEvent.attendees.length}명)</span>
                    </div>
                    <div className="ml-6 space-y-2">
                      {selectedEvent.attendees.map((userId) => {
                        const user = mockUsers.find(u => u.id === userId)
                        return user ? (
                          <div key={userId} className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{user.lastName}{user.firstName}</span>
                            <Badge variant="outline" className="text-xs">
                              {user.role === 'admin' ? '관리자' : '작가'}
                            </Badge>
                          </div>
                        ) : null
                      })}
                    </div>
                  </div>
                )}

                {/* Description */}
                {selectedEvent.description && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground font-medium">설명</div>
                    <div className="ml-6 text-sm bg-muted p-3 rounded-md">
                      {selectedEvent.description}
                    </div>
                  </div>
                )}

                {/* Created Info */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="text-sm text-muted-foreground">
                    <div>생성일: {format(new Date(selectedEvent.createdAt), 'yyyy-MM-dd HH:mm')}</div>
                    {selectedEvent.createdBy && (
                      <div>생성자: {getUserName(selectedEvent.createdBy)}</div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    수정
                  </Button>
                  <Button variant="outline" className="flex-1">
                    삭제
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </AdminLayout>
  )
}
