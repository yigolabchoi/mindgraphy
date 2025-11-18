import type { UserRole } from '@/lib/types/auth'
import { 
  LayoutDashboard, 
  Calendar, 
  FolderOpen, 
  Settings,
  Camera,
  ClipboardList,
  Activity,
  Users,
  UserCircle,
  CalendarCheck,
  MessageSquare,
  type LucideIcon
} from 'lucide-react'

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: number
  roles: UserRole[] // 접근 가능한 권한
}

// 전체 네비게이션 아이템
export const navigationItems: NavItem[] = [
  // 관리자 전용
  {
    title: '대시보드',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    roles: ['admin'],
  },
  
  // 실시간 현황판
  {
    title: '실시간 현황판',
    href: '/admin/live-status',
    icon: Activity,
    roles: ['admin', 'photographer'],
  },
  
  // 공통 (권한에 따라 기능 차이)
  {
    title: '촬영 캘린더',
    href: '/admin/calendar',
    icon: Camera,
    roles: ['admin', 'photographer'],
  },
  
  // 관리자 전용
  {
    title: '일정 관리',
    href: '/admin/schedule',
    icon: CalendarCheck,
    roles: ['admin'],
  },
  
  // 작가 전용
  {
    title: '내 일정',
    href: '/admin/my',
    icon: ClipboardList,
    roles: ['photographer'],
  },
  
  // 관리자 전용
  {
    title: '촬영 관리',
    href: '/admin/projects',
    icon: FolderOpen,
    roles: ['admin'],
  },
  
  // 관리자 전용
  {
    title: '고객 관리',
    href: '/admin/customers',
    icon: UserCircle,
    roles: ['admin'],
  },
  
  {
    title: '팀 관리',
    href: '/admin/team',
    icon: Users,
    roles: ['admin'],
  },
  
  {
    title: '소통게시판',
    href: '/admin/board',
    icon: MessageSquare,
    roles: ['admin', 'photographer'],
  },
  
  {
    title: '설정',
    href: '/admin/settings',
    icon: Settings,
    roles: ['admin'],
  },
]

// 역할에 따른 네비게이션 필터링
export function getNavigationForRole(role: UserRole): NavItem[] {
  return navigationItems.filter((item) => item.roles.includes(role))
}

// 페이지 접근 권한 체크
export function hasPageAccess(path: string, role: UserRole): boolean {
  const item = navigationItems.find((item) => path.startsWith(item.href))
  
  // 네비게이션에 없는 경로는 일단 허용 (설정 하위 페이지 등)
  if (!item) {
    // 설정 페이지는 관리자만
    if (path.startsWith('/admin/settings')) {
      return role === 'admin'
    }
    return true
  }
  
  return item.roles.includes(role)
}

