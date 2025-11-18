'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AdminLayout } from '@/components/layout/admin-layout'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'
import { Package, Database } from 'lucide-react'

const settingsTabs = [
  {
    name: '상품 관리',
    href: ROUTES.ADMIN_SETTINGS_PRODUCTS,
    icon: Package,
    description: '상품, 옵션, 정책 관리'
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
    <AdminLayout align="left">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">운영 설정</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            시스템 전반의 설정을 관리합니다
          </p>
        </div>

        {/* Tabs - Redesigned */}
        <div className="bg-zinc-100 rounded-lg p-1.5 inline-flex gap-1 animate-in fade-in slide-in-from-bottom duration-300">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.href
            const Icon = tab.icon

            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 whitespace-nowrap group',
                  isActive
                    ? 'bg-white text-zinc-900 shadow-sm scale-[1.02]'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/50'
                )}
              >
                <Icon className={cn(
                  "h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-zinc-900" : "text-zinc-500"
                )} />
                <div className="flex flex-col">
                  <span>{tab.name}</span>
                  <span className={cn(
                    "text-xs hidden lg:inline transition-colors",
                    isActive ? "text-zinc-600" : "text-zinc-500"
                  )}>
                    {tab.description}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Content */}
        <div>{children}</div>
      </div>
    </AdminLayout>
  )
}

