'use client'

import { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import type { EventClickArg, DateSelectArg } from '@fullcalendar/core'
import type { CalendarEvent } from '@/lib/types'
import './calendar-styles.css'

interface CalendarViewProps {
  events: CalendarEvent[]
  onEventClick?: (event: CalendarEvent) => void
  onDateSelect?: (start: Date, end: Date) => void
}

export function CalendarView({ events, onEventClick, onDateSelect }: CalendarViewProps) {
  const calendarRef = useRef<FullCalendar>(null)

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id)
    if (event && onEventClick) {
      onEventClick(event)
    }
  }

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    if (onDateSelect) {
      onDateSelect(selectInfo.start, selectInfo.end)
    }
  }

  return (
    <div className="calendar-container">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        locale="ko"
        buttonText={{
          today: '오늘',
          month: '월',
          week: '주',
          day: '일'
        }}
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        eventClick={handleEventClick}
        select={handleDateSelect}
        eventDisplay="block"
        height="calc(100vh - 250px)"
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        allDaySlot={false}
        nowIndicator={true}
      />
    </div>
  )
}

