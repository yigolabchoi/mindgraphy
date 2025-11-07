'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Calendar, 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  FileText, 
  Image, 
  Edit, 
  Package, 
  Bell,
  BarChart3,
  Camera
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const navigation = [
  { name: '대시보드', href: '/back-office', icon: LayoutDashboard },
  { name: '스케줄 캘린더', href: '/back-office/calendar', icon: Calendar, badge: 5 },
  { name: '프로젝트', href: '/back-office/projects', icon: FolderKanban },
  { name: '고객 관리', href: '/back-office/customers', icon: Users },
  { name: '계약서', href: '/back-office/contracts', icon: FileText },
  { name: '사진작가', href: '/back-office/photographers', icon: Camera },
  { name: '사진 관리', href: '/back-office/photos', icon: Image },
  { name: '편집 큐', href: '/back-office/editing', icon: Edit, badge: 4 },
  { name: '배송 관리', href: '/back-office/delivery', icon: Package },
  { name: '알림', href: '/back-office/notifications', icon: Bell },
  { name: '분석', href: '/back-office/analytics', icon: BarChart3 },
]

export function BackOfficeNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-zinc-50">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/back-office" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm">
            M
          </div>
          <span className="text-lg font-semibold">MindGraphy</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/back-office' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-zinc-900 text-white'
                  : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>관리자</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-900 truncate">
              김관리자
            </p>
            <p className="text-xs text-zinc-500 truncate">
              admin@mindgraphy.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

