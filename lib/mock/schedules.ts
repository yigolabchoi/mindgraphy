import { addDays, subDays, format } from 'date-fns'

export type ScheduleStatus = 'reserved' | 'in_progress' | 'editing' | 'completed' | 'cancelled'
export type PackageType = 'premium' | 'standard' | 'basic'
export type VenueType = 'hotel' | 'convention' | 'outdoor' | 'studio'

export interface ScheduleEvent {
  id: string
  title: string
  start: string
  end: string
  
  // Client info
  groomName: string
  brideName: string
  groomPhone: string
  bridePhone: string
  contractId: string
  clientPortalToken: string
  
  // Venue info
  venueName: string
  venueType: VenueType
  ballroom?: string
  venueAddress: string
  venuePhone?: string
  
  // Schedule details
  ceremonyTime: string
  makeupTime?: string
  makeupLocation?: string
  
  // Assignment
  photographerId?: string
  photographerName?: string
  assistantIds?: string[]
  
  // Package & Options
  packageType: PackageType
  packageName: string
  options: string[]
  
  // Status & Meta
  status: ScheduleStatus
  specialRequests?: string
  internalNotes?: string
  travelTimeMinutes?: number
  
  // Colors for calendar
  backgroundColor: string
  borderColor: string
  textColor: string
}

export interface Photographer {
  id: string
  name: string
  color: string
  availabilityStatus: 'available' | 'busy' | 'on_leave'
}

// Photographers
export const mockPhotographers: Photographer[] = [
  {
    id: 'photo-1',
    name: '박작가',
    color: '#3b82f6', // blue
    availabilityStatus: 'available'
  },
  {
    id: 'photo-2',
    name: '최작가',
    color: '#8b5cf6', // purple
    availabilityStatus: 'available'
  },
  {
    id: 'photo-3',
    name: '김작가',
    color: '#10b981', // green
    availabilityStatus: 'busy'
  },
  {
    id: 'photo-4',
    name: '이작가',
    color: '#f59e0b', // amber
    availabilityStatus: 'on_leave'
  }
]

// Status color mapping
const statusColors: Record<ScheduleStatus, { backgroundColor: string; borderColor: string; textColor: string }> = {
  reserved: { backgroundColor: '#dbeafe', borderColor: '#3b82f6', textColor: '#1e40af' },
  in_progress: { backgroundColor: '#fef3c7', borderColor: '#f59e0b', textColor: '#92400e' },
  editing: { backgroundColor: '#e9d5ff', borderColor: '#a855f7', textColor: '#6b21a8' },
  completed: { backgroundColor: '#d1fae5', borderColor: '#10b981', textColor: '#065f46' },
  cancelled: { backgroundColor: '#f3f4f6', borderColor: '#9ca3af', textColor: '#4b5563' }
}

const today = new Date()

