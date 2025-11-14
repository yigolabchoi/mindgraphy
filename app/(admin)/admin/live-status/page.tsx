'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { mockScheduleEvents, mockPhotographers } from '@/lib/mock/schedules'
import {
  Activity,
  Clock,
  User,
  MapPin,
  CheckCircle2,
  Play,
  Calendar as CalendarIcon,
  Users,
  UserCheck,
  Coffee,
  RefreshCw
} from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function LiveStatusPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Refresh page data
  const handleRefresh = () => {
    setIsRefreshing(true)
    toast.info('현황판을 새로고침하는 중...')
    // Simulate refresh animation
    setTimeout(() => {
      setIsRefreshing(false)
      window.location.reload()
    }, 500)
  }

  // Get today's schedules
  const today = format(new Date(), 'yyyy-MM-dd')
  const todaySchedules = mockScheduleEvents.filter(event => {
    const eventDate = format(new Date(event.start), 'yyyy-MM-dd')
    return eventDate === today
  })

  // Group by status
  const inProgressSchedules = todaySchedules.filter(s => s.status === 'in_progress')
  const upcomingSchedules = todaySchedules.filter(s => s.status === 'reserved')
  const completedSchedules = todaySchedules.filter(s => s.status === 'completed')

  // Find available photographers (no schedule today and status is 'available')
  const photographersWithSchedules = todaySchedules.flatMap(s => s.photographerIds || []).filter(Boolean)
  const availablePhotographers = mockPhotographers.filter(
    p => !photographersWithSchedules.includes(p.id) && p.availabilityStatus === 'available'
  )
  
  // Photographers on leave
  const photographersOnLeave = mockPhotographers.filter(
    p => p.availabilityStatus === 'on_leave'
  )

  const getPhotographerNames = (photographerIds?: string[]) => {
    if (!photographerIds || photographerIds.length === 0) return '미배정'
    return photographerIds
      .map(id => {
        const photographer = mockPhotographers.find(p => p.id === id)
        return photographer?.name || ''
      })
      .filter(Boolean)
      .join(', ')
  }

  const getPhotographerInitials = (photographerIds?: string[]) => {
    if (!photographerIds || photographerIds.length === 0) return '?'
    const names = getPhotographerNames(photographerIds).split(', ')
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return names.length.toString() // 여러 명일 경우 숫자로 표시
  }

  const getStatusColor = (status: string) => {
    const colors = {
      reserved: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-gray-100 text-gray-800 border-gray-200',
      editing: 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      reserved: '예정',
      in_progress: '진행중',
      completed: '완료',
      editing: '편집중'
    }
    return labels[status as keyof typeof labels] || status
  }

  return (
    <AdminLayout align="left">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
              <Activity className="h-8 w-8 text-green-600 animate-pulse" />
              실시간 현황판
            </h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              오늘의 촬영 현황을 실시간으로 확인하세요
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">
                  {format(currentTime, 'HH:mm:ss')}
                </div>
                <div className="text-xs text-muted-foreground">
                  {format(currentTime, 'yyyy년 M월 d일 (EEEE)', { locale: ko })}
                </div>
              </div>
            </div>
            <Button
              onClick={handleRefresh}
              size="icon"
              variant="outline"
              disabled={isRefreshing}
              className="h-12 w-12"
            >
              <RefreshCw className={cn("h-5 w-5", isRefreshing && "animate-spin")} />
              <span className="sr-only">새로고침</span>
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">전체 일정</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaySchedules.length}</div>
              <p className="text-xs text-muted-foreground">
                오늘 총 일정 수
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-green-200 bg-green-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">진행중</CardTitle>
              <Play className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">{inProgressSchedules.length}</div>
              <p className="text-xs text-green-600">
                현재 촬영중
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-blue-200 bg-blue-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">예정</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-700">{upcomingSchedules.length}</div>
              <p className="text-xs text-blue-600">
                대기중인 일정
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow border-gray-200 bg-gray-50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">완료</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">{completedSchedules.length}</div>
              <p className="text-xs text-gray-600">
                촬영 완료
              </p>
            </CardContent>
          </Card>
        </div>

        {/* In Progress */}
        {inProgressSchedules.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Play className="h-5 w-5 text-green-600" />
              진행중인 촬영
              <Badge className="bg-green-600 animate-pulse">{inProgressSchedules.length}</Badge>
            </h2>

            <div className="space-y-3">
              {inProgressSchedules.map((schedule) => (
                <Card key={schedule.id} className="border-2 border-green-500 shadow-lg bg-gradient-to-r from-green-50 to-white">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Left: Photographer(s) */}
                      <div className="flex items-center gap-3 md:w-48 flex-shrink-0">
                        <Avatar className="h-12 w-12 border-2 border-green-600">
                          <AvatarFallback className="bg-green-600 text-white font-bold">
                            {getPhotographerInitials(schedule.photographerIds)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{getPhotographerNames(schedule.photographerIds)}</div>
                          <Badge className={cn("text-xs pulse-badge", getStatusColor(schedule.status))}>
                            <Play className="mr-1 h-3 w-3" />
                            촬영중
                          </Badge>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden md:block h-12 w-px bg-gray-200" />

                      {/* Center: Schedule Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-lg">{schedule.groomName} & {schedule.brideName}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span className="font-mono">{format(new Date(schedule.start), 'HH:mm')} - {format(new Date(schedule.end), 'HH:mm')}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{schedule.venueName}</span>
                          </div>
                        </div>
                        {schedule.specialRequests && (
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                            💡 {schedule.specialRequests}
                          </div>
                        )}
                      </div>

                      {/* Right: Package Info */}
                      <div className="flex flex-col gap-1 md:w-32 text-sm">
                        <Badge variant="outline" className="text-xs">
                          {schedule.packageType}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingSchedules.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              예정된 촬영
              <Badge className="bg-blue-600">{upcomingSchedules.length}</Badge>
            </h2>

            <div className="space-y-2">
              {upcomingSchedules.map((schedule) => (
                <Card key={schedule.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      {/* Left: Time */}
                      <div className="flex items-center gap-3 md:w-40 flex-shrink-0">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 font-mono">
                            {format(new Date(schedule.start), 'HH:mm')}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(schedule.end), 'HH:mm')} 종료
                          </div>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="hidden md:block h-12 w-px bg-gray-200" />

                      {/* Center: Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{schedule.groomName} & {schedule.brideName}</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{schedule.venueName}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className="text-xs">
                              {schedule.packageType}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Right: Photographer(s) */}
                      <div className="flex items-center gap-2 md:w-36">
                        <Avatar className="h-10 w-10 border-2 border-blue-200">
                          <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                            {getPhotographerInitials(schedule.photographerIds)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <div className="font-medium">{getPhotographerNames(schedule.photographerIds)}</div>
                          <div className="text-xs text-muted-foreground">담당 작가</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {completedSchedules.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-gray-600" />
              완료된 촬영
              <Badge variant="outline">{completedSchedules.length}</Badge>
            </h2>

            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
              {completedSchedules.map((schedule) => (
                <Card key={schedule.id} className="opacity-75 hover:opacity-100 transition-opacity">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 bg-gray-600">
                        <AvatarFallback className="bg-gray-600 text-white text-xs">
                          {getPhotographerInitials(schedule.photographerIds)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">
                          {schedule.groomName} & {schedule.brideName}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {getPhotographerNames(schedule.photographerIds)}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{format(new Date(schedule.start), 'HH:mm')}</span>
                          <CheckCircle2 className="h-3 w-3 text-green-600" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Available Photographers */}
        {availablePhotographers.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-emerald-600" />
                촬영 가능한 작가
                <Badge className="bg-emerald-600">{availablePhotographers.length}</Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                오늘 일정이 없는 작가
              </p>
            </div>

            {/* 횡 스크롤 리스트 */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {availablePhotographers.map((photographer) => (
                  <Card 
                    key={photographer.id} 
                    className="border-2 border-emerald-200 bg-emerald-50/50 flex-shrink-0 w-[200px] snap-start hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <Avatar className="h-16 w-16" style={{ backgroundColor: photographer.color }}>
                          <AvatarFallback style={{ backgroundColor: photographer.color }} className="text-white text-2xl font-semibold">
                            {photographer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-base">{photographer.name}</div>
                          <div className="flex items-center justify-center gap-1 text-xs text-emerald-700 mt-1">
                            <CheckCircle2 className="h-3 w-3" />
                            <span>촬영 가능</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Photographers on Leave */}
        {photographersOnLeave.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Coffee className="h-5 w-5 text-amber-600" />
                휴가/휴무 작가
                <Badge variant="outline" className="border-amber-600 text-amber-700">{photographersOnLeave.length}</Badge>
              </h2>
              <p className="text-sm text-muted-foreground">
                현재 휴무중인 작가
              </p>
            </div>

            {/* 횡 스크롤 리스트 */}
            <div className="relative">
              <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {photographersOnLeave.map((photographer) => (
                  <Card 
                    key={photographer.id} 
                    className="border-amber-200 bg-amber-50/50 flex-shrink-0 w-[200px] snap-start hover:shadow-md transition-shadow opacity-75"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center gap-3 text-center">
                        <Avatar className="h-16 w-16" style={{ backgroundColor: photographer.color }}>
                          <AvatarFallback style={{ backgroundColor: photographer.color }} className="text-white text-2xl font-semibold">
                            {photographer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-base">{photographer.name}</div>
                          <div className="flex items-center justify-center gap-1 text-xs text-amber-700 mt-1">
                            <Coffee className="h-3 w-3" />
                            <span>휴무 중</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {todaySchedules.length === 0 && availablePhotographers.length === 0 && photographersOnLeave.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">오늘 일정이 없습니다</h3>
              <p className="text-sm text-muted-foreground">
                편안한 하루 보내세요!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse-border {
          0%, 100% {
            border-color: rgb(34 197 94);
          }
          50% {
            border-color: rgb(134 239 172);
          }
        }

        .pulse-badge {
          animation: pulse-border 2s ease-in-out infinite;
        }
      `}</style>
    </AdminLayout>
  )
}


