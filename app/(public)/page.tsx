'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, ArrowRight, X, Clock, Calendar } from 'lucide-react'
import { ROUTES, DEMO_TOKEN } from '@/lib/constants'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'mindgraphy-last-portal'

type Portal = 'client' | 'admin' | null

export default function HomePage() {
  const [lastPortal, setLastPortal] = useState<Portal>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Load last choice from localStorage
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'client' || stored === 'admin') {
      setLastPortal(stored)
      setShowBanner(true)
    }
  }, [])

  const handlePortalClick = (portal: Portal) => {
    if (portal) {
      localStorage.setItem(STORAGE_KEY, portal)
    }
  }

  const getLastPortalUrl = () => {
    if (lastPortal === 'client') {
      return ROUTES.CLIENT_PORTAL(DEMO_TOKEN)
    }
    return ROUTES.ADMIN_DASHBOARD
  }

  const getLastPortalLabel = () => {
    return lastPortal === 'client' ? '고객용 페이지' : '내부 업무 시스템'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-16">
        {/* Continue Banner */}
        {showBanner && lastPortal && (
          <div className="mb-8 w-full max-w-4xl">
            <div className="relative overflow-hidden rounded-lg border border-blue-200 bg-blue-50 p-4">
              <button
                onClick={() => setShowBanner(false)}
                className="absolute top-2 right-2 rounded-full p-1 hover:bg-blue-100 transition-colors"
                aria-label="배너 닫기"
              >
                <X className="h-4 w-4 text-blue-700" />
              </button>
              <div className="flex items-start gap-3 pr-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 flex-shrink-0">
                  <Clock className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">
                    이전에 방문했던 곳으로 돌아가시겠어요?
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    마지막으로 <strong>{getLastPortalLabel()}</strong>을(를) 사용하셨습니다
                  </p>
                  <Link href={getLastPortalUrl()}>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      이어서 계속하기
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Logo & Brand */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-lg">
              <span className="text-2xl font-bold">M</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight">MindGraphy</h1>
          </div>
        </div>

        {/* Portal Selection Cards */}
        <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
          {/* Client Portal Card */}
          <Link 
            href={ROUTES.CLIENT_PORTAL(DEMO_TOKEN)}
            onClick={() => handlePortalClick('client')}
            data-branch="client"
            data-portal="client-portal"
            className="block group"
          >
            <Card className="h-full border-2 transition-all hover:border-zinc-900 hover:shadow-xl relative overflow-hidden cursor-pointer">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-zinc-100 opacity-50 transition-transform group-hover:scale-150" />
              <CardHeader className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 transition-all group-hover:bg-zinc-900 group-hover:text-white group-hover:scale-110">
                  <Users className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">고객용 페이지</CardTitle>
                <CardDescription className="text-base">
                  Client Portal
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  웨딩 고객님을 위한 전용 포털입니다. 계약부터 사진 선택, 최종 다운로드까지 모든 과정을 한 곳에서 관리하세요.
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">토큰 기반 안전한 접근</p>
                      <p className="text-xs text-muted-foreground">로그인 없이 개인 토큰으로 접속</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">프루프 갤러리 & 사진 선택</p>
                      <p className="text-xs text-muted-foreground">최대 50장까지 원하는 사진 선택</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">실시간 진행 상황 확인</p>
                      <p className="text-xs text-muted-foreground">D-Day부터 배송까지 모든 단계 추적</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className={cn(
                    "inline-flex items-center gap-2 font-semibold transition-all",
                    "group-hover:gap-3"
                  )}>
                    고객용 페이지 입장하기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-center text-muted-foreground">
                    💡 데모 토큰으로 체험해보세요
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Admin Portal Card */}
          <Link 
            href={ROUTES.ADMIN_DASHBOARD}
            onClick={() => handlePortalClick('admin')}
            data-branch="admin"
            data-portal="back-office"
            className="block group"
          >
            <Card className="h-full border-2 transition-all hover:border-zinc-900 hover:shadow-xl relative overflow-hidden cursor-pointer">
              <div className="absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-zinc-100 opacity-50 transition-transform group-hover:scale-150" />
              <CardHeader className="relative">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 transition-all group-hover:bg-zinc-900 group-hover:text-white group-hover:scale-110">
                  <Calendar className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl mb-2">내부 업무 시스템</CardTitle>
                <CardDescription className="text-base">
                  Back Office
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  사진작가, 편집자, 관리자를 위한 통합 업무 관리 시스템입니다. 스케줄부터 배송까지 전체 워크플로우를 관리하세요.
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">스케줄 캘린더</p>
                      <p className="text-xs text-muted-foreground">드래그 앤 드롭으로 일정 관리</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">프로젝트 & 고객 관리</p>
                      <p className="text-xs text-muted-foreground">CRM부터 계약까지 통합 관리</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-zinc-900 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">사진 편집 & 배송 관리</p>
                      <p className="text-xs text-muted-foreground">편집 큐부터 최종 배송까지</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className={cn(
                    "inline-flex items-center gap-2 font-semibold transition-all",
                    "group-hover:gap-3"
                  )}>
                    내부 시스템 입장하기
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-xs text-center text-muted-foreground">
                    🔐 프로토타입에서는 인증 없이 접속 가능
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