// Generate mock schedule events
export const mockScheduleEvents: ScheduleEvent[] = [
  // Today - Morning
  {
    id: 'schedule-1',
    title: '홍길동 & 김영희',
    start: `${format(today, 'yyyy-MM-dd')}T11:00:00`,
    end: `${format(today, 'yyyy-MM-dd')}T16:00:00`,
    groomName: '홍길동',
    brideName: '김영희',
    groomPhone: '010-1234-5678',
    bridePhone: '010-2345-6789',
    contractId: 'contract-001',
    clientPortalToken: 'token-001',
    venueName: '서울 그랜드 호텔',
    venueType: 'hotel',
    ballroom: '그랜드 볼룸 1관',
    venueAddress: '서울시 강남구 테헤란로 123',
    venuePhone: '02-1234-5678',
    ceremonyTime: '14:00',
    makeupTime: '11:00',
    makeupLocation: '호텔 내 뷰티살롱',
    photographerId: 'photo-1',
    photographerName: '박작가',
    assistantIds: [],
    packageType: 'premium',
    packageName: '프리미엄 웨딩 패키지',
    options: ['본식+스냅', '야외촬영', '드론촬영', '당일편집'],
    status: 'in_progress',
    specialRequests: '야외 정원에서 가족 단체 사진 촬영 희망',
    internalNotes: '날씨 확인 필요, 드론 배터리 2개 준비',
    travelTimeMinutes: 30,
    ...statusColors.in_progress
  },
  
  // Today - Afternoon
  {
    id: 'schedule-2',
    title: '이철수 & 박민지',
    start: `${format(today, 'yyyy-MM-dd')}T17:00:00`,
    end: `${format(today, 'yyyy-MM-dd')}T20:00:00`,
    groomName: '이철수',
    brideName: '박민지',
    groomPhone: '010-3333-4444',
    bridePhone: '010-5555-6666',
    contractId: 'contract-002',
    clientPortalToken: 'token-002',
    venueName: '코엑스 컨벤션',
    venueType: 'convention',
    ballroom: '3층 크리스탈 홀',
    venueAddress: '서울시 강남구 영동대로 513',
    venuePhone: '02-6000-0000',
    ceremonyTime: '17:30',
    photographerId: undefined,
    photographerName: undefined,
    packageType: 'standard',
    packageName: '스탠다드 웨딩 패키지',
    options: ['본식', '메이크업 촬영'],
    status: 'reserved',
    specialRequests: '하객 단체 사진 많이 촬영 요청',
    travelTimeMinutes: 45,
    ...statusColors.reserved
  },
  
  // Tomorrow
  {
    id: 'schedule-3',
    title: '강민수 & 윤서연',
    start: `${format(addDays(today, 1), 'yyyy-MM-dd')}T13:00:00`,
    end: `${format(addDays(today, 1), 'yyyy-MM-dd')}T18:00:00`,
    groomName: '강민수',
    brideName: '윤서연',
    groomPhone: '010-7777-8888',
    bridePhone: '010-9999-0000',
    contractId: 'contract-003',
    clientPortalToken: 'token-003',
    venueName: '인천 파라다이스 호텔',
    venueType: 'hotel',
    ballroom: '스카이 볼룸',
    venueAddress: '인천시 중구 공항로 424',
    venuePhone: '032-1111-2222',
    ceremonyTime: '15:00',
    makeupTime: '13:00',
    makeupLocation: '호텔 룸',
    photographerId: 'photo-2',
    photographerName: '최작가',
    packageType: 'premium',
    packageName: '프리미엄 웨딩 패키지',
    options: ['본식+스냅', '야외촬영', '부모님 메이크업'],
    status: 'reserved',
    travelTimeMinutes: 60,
    ...statusColors.reserved
  },
  
  // Day after tomorrow - Conflict example
  {
    id: 'schedule-4',
    title: '정우성 & 한가인',
    start: `${format(addDays(today, 2), 'yyyy-MM-dd')}T14:00:00`,
    end: `${format(addDays(today, 2), 'yyyy-MM-dd')}T18:00:00`,
    groomName: '정우성',
    brideName: '한가인',
    groomPhone: '010-1111-2222',
    bridePhone: '010-3333-4444',
    contractId: 'contract-004',
    clientPortalToken: 'token-004',
    venueName: '부산 해운대 그랜드 호텔',
    venueType: 'hotel',
    ballroom: '오션뷰 홀',
    venueAddress: '부산시 해운대구 우동',
    ceremonyTime: '16:00',
    photographerId: 'photo-1',
    photographerName: '박작가',
    packageType: 'premium',
    packageName: '프리미엄 웨딩 패키지',
    options: ['본식+스냅', '해변 촬영'],
    status: 'reserved',
    travelTimeMinutes: 240, // 4 hours to Busan
    ...statusColors.reserved
  },
  
  {
    id: 'schedule-5',
    title: '송중기 & 송혜교',
    start: `${format(addDays(today, 2), 'yyyy-MM-dd')}T16:00:00`,
    end: `${format(addDays(today, 2), 'yyyy-MM-dd')}T20:00:00`,
    groomName: '송중기',
    brideName: '송혜교',
    groomPhone: '010-5555-6666',
    bridePhone: '010-7777-8888',
    contractId: 'contract-005',
    clientPortalToken: 'token-005',
    venueName: '서울 신라호텔',
    venueType: 'hotel',
    ballroom: '다이너스티 홀',
    venueAddress: '서울시 중구 동호로 249',
    ceremonyTime: '18:00',
    photographerId: 'photo-1', // Same photographer - CONFLICT
    photographerName: '박작가',
    packageType: 'premium',
    packageName: '프리미엄 웨딩 패키지',
    options: ['본식+스냅', '야외촬영', '당일편집'],
    status: 'reserved',
    travelTimeMinutes: 30,
    ...statusColors.reserved
  },
  
  // This week - Various venues
  {
    id: 'schedule-6',
    title: '김수현 & 아이유',
    start: `${format(addDays(today, 3), 'yyyy-MM-dd')}T11:00:00`,
    end: `${format(addDays(today, 3), 'yyyy-MM-dd')}T15:00:00`,
    groomName: '김수현',
    brideName: '아이유',
    groomPhone: '010-1212-3434',
    bridePhone: '010-5656-7878',
    contractId: 'contract-006',
    clientPortalToken: 'token-006',
    venueName: '제주 신라호텔',
    venueType: 'outdoor',
    venueAddress: '제주시 조천읍',
    ceremonyTime: '13:00',
    photographerId: 'photo-3',
    photographerName: '김작가',
    packageType: 'premium',
    packageName: '프리미엄 야외 패키지',
    options: ['야외 본식', '해변 촬영', '드론촬영'],
    status: 'reserved',
    specialRequests: '일몰 타이밍 맞춰 촬영',
    travelTimeMinutes: 180,
    ...statusColors.reserved
  },
  
  {
    id: 'schedule-7',
    title: '박서준 & 박보영',
    start: `${format(addDays(today, 4), 'yyyy-MM-dd')}T10:00:00`,
    end: `${format(addDays(today, 4), 'yyyy-MM-dd')}T13:00:00`,
    groomName: '박서준',
    brideName: '박보영',
    groomPhone: '010-9999-1111',
    bridePhone: '010-2222-3333',
    contractId: 'contract-007',
    clientPortalToken: 'token-007',
    venueName: '강남 웨딩 스튜디오',
    venueType: 'studio',
    venueAddress: '서울시 강남구 논현로',
    ceremonyTime: '11:00',
    photographerId: 'photo-2',
    photographerName: '최작가',
    packageType: 'basic',
    packageName: '베이직 스튜디오 패키지',
    options: ['스튜디오 촬영'],
    status: 'in_progress',
    travelTimeMinutes: 20,
    ...statusColors.in_progress
  },
  
  // Past - Completed
  {
    id: 'schedule-8',
    title: '현빈 & 손예진',
    start: `${format(subDays(today, 3), 'yyyy-MM-dd')}T14:00:00`,
    end: `${format(subDays(today, 3), 'yyyy-MM-dd')}T18:00:00`,
    groomName: '현빈',
    brideName: '손예진',
    groomPhone: '010-4444-5555',
    bridePhone: '010-6666-7777',
    contractId: 'contract-008',
    clientPortalToken: 'token-008',
    venueName: '경기 아침고요수목원',
    venueType: 'outdoor',
    venueAddress: '경기도 가평군',
    ceremonyTime: '16:00',
    photographerId: 'photo-1',
    photographerName: '박작가',
    packageType: 'premium',
    packageName: '프리미엄 야외 패키지',
    options: ['야외 본식', '정원 촬영'],
    status: 'editing',
    travelTimeMinutes: 90,
    ...statusColors.editing
  },
  
  {
    id: 'schedule-9',
    title: '공유 & 정유미',
    start: `${format(subDays(today, 7), 'yyyy-MM-dd')}T13:00:00`,
    end: `${format(subDays(today, 7), 'yyyy-MM-dd')}T17:00:00`,
    groomName: '공유',
    brideName: '정유미',
    groomPhone: '010-8888-9999',
    bridePhone: '010-0000-1111',
    contractId: 'contract-009',
    clientPortalToken: 'token-009',
    venueName: '서울 웨스틴 조선호텔',
    venueType: 'hotel',
    ballroom: '그랜드 볼룸',
    venueAddress: '서울시 중구 소공로',
    ceremonyTime: '15:00',
    photographerId: 'photo-2',
    photographerName: '최작가',
    packageType: 'premium',
    packageName: '프리미엄 웨딩 패키지',
    options: ['본식+스냅', '야외촬영'],
    status: 'completed',
    travelTimeMinutes: 25,
    ...statusColors.completed
  }
]

