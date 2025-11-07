'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Image, Download, CreditCard } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants'

const getNavigation = (token: string) => [
  { name: '홈', href: ROUTES.CLIENT_PORTAL(token), icon: Home },
  { name: '계약서', href: ROUTES.CLIENT_CONTRACT(token), icon: FileText },
  { name: '프루프 갤러리', href: ROUTES.CLIENT_PROOF(token), icon: Image },
  { name: '다운로드', href: ROUTES.CLIENT_DOWNLOAD(token), icon: Download },
  { name: '결제 정보', href: ROUTES.CLIENT_PAYMENT(token), icon: CreditCard },
]

interface ClientPortalNavProps {
  token: string
}

export function ClientPortalNav({ token }: ClientPortalNavProps) {
  const pathname = usePathname()
  const navigation = getNavigation(token)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center px-4 max-w-7xl">
        {/* Logo */}
        <Link href={ROUTES.CLIENT_PORTAL(token)} className="flex items-center gap-2 mr-6 flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white font-bold text-sm">
            M
          </div>
          <span className="text-lg font-semibold hidden sm:inline-block">
            MindGraphy
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 flex-1 overflow-x-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-zinc-100 text-zinc-900'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="hidden md:inline">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* User Info */}
        <div className="ml-4 flex items-center gap-2 text-sm flex-shrink-0">
          <span className="hidden sm:inline text-zinc-600 truncate max-w-[200px]">
            홍길동 & 김영희
          </span>
        </div>
      </div>
    </header>
  )
}
