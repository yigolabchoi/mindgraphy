'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'
import { Package, Bell, Database } from 'lucide-react'

const settingsTabs = [
  {
    name: '상품 관리',
    href: ROUTES.ADMIN_SETTINGS_PRODUCTS,
    icon: Package,
    description: '상품, 옵션, 정책 관리'
  },
  {
    name: '알림 관리',
    href: ROUTES.ADMIN_SETTINGS_NOTIFICATIONS,
    icon: Bell,
    description: '템플릿, 발송 스케줄'
  },
  {
    name: '마스터 데이터',
    href: ROUTES.ADMIN_SETTINGS_MASTERS,
    icon: Database,
    description: '장소, 파트너 정보'
  }
]

export default function SettingsLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">운영 설정</h1>
        <p className="text-muted-foreground">
          시스템 전반의 설정을 관리합니다
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.href
            const Icon = tab.icon

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex items-center gap-2 border-b-2 pb-4 text-sm font-medium transition-colors',
                  isActive
                    ? 'border-zinc-900 text-zinc-900 dark:border-zinc-100 dark:text-zinc-100'
                    : 'border-transparent text-muted-foreground hover:text-zinc-900 dark:hover:text-zinc-100'
                )}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col">
                  <span>{tab.name}</span>
                  <span className="text-xs text-muted-foreground hidden md:inline">
                    {tab.description}
                  </span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}

