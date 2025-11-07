import { addDays, subDays, format } from 'date-fns'

// Types for Admin-specific data
export interface Schedule {
  id: string
  projectId: string
  customerName: string
  date: string
  time: string
  location: string
  photographerId?: string
  photographerName?: string
  status: 'unassigned' | 'assigned' | 'confirmed' | 'completed' | 'cancelled'
  type: 'wedding' | 'pre_wedding' | 'studio'
  daysUntil: number
  hasProof: boolean
  proofStatus?: 'pending' | 'ready' | 'selected' | 'completed'
}

export interface Notification {
  id: string
  type: 'assignment' | 'deadline' | 'delivery' | 'proof' | 'urgent'
  title: string
  message: string
  relatedEntityType: 'schedule' | 'project' | 'customer' | 'proof'
  relatedEntityId: string
  relatedEntityName: string
  link?: string // Link to related page
  isRead: boolean
  createdAt: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
}

export interface DashboardKPI {
  todaySchedules: number
  unassignedSchedules: number
  urgentDeadlines: number // D-3 or less
  pendingProofs: number
}

// Generate mock schedules
const today = new Date()

export const mockSchedules: Schedule[] = [
  // Today's schedules
  {
    id: 'schedule-1',
    projectId: 'project-1',
    customerName: '홍길동 & 김영희',
    date: format(today, 'yyyy-MM-dd'),
    time: '14:00',
    location: '서울 그랜드 웨딩홀',
    photographerId: 'photo-1',
    photographerName: '박작가',
    status: 'confirmed',
    type: 'wedding',
    daysUntil: 0,
    hasProof: false,
    proofStatus: 'pending'
  },
  {
    id: 'schedule-2',
    projectId: 'project-2',
    customerName: '이철수 & 박민지',
    date: format(today, 'yyyy-MM-dd'),
    time: '11:00',
    location: '강남 스튜디오',
    photographerId: undefined,
    photographerName: undefined,
    status: 'unassigned',
    type: 'pre_wedding',
    daysUntil: 0,
    hasProof: false
  },
  // Tomorrow
  {
    id: 'schedule-3',
    projectId: 'project-3',
    customerName: '강민호 & 윤서연',
    date: format(addDays(today, 1), 'yyyy-MM-dd'),
    time: '13:00',
    location: '경기 럭셔리 컨벤션',
    photographerId: 'photo-2',
    photographerName: '최작가',
    status: 'confirmed',
    type: 'wedding',
    daysUntil: 1,
    hasProof: false,
    proofStatus: 'pending'
  },
  // D-2
  {
    id: 'schedule-4',
    projectId: 'project-4',
    customerName: '정우성 & 한가인',
    date: format(addDays(today, 2), 'yyyy-MM-dd'),
    time: '15:00',
    location: '제주 리조트',
    photographerId: undefined,
    photographerName: undefined,
    status: 'unassigned',
    type: 'pre_wedding',
    daysUntil: 2,
    hasProof: false
  },
  // D-3 (urgent)
  {
    id: 'schedule-5',
    projectId: 'project-5',
    customerName: '송중기 & 송혜교',
    date: format(addDays(today, 3), 'yyyy-MM-dd'),
    time: '10:00',
    location: '서울 신라호텔',
    photographerId: 'photo-1',
    photographerName: '박작가',
    status: 'assigned',
    type: 'wedding',
    daysUntil: 3,
    hasProof: false,
    proofStatus: 'pending'
  },
  // This week
  {
    id: 'schedule-6',
    projectId: 'project-6',
    customerName: '김수현 & 아이유',
    date: format(addDays(today, 4), 'yyyy-MM-dd'),
    time: '16:00',
    location: '인천 그랜드볼룸',
    photographerId: 'photo-2',
    photographerName: '최작가',
    status: 'confirmed',
    type: 'wedding',
    daysUntil: 4,
    hasProof: true,
    proofStatus: 'ready'
  },
  {
    id: 'schedule-7',
    projectId: 'project-7',
    customerName: '박서준 & 박보영',
    date: format(addDays(today, 5), 'yyyy-MM-dd'),
    time: '14:30',
    location: '부산 해운대',
    photographerId: 'photo-1',
    photographerName: '박작가',
    status: 'confirmed',
    type: 'pre_wedding',
    daysUntil: 5,
    hasProof: false
  },
  {
    id: 'schedule-8',
    projectId: 'project-8',
    customerName: '이민호 & 김고은',
    date: format(addDays(today, 6), 'yyyy-MM-dd'),
    time: '11:30',
    location: '서울 시청',
    photographerId: undefined,
    photographerName: undefined,
    status: 'unassigned',
    type: 'studio',
    daysUntil: 6,
    hasProof: false
  },
  // Past (completed)
  {
    id: 'schedule-9',
    projectId: 'project-9',
    customerName: '현빈 & 손예진',
    date: format(subDays(today, 2), 'yyyy-MM-dd'),
    time: '13:00',
    location: '강남 웨딩홀',
    photographerId: 'photo-1',
    photographerName: '박작가',
    status: 'completed',
    type: 'wedding',
    daysUntil: -2,
    hasProof: true,
    proofStatus: 'selected'
  },
  {
    id: 'schedule-10',
    projectId: 'project-10',
    customerName: '공유 & 정유미',
    date: format(subDays(today, 5), 'yyyy-MM-dd'),
    time: '15:00',
    location: '제주 섭지코지',
    photographerId: 'photo-2',
    photographerName: '최작가',
    status: 'completed',
    type: 'pre_wedding',
    daysUntil: -5,
    hasProof: true,
    proofStatus: 'completed'
  }
]

