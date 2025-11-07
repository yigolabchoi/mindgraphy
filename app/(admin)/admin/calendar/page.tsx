'use client'

import { useState, useRef } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScheduleDrawer } from '@/components/calendar/schedule-drawer'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg, DateSelectArg, EventDropArg } from '@fullcalendar/core'
import { 
  mockScheduleEvents, 
  mockPhotographers,
  getStatusLabel,
  getVenueTypeLabel,
  getPackageLabel,
  checkConflicts,
  type ScheduleEvent,
  type ScheduleStatus,
  type VenueType,
  type PackageType
} from '@/lib/mock/schedules'
import { 
  Plus, 
  Filter as FilterIcon, 
  Calendar as CalendarIcon,
  Users,
  MapPin,
  Package,
  AlertTriangle,
  X
} from 'lucide-react'
// import { cn } from '@/lib/utils' // Unused for now

export default function CalendarPage() {
  const calendarRef = useRef<FullCalendar>(null)
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [view, setView] = useState<'month' | 'week' | 'day'>('month')
  const [events, setEvents] = useState<ScheduleEvent[]>(mockScheduleEvents)
  
  // Filters
  const [photographerFilter, setPhotographerFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<ScheduleStatus | 'all'>('all')
  const [venueFilter, setVenueFilter] = useState<VenueType | 'all'>('all')
  const [packageFilter, setPackageFilter] = useState<PackageType | 'all'>('all')
  
  // Conflict warning
  const [conflictWarning, setConflictWarning] = useState<{
    event: ScheduleEvent
    conflicts: ScheduleEvent[]
  } | null>(null)

  // Apply filters
  const filteredEvents = events.filter(event => {
    if (photographerFilter !== 'all' && event.photographerId !== photographerFilter) {
      return false
    }
    if (statusFilter !== 'all' && event.status !== statusFilter) {
      return false
    }
    if (venueFilter !== 'all' && event.venueType !== venueFilter) {
      return false
    }
    if (packageFilter !== 'all' && event.packageType !== packageFilter) {
      return false
    }
    return true
  })

  // Handle event click
  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id)
    if (event) {
      setSelectedEvent(event)
      setDrawerOpen(true)
    }
  }

  // Handle date select (for creating new event)
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    console.log('Date selected:', selectInfo)
    // TODO: Open drawer with new event form
  }

  // Handle event drop (drag & drop)
  const handleEventDrop = (dropInfo: EventDropArg) => {
    const eventId = dropInfo.event.id
    const newStart = dropInfo.event.start
    const newEnd = dropInfo.event.end

    if (!newStart || !newEnd) return

    // Update event in state (optimistic update)
    setEvents(prevEvents => 
      prevEvents.map(e => {
        if (e.id === eventId) {
          const updatedEvent = {
            ...e,
            start: newStart.toISOString(),
            end: newEnd.toISOString()
          }
          
          // Check for conflicts
          const conflicts = checkConflicts(updatedEvent)
          if (conflicts.length > 0) {
            setConflictWarning({
              event: updatedEvent,
              conflicts
            })
          }
          
          return updatedEvent
        }
        return e
      })
    )

    console.log('Event dropped:', {
      eventId,
      newStart,
      newEnd
    })
  }

  // Change view
  const changeView = (newView: 'month' | 'week' | 'day') => {
    setView(newView)
    const calendarApi = calendarRef.current?.getApi()
    if (calendarApi) {
      const viewMap = {
        month: 'dayGridMonth',
        week: 'timeGridWeek',
        day: 'timeGridDay'
      }
      calendarApi.changeView(viewMap[newView])
    }
  }

  // Clear all filters
  const clearFilters = () => {
    setPhotographerFilter('all')
    setStatusFilter('all')
    setVenueFilter('all')
    setPackageFilter('all')
  }

  const hasActiveFilters = photographerFilter !== 'all' || 
                          statusFilter !== 'all' || 
                          venueFilter !== 'all' || 
                          packageFilter !== 'all'

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">스케줄 캘린더</h1>
            <p className="text-muted-foreground">
              모든 촬영 일정을 관리하세요
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              내 일정
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              새 일정
            </Button>
          </div>
        </div>

        {/* Conflict Warning */}
        {conflictWarning && (
          <Card className="border-red-200 bg-red-50">
            <div className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">
                    일정 충돌 발생
                  </h3>
                  <p className="text-sm text-red-700 mb-2">
                    {conflictWarning.event.photographerName}님의 일정이 겹칩니다:
                  </p>
                  <ul className="space-y-1">
                    {conflictWarning.conflicts.map(conflict => (
                      <li key={conflict.id} className="text-sm text-red-700">
                        • {conflict.groomName} & {conflict.brideName} 
                        ({new Date(conflict.start).toLocaleString('ko-KR', { 
                          month: 'short', 
                          day: 'numeric', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })})
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConflictWarning(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <FilterIcon className="h-4 w-4" />
                필터
              </h3>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="mr-1 h-3 w-3" />
                  초기화
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Photographer Filter */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  사진작가
                </label>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={photographerFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPhotographerFilter('all')}
                  >
                    전체
                  </Button>
                  {mockPhotographers.map(photographer => (
                    <Button
                      key={photographer.id}
                      variant={photographerFilter === photographer.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPhotographerFilter(photographer.id)}
                    >
                      {photographer.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">상태</label>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setStatusFilter('all')}
                  >
                    전체
                  </Button>
                  {(['reserved', 'in_progress', 'editing', 'completed'] as ScheduleStatus[]).map(status => (
                    <Button
                      key={status}
                      variant={statusFilter === status ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter(status)}
                    >
                      {getStatusLabel(status)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Venue Filter */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  예식장 유형
                </label>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={venueFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setVenueFilter('all')}
                  >
                    전체
                  </Button>
                  {(['hotel', 'convention', 'outdoor', 'studio'] as VenueType[]).map(type => (
                    <Button
                      key={type}
                      variant={venueFilter === type ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setVenueFilter(type)}
                    >
                      {getVenueTypeLabel(type)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Package Filter */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  패키지
                </label>
                <div className="flex flex-wrap gap-1">
                  <Button
                    variant={packageFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setPackageFilter('all')}
                  >
                    전체
                  </Button>
                  {(['premium', 'standard', 'basic'] as PackageType[]).map(pkg => (
                    <Button
                      key={pkg}
                      variant={packageFilter === pkg ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPackageFilter(pkg)}
                    >
                      {getPackageLabel(pkg)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Filters Summary */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap pt-2 border-t">
                <span className="text-sm text-muted-foreground">적용된 필터:</span>
                {photographerFilter !== 'all' && (
                  <Badge variant="secondary">
                    사진작가: {mockPhotographers.find(p => p.id === photographerFilter)?.name}
                  </Badge>
                )}
                {statusFilter !== 'all' && (
                  <Badge variant="secondary">
                    상태: {getStatusLabel(statusFilter)}
                  </Badge>
                )}
                {venueFilter !== 'all' && (
                  <Badge variant="secondary">
                    예식장: {getVenueTypeLabel(venueFilter)}
                  </Badge>
                )}
                {packageFilter !== 'all' && (
                  <Badge variant="secondary">
                    패키지: {getPackageLabel(packageFilter)}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </Card>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-zinc-100 p-1 rounded-lg">
            <Button
              variant={view === 'month' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeView('month')}
            >
              월
            </Button>
            <Button
              variant={view === 'week' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeView('week')}
            >
              주
            </Button>
            <Button
              variant={view === 'day' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => changeView('day')}
            >
              일
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredEvents.length}개의 일정
          </div>
        </div>

        {/* Calendar */}
        <Card className="p-4">
          <style jsx global>{`
            .fc {
              font-family: inherit;
            }
            .fc .fc-button {
              background-color: #18181b;
              border-color: #18181b;
              color: white;
              text-transform: capitalize;
              font-size: 14px;
              padding: 6px 12px;
            }
            .fc .fc-button:hover {
              background-color: #27272a;
              border-color: #27272a;
            }
            .fc .fc-button-primary:not(:disabled).fc-button-active {
              background-color: #27272a;
              border-color: #27272a;
            }
            .fc .fc-toolbar-title {
              font-size: 1.25rem;
              font-weight: 600;
            }
            .fc-theme-standard td,
            .fc-theme-standard th {
              border-color: #e4e4e7;
            }
            .fc .fc-daygrid-day-number {
              padding: 8px;
            }
            .fc .fc-col-header-cell {
              background-color: #fafafa;
              font-weight: 600;
              font-size: 13px;
            }
            .fc .fc-daygrid-day.fc-day-today {
              background-color: #eff6ff;
            }
            .fc-event {
              cursor: pointer;
              border: none;
              font-size: 12px;
              padding: 2px 4px;
              margin-bottom: 2px;
            }
            .fc-event:hover {
              opacity: 0.9;
            }
            .fc-timegrid-slot {
              font-size: 12px;
            }
            .fc-timegrid-slot-label {
              color: #71717a;
            }
          `}</style>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: ''
            }}
            locale="ko"
            buttonText={{
              today: '오늘',
              month: '월',
              week: '주',
              day: '일'
            }}
            events={filteredEvents}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            eventClick={handleEventClick}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            eventDisplay="block"
            height="calc(100vh - 450px)"
            slotMinTime="08:00:00"
            slotMaxTime="22:00:00"
            allDaySlot={false}
            nowIndicator={true}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
          />
        </Card>

        {/* Legend */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 text-sm">상태 범례</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { status: 'reserved', label: '예약' },
              { status: 'in_progress', label: '진행중' },
              { status: 'editing', label: '보정중' },
              { status: 'completed', label: '완료' }
            ].map(({ status, label }) => {
              const event = mockScheduleEvents.find(e => e.status === status)
              return (
                <div key={status} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded"
                    style={{ backgroundColor: event?.backgroundColor }}
                  />
                  <span className="text-sm">{label}</span>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Schedule Drawer */}
      <ScheduleDrawer
        event={selectedEvent}
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      />
    </AdminLayout>
  )
}