// Helper functions
export const getPhotographerById = (id: string) => {
  return mockPhotographers.find(p => p.id === id)
}

export const getEventsByPhotographer = (photographerId: string) => {
  return mockScheduleEvents.filter(e => e.photographerId === photographerId)
}

export const getEventsByStatus = (status: ScheduleStatus) => {
  return mockScheduleEvents.filter(e => e.status === status)
}

export const getEventsByVenueType = (venueType: VenueType) => {
  return mockScheduleEvents.filter(e => e.venueType === venueType)
}

export const getEventsByPackage = (packageType: PackageType) => {
  return mockScheduleEvents.filter(e => e.packageType === packageType)
}

// Check for conflicts (same photographer, overlapping time)
export const checkConflicts = (event: ScheduleEvent): ScheduleEvent[] => {
  if (!event.photographerId) return []
  
  const eventStart = new Date(event.start)
  const eventEnd = new Date(event.end)
  
  return mockScheduleEvents.filter(e => {
    if (e.id === event.id) return false
    if (e.photographerId !== event.photographerId) return false
    
    const eStart = new Date(e.start)
    const eEnd = new Date(e.end)
    
    // Check if time ranges overlap
    return (eventStart < eEnd && eventEnd > eStart)
  })
}

// Get status label
export const getStatusLabel = (status: ScheduleStatus): string => {
  const labels: Record<ScheduleStatus, string> = {
    reserved: '예약',
    in_progress: '진행중',
    editing: '보정중',
    completed: '완료',
    cancelled: '취소'
  }
  return labels[status]
}

// Get package label
export const getPackageLabel = (packageType: PackageType): string => {
  const labels: Record<PackageType, string> = {
    premium: '프리미엄',
    standard: '스탠다드',
    basic: '베이직'
  }
  return labels[packageType]
}

// Get venue type label
export const getVenueTypeLabel = (venueType: VenueType): string => {
  const labels: Record<VenueType, string> = {
    hotel: '호텔',
    convention: '컨벤션',
    outdoor: '야외',
    studio: '스튜디오'
  }
  return labels[venueType]
}