// Generate mock notifications
export const mockNotifications: Notification[] = [
  // Urgent - Unassigned
  {
    id: 'notif-1',
    type: 'assignment',
    title: '미배정 촬영 일정',
    message: '이철수 & 박민지 커플의 오늘 촬영이 아직 사진작가에게 배정되지 않았습니다.',
    relatedEntityType: 'schedule',
    relatedEntityId: 'schedule-2',
    relatedEntityName: '이철수 & 박민지',
    isRead: false,
    createdAt: new Date().toISOString(),
    priority: 'urgent'
  },
  {
    id: 'notif-2',
    type: 'assignment',
    title: '미배정 촬영 일정',
    message: '정우성 & 한가인 커플의 촬영(D-2)이 아직 배정되지 않았습니다.',
    relatedEntityType: 'schedule',
    relatedEntityId: 'schedule-4',
    relatedEntityName: '정우성 & 한가인',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30min ago
    priority: 'high'
  },
  // Deadline - D-3
  {
    id: 'notif-3',
    type: 'deadline',
    title: '촬영 임박 (D-3)',
    message: '송중기 & 송혜교 커플의 웨딩 촬영이 3일 남았습니다.',
    relatedEntityType: 'schedule',
    relatedEntityId: 'schedule-5',
    relatedEntityName: '송중기 & 송혜교',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
    priority: 'high'
  },
  // Deadline - D-1
  {
    id: 'notif-4',
    type: 'deadline',
    title: '촬영 임박 (D-1)',
    message: '강민호 & 윤서연 커플의 촬영이 내일입니다. 최종 확인 필요.',
    relatedEntityType: 'schedule',
    relatedEntityId: 'schedule-3',
    relatedEntityName: '강민호 & 윤서연',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5h ago
    priority: 'high'
  },
  // Proof ready
  {
    id: 'notif-5',
    type: 'proof',
    title: '프루프 사진 준비 완료',
    message: '김수현 & 아이유 커플의 프루프 사진이 업로드되었습니다.',
    relatedEntityType: 'proof',
    relatedEntityId: 'project-6',
    relatedEntityName: '김수현 & 아이유',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1d ago
    priority: 'normal'
  },
  // Delivery
  {
    id: 'notif-6',
    type: 'delivery',
    title: '배송 준비 완료',
    message: '현빈 & 손예진 커플의 최종 사진이 배송 준비되었습니다.',
    relatedEntityType: 'project',
    relatedEntityId: 'project-9',
    relatedEntityName: '현빈 & 손예진',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2d ago
    priority: 'normal'
  },
  // Proof pending - multiple
  {
    id: 'notif-7',
    type: 'proof',
    title: '프루프 대기 중',
    message: '홍길동 & 김영희 커플의 촬영이 완료되었습니다. 프루프 업로드를 진행해주세요.',
    relatedEntityType: 'project',
    relatedEntityId: 'project-1',
    relatedEntityName: '홍길동 & 김영희',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8h ago
    priority: 'normal'
  },
  {
    id: 'notif-8',
    type: 'proof',
    title: '프루프 대기 중',
    message: '송중기 & 송혜교 커플의 촬영이 예정되어 있습니다. 사전 준비 확인 필요.',
    relatedEntityType: 'project',
    relatedEntityId: 'project-5',
    relatedEntityName: '송중기 & 송혜교',
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12h ago
    priority: 'normal'
  },
  // Assignment confirmation
  {
    id: 'notif-9',
    type: 'assignment',
    title: '사진작가 배정 완료',
    message: '박서준 & 박보영 촬영에 박작가가 배정되었습니다.',
    relatedEntityType: 'schedule',
    relatedEntityId: 'schedule-7',
    relatedEntityName: '박서준 & 박보영',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3d ago
    priority: 'low'
  },
  // Delivery completed
  {
    id: 'notif-10',
    type: 'delivery',
    title: '배송 완료',
    message: '공유 & 정유미 커플의 최종 사진이 배송 완료되었습니다.',
    relatedEntityType: 'project',
    relatedEntityId: 'project-10',
    relatedEntityName: '공유 & 정유미',
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5d ago
    priority: 'low'
  }
]

// Calculate KPIs
export const calculateDashboardKPI = (): DashboardKPI => {
  const todaySchedules = mockSchedules.filter(s => s.daysUntil === 0 && s.status !== 'cancelled').length
  const unassignedSchedules = mockSchedules.filter(s => s.status === 'unassigned' && s.daysUntil >= 0).length
  const urgentDeadlines = mockSchedules.filter(s => s.daysUntil > 0 && s.daysUntil <= 3 && s.status !== 'cancelled').length
  const pendingProofs = mockSchedules.filter(s => s.hasProof === false && s.status === 'completed').length + 
                        mockSchedules.filter(s => s.proofStatus === 'pending').length

  return {
    todaySchedules,
    unassignedSchedules,
    urgentDeadlines,
    pendingProofs
  }
}

// Get this week's schedules (upcoming only)
export const getThisWeekSchedules = (): Schedule[] => {
  return mockSchedules
    .filter(s => s.daysUntil >= 0 && s.daysUntil <= 7)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 10)
}

// Get unread notifications count
export const getUnreadNotificationsCount = (): number => {
  return mockNotifications.filter(n => !n.isRead).length
}

// Filter notifications
export const filterNotifications = (
  notifications: Notification[],
  type?: string,
  readStatus?: string
): Notification[] => {
  let filtered = [...notifications]

  if (type && type !== 'all') {
    filtered = filtered.filter(n => n.type === type)
  }

  if (readStatus === 'unread') {
    filtered = filtered.filter(n => !n.isRead)
  } else if (readStatus === 'read') {
    filtered = filtered.filter(n => n.isRead)
  }

  return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

