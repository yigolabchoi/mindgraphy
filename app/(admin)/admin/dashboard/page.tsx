'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DdayBadge } from '@/components/common/dday-badge'
import { DashboardKPISkeleton, ScheduleListSkeleton } from '@/components/common/loading-skeleton'
import { 
  calculateDashboardKPI, 
  getThisWeekSchedules,
  getUnreadNotificationsCount,
  type Schedule
} from '@/lib/mock/admin'
import { ROUTES } from '@/lib/constants'
import { 
  Calendar, 
  AlertTriangle, 
  UserX, 
  Image as ImageIcon,
  Bell,
  ArrowRight,
  User,
  MapPin
} from 'lucide-react'
import { cn } from '@/lib/utils'

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [kpi, setKpi] = useState({
    todaySchedules: 0,
    unassignedSchedules: 0,
    urgentDeadlines: 0,
    pendingProofs: 0
  })
  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setKpi(calculateDashboardKPI())
      setSchedules(getThisWeekSchedules())
      setUnreadCount(getUnreadNotificationsCount())
      setIsLoading(false)
    }, 800)
  }, [])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'unassigned': 'bg-red-100 text-red-800 border-red-200',
      'assigned': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'confirmed': 'bg-green-100 text-green-800 border-green-200',
      'completed': 'bg-blue-100 text-blue-800 border-blue-200',
      'cancelled': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'unassigned': '미배정',
      'assigned': '배정됨',
      'confirmed': '확정',
      'completed': '완료',
      'cancelled': '취소'
    }
    return labels[status] || status
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">운영 대시보드</h1>
            <p className="text-muted-foreground">
              오늘의 핵심 지표와 일정을 확인하세요
            </p>
          </div>
          <Link href={ROUTES.ADMIN_CALENDAR}>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              스케줄 캘린더로
            </Button>
          </Link>
        </div>

        {/* KPI Tiles */}
        {isLoading ? (
          <DashboardKPISkeleton />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Today's Schedules */}
            <Link href={`${ROUTES.ADMIN_CALENDAR}?date=today`}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">오늘 일정</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                      <div className="text-2xl font-bold">{kpi.todaySchedules}</div>
                      <p className="text-xs text-muted-foreground">
                        Today&apos;s shoots
                      </p>
                </CardContent>
              </Card>
            </Link>

            {/* Unassigned Schedules */}
            <Link href={`${ROUTES.ADMIN_CALENDAR}?photographer=unassigned`}>
              <Card className={cn(
                "cursor-pointer transition-shadow hover:shadow-md",
                kpi.unassignedSchedules > 0 && "border-red-200 bg-red-50"
              )}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">미배정 일정</CardTitle>
                  <UserX className={cn(
                    "h-4 w-4",
                    kpi.unassignedSchedules > 0 ? "text-red-600" : "text-muted-foreground"
                  )} />
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "text-2xl font-bold",
                    kpi.unassignedSchedules > 0 && "text-red-700"
                  )}>
                    {kpi.unassignedSchedules}
                  </div>
                  <p className={cn(
                    "text-xs",
                    kpi.unassignedSchedules > 0 ? "text-red-600" : "text-muted-foreground"
                  )}>
                    {kpi.unassignedSchedules > 0 ? "⚠️ 긴급 배정 필요" : "모두 배정됨"}
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Urgent Deadlines */}
            <Link href={`${ROUTES.ADMIN_PROJECTS}?sort=deadline`}>
              <Card className={cn(
                "cursor-pointer transition-shadow hover:shadow-md",
                kpi.urgentDeadlines > 0 && "border-orange-200 bg-orange-50"
              )}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">마감 임박</CardTitle>
                  <AlertTriangle className={cn(
                    "h-4 w-4",
                    kpi.urgentDeadlines > 0 ? "text-orange-600" : "text-muted-foreground"
                  )} />
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "text-2xl font-bold",
                    kpi.urgentDeadlines > 0 && "text-orange-700"
                  )}>
                    {kpi.urgentDeadlines}
                  </div>
                  <p className={cn(
                    "text-xs",
                    kpi.urgentDeadlines > 0 ? "text-orange-600" : "text-muted-foreground"
                  )}>
                    D-3 이내 일정
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Pending Proofs */}
            <Link href={`${ROUTES.ADMIN_PROJECTS}?status=proof_pending`}>
              <Card className="cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Proof 미완료</CardTitle>
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.pendingProofs}</div>
                  <p className="text-xs text-muted-foreground">
                    업로드 대기 중
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Link href={ROUTES.ADMIN_CALENDAR}>
            <Card className="hover:bg-zinc-50 transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white flex-shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">스케줄 캘린더</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      전체 일정 관리
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/notifications">
            <Card className="hover:bg-zinc-50 transition-colors cursor-pointer h-full relative">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white flex-shrink-0 relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">알림함</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {unreadCount > 0 ? `${unreadCount}개의 새 알림` : '모든 알림 확인됨'}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href={ROUTES.ADMIN_CALENDAR}>
            <Card className="hover:bg-zinc-50 transition-colors cursor-pointer h-full">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-900 text-white flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold">내 일정 (My)</h3>
                    <p className="text-sm text-muted-foreground truncate">
                      개인 스케줄 보기
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* This Week's Schedules */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>이번 주 일정 (상위 10개)</CardTitle>
              <Link href={ROUTES.ADMIN_CALENDAR}>
                <Button variant="outline" size="sm">
                  전체 보기
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <ScheduleListSkeleton />
            ) : schedules.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar className="mx-auto h-12 w-12 mb-3 opacity-50" />
                <p>이번 주 예정된 일정이 없습니다</p>
              </div>
            ) : (
              <div className="space-y-3">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-start gap-4 border-b pb-3 last:border-0 last:pb-0 hover:bg-zinc-50 -mx-2 px-2 py-2 rounded-lg transition-colors"
                    tabIndex={0}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        // Navigate to schedule detail
                        console.log('Navigate to schedule:', schedule.id)
                      }
                    }}
                  >
                    <div className="flex-1 space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{schedule.customerName}</h4>
                        <Badge className={cn(
                          "text-xs border",
                          getStatusColor(schedule.status)
                        )}>
                          {getStatusLabel(schedule.status)}
                        </Badge>
                        {schedule.daysUntil <= 3 && schedule.daysUntil >= 0 && (
                          <DdayBadge 
                            targetDate={schedule.date}
                            showIcon={false}
                            variant="outline"
                            className="text-orange-600 border-orange-200"
                          />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{schedule.date} {schedule.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[200px]">{schedule.location}</span>
                        </div>
                        {schedule.photographerName && (
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{schedule.photographerName}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      {schedule.daysUntil === 0 ? (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          오늘
                        </Badge>
                      ) : schedule.daysUntil === 1 ? (
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          내일
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          D-{schedule.daysUntil}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
