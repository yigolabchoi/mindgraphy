import { addDays, subDays, format, startOfWeek, addWeeks } from 'date-fns'
import type { ScheduleEvent } from './schedules'

export interface MySchedule {
  id: string
  eventId: string
  date: string
  startTime: string
  endTime: string
  title: string
  venueName: string
  venueAddress: string
  ceremonyTime: string
  packageType: string
  options: string[]
  groomPhone: string
  bridePhone: string
  travelTimeMinutes: number
  status: 'upcoming' | 'in_progress' | 'completed'
  checklistCompleted: number
  checklistTotal: number
  specialRequests?: string
}

export interface WeeklyAvailability {
  date: string // YYYY-MM-DD
  dayOfWeek: number // 0 = Sunday, 6 = Saturday
  slots: {
    morning: boolean // 09:00 - 13:00
    afternoon: boolean // 13:00 - 18:00
    evening: boolean // 18:00 - 22:00
  }
  status: 'available' | 'booked' | 'leave' | 'requested_swap'
  note?: string
}

export interface ChecklistItem {
  id: string
  text: string
  completed: boolean
  category: 'equipment' | 'preparation' | 'travel' | 'post'
}

export interface ShiftSwapRequest {
  id: string
  scheduleId: string
  scheduleName: string
  date: string
  reason: string
  targetPhotographerId?: string
  targetPhotographerName?: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

// Current user (photographer)
export const currentUser = {
  id: 'photo-1',
  name: '박작가',
  role: 'photographer',
  email: 'park.photographer@mindgraphy.com',
  phone: '010-1234-5678'
}

const today = new Date()

// My Today's Schedule
export const getTodaySchedule = (): MySchedule[] => {
  return [
    {
      id: 'my-schedule-1',
      eventId: 'schedule-1',
      date: format(today, 'yyyy-MM-dd'),
      startTime: '11:00',
      endTime: '16:00',
      title: '홍길동 & 김영희',
      venueName: '서울 그랜드 호텔',
      venueAddress: '서울시 강남구 테헤란로 123',
      ceremonyTime: '14:00',
      packageType: '프리미엄',
      options: ['본식+스냅', '야외촬영', '드론촬영', '당일편집'],
      groomPhone: '010-1234-5678',
      bridePhone: '010-2345-6789',
      travelTimeMinutes: 30,
      status: 'in_progress',
      checklistCompleted: 3,
      checklistTotal: 5,
      specialRequests: '야외 정원에서 가족 단체 사진 촬영 희망'
    }
  ]
}

// My Week's Schedule
export const getWeekSchedule = (): MySchedule[] => {
  return [
    // Today
    {
      id: 'my-schedule-1',
      eventId: 'schedule-1',
      date: format(today, 'yyyy-MM-dd'),
      startTime: '11:00',
      endTime: '16:00',
      title: '홍길동 & 김영희',
      venueName: '서울 그랜드 호텔',
      venueAddress: '서울시 강남구 테헤란로 123',
      ceremonyTime: '14:00',
      packageType: '프리미엄',
      options: ['본식+스냅', '야외촬영', '드론촬영'],
      groomPhone: '010-1234-5678',
      bridePhone: '010-2345-6789',
      travelTimeMinutes: 30,
      status: 'in_progress',
      checklistCompleted: 3,
      checklistTotal: 5
    },
    // Day after tomorrow
    {
      id: 'my-schedule-2',
      eventId: 'schedule-4',
      date: format(addDays(today, 2), 'yyyy-MM-dd'),
      startTime: '14:00',
      endTime: '18:00',
      title: '정우성 & 한가인',
      venueName: '부산 해운대 그랜드 호텔',
      venueAddress: '부산시 해운대구 우동',
      ceremonyTime: '16:00',
      packageType: '프리미엄',
      options: ['본식+스냅', '해변 촬영'],
      groomPhone: '010-1111-2222',
      bridePhone: '010-3333-4444',
      travelTimeMinutes: 240, // 4 hours to Busan
      status: 'upcoming',
      checklistCompleted: 0,
      checklistTotal: 5,
      specialRequests: '부산 출장 - 전날 출발 필요'
    },
    // 3 days later
    {
      id: 'my-schedule-3',
      eventId: 'schedule-6',
      date: format(addDays(today, 5), 'yyyy-MM-dd'),
      startTime: '13:00',
      endTime: '18:00',
      title: '최민수 & 한예슬',
      venueName: '제이드가든',
      venueAddress: '경기도 가평군',
      ceremonyTime: '15:00',
      packageType: '스탠다드',
      options: ['본식', '야외 촬영'],
      groomPhone: '010-5555-6666',
      bridePhone: '010-7777-8888',
      travelTimeMinutes: 90,
      status: 'upcoming',
      checklistCompleted: 0,
      checklistTotal: 5
    }
  ]
}

// Weekly Availability (Next 2 weeks)
export const getWeeklyAvailability = (): WeeklyAvailability[] => {
  const availability: WeeklyAvailability[] = []
  const startDate = startOfWeek(today, { weekStartsOn: 0 }) // Sunday

  for (let week = 0; week < 2; week++) {
    for (let day = 0; day < 7; day++) {
      const date = addDays(addWeeks(startDate, week), day)
      const dateStr = format(date, 'yyyy-MM-dd')
      
      // Check if there's a schedule on this day
      const hasSchedule = getWeekSchedule().some(s => s.date === dateStr)
      
      availability.push({
        date: dateStr,
        dayOfWeek: day,
        slots: {
          morning: !hasSchedule,
          afternoon: !hasSchedule,
          evening: true
        },
        status: hasSchedule ? 'booked' : 'available',
        note: hasSchedule ? '촬영 예정' : undefined
      })
    }
  }

  return availability
}

// My Checklist
export const getMyChecklist = (): ChecklistItem[] => {
  return [
    {
      id: 'check-1',
      text: '카메라 배터리 완충 (본체 3개)',
      completed: true,
      category: 'equipment'
    },
    {
      id: 'check-2',
      text: '메모리 카드 포맷 및 여유 공간 확인',
      completed: true,
      category: 'equipment'
    },
    {
      id: 'check-3',
      text: '렌즈 청소 (24-70mm, 70-200mm)',
      completed: true,
      category: 'equipment'
    },
    {
      id: 'check-4',
      text: '플래시 배터리 확인',
      completed: false,
      category: 'equipment'
    },
    {
      id: 'check-5',
      text: '드론 배터리 2개 충전',
      completed: false,
      category: 'equipment'
    },
    {
      id: 'check-6',
      text: '이동 경로 확인 (네비게이션)',
      completed: true,
      category: 'travel'
    },
    {
      id: 'check-7',
      text: '예식장 주차 정보 확인',
      completed: false,
      category: 'travel'
    },
    {
      id: 'check-8',
      text: '고객 연락처 저장',
      completed: true,
      category: 'preparation'
    },
    {
      id: 'check-9',
      text: '특이사항 메모 확인',
      completed: true,
      category: 'preparation'
    },
    {
      id: 'check-10',
      text: '날씨 확인 (야외 촬영)',
      completed: false,
      category: 'preparation'
    }
  ]
}

// Shift Swap Requests
export const getShiftSwapRequests = (): ShiftSwapRequest[] => {
  return [
    {
      id: 'swap-1',
      scheduleId: 'schedule-4',
      scheduleName: '정우성 & 한가인 (부산)',
      date: format(addDays(today, 2), 'yyyy-MM-dd'),
      reason: '개인 사정으로 부산 출장이 어렵습니다.',
      targetPhotographerId: 'photo-2',
      targetPhotographerName: '최작가',
      status: 'pending',
      createdAt: format(subDays(today, 1), 'yyyy-MM-dd HH:mm:ss')
    }
  ]
}

// Helper: Toggle checklist item
export const toggleChecklistItem = (id: string, items: ChecklistItem[]): ChecklistItem[] => {
  return items.map(item => 
    item.id === id ? { ...item, completed: !item.completed } : item
  )
}

// Helper: Update availability slot
export const updateAvailabilitySlot = (
  date: string,
  slot: 'morning' | 'afternoon' | 'evening',
  value: boolean,
  availability: WeeklyAvailability[]
): WeeklyAvailability[] => {
  return availability.map(day => {
    if (day.date === date) {
      return {
        ...day,
        slots: {
          ...day.slots,
          [slot]: value
        }
      }
    }
    return day
  })
}

// Helper: Create shift swap request
export const createShiftSwapRequest = (
  scheduleId: string,
  scheduleName: string,
  date: string,
  reason: string,
  targetPhotographerId?: string,
  targetPhotographerName?: string
): ShiftSwapRequest => {
  return {
    id: `swap-${Date.now()}`,
    scheduleId,
    scheduleName,
    date,
    reason,
    targetPhotographerId,
    targetPhotographerName,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
}

// Helper: Request leave
export const requestLeave = (
  startDate: string,
  endDate: string,
  reason: string
) => {
  return {
    id: `leave-${Date.now()}`,
    startDate,
    endDate,
    reason,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
}

