'use client'

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/common/empty-state'
import { NotificationListSkeleton } from '@/components/common/loading-skeleton'
import { mockNotifications, filterNotifications, type Notification } from '@/lib/mock/admin'
import { ROUTES } from '@/lib/constants'
import { 
  Bell, 
  BellOff,
  Circle,
  CheckCheck,
  Filter as FilterIcon,
  Calendar,
  User,
  Image as ImageIcon,
  Package,
  ArrowRight,
  AlertTriangle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

function NotificationsContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const [isLoading, setIsLoading] = useState(true)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  
  const typeFilter = searchParams.get('type') || 'all'
  const readFilter = searchParams.get('read') || 'all'

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      const filtered = filterNotifications(mockNotifications, typeFilter, readFilter)
      setNotifications(filtered)
      setIsLoading(false)
    }, 600)
  }, [typeFilter, readFilter])

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const toggleNotificationRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, isRead: !n.isRead } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, isRead: true }))
    )
    setSelectedIds(new Set())
  }

  const markSelectedAsRead = () => {
    setNotifications(prev => 
      prev.map(n => selectedIds.has(n.id) ? { ...n, isRead: true } : n)
    )
    setSelectedIds(new Set())
  }

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const selectAll = () => {
    if (selectedIds.size === notifications.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(notifications.map(n => n.id)))
    }
  }

  const getTypeIcon = (type: string) => {
    const icons = {
      assign: User,
      deadline: AlertTriangle,
      delivery: Package,
      proof: ImageIcon,
      urgent: Bell
    }
    return icons[type as keyof typeof icons] || Bell
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      assign: '배정',
      deadline: '마감',
      delivery: '배송',
      proof: '프루프',
      urgent: '긴급'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getTypeColor = (type: string) => {
    const colors = {
      assign: 'bg-blue-100 text-blue-700',
      deadline: 'bg-orange-100 text-orange-700',
      delivery: 'bg-green-100 text-green-700',
      proof: 'bg-purple-100 text-purple-700',
      urgent: 'bg-red-100 text-red-700'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700'
  }

  const getPriorityBadge = (priority: string) => {
    const config = {
      urgent: { label: '긴급', className: 'bg-red-500 text-white' },
      high: { label: '높음', className: 'bg-orange-500 text-white' },
      normal: { label: '보통', className: 'bg-blue-500 text-white' },
      low: { label: '낮음', className: 'bg-gray-400 text-white' }
    }
    return config[priority as keyof typeof config] || config.normal
  }

  const getRelatedEntityRoute = (notification: Notification) => {
    // Generate deep link based on notification type and entity
    switch (notification.relatedEntityType) {
      case 'schedule':
        if (notification.type === 'assignment') {
          // Unassigned schedules
          return `${ROUTES.ADMIN_CALENDAR}?photographer=unassigned`
        }
        // Link to calendar with schedule highlighted
        return `${ROUTES.ADMIN_CALENDAR}?schedule=${notification.relatedEntityId}`
      case 'project':
        if (notification.type === 'deadline') {
          // Urgent deadlines
          return `${ROUTES.ADMIN_PROJECTS}?sort=deadline`
        }
        if (notification.type === 'delivery') {
          // Delivery related
          return ROUTES.ADMIN_DELIVERY
        }
        // Link to specific project
        return `${ROUTES.ADMIN_PROJECTS}?id=${notification.relatedEntityId}`
      case 'proof':
        // Link to proof/editing queue
        return `${ROUTES.ADMIN_PROJECTS}?status=proof_pending`
      case 'customer':
        // Link to customer detail
        return `${ROUTES.ADMIN_CUSTOMERS}?id=${notification.relatedEntityId}`
      default:
        return ROUTES.ADMIN_DASHBOARD
    }
  }

  const unreadCount = notifications.filter(n => !n.isRead).length

  return (
    <AdminLayout align="left">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">알림함</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount}개의 읽지 않은 알림` : '모든 알림을 확인했습니다'}
            </p>
          </div>
          <div className="flex gap-2">
            {selectedIds.size > 0 ? (
              <>
                <Button variant="outline" size="sm" onClick={() => setSelectedIds(new Set())}>
                  선택 해제
                </Button>
                <Button size="sm" onClick={markSelectedAsRead}>
                  <CheckCheck className="mr-2 h-4 w-4" />
                  선택 항목 읽음 처리 ({selectedIds.size})
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                <CheckCheck className="mr-2 h-4 w-4" />
                모두 읽음 처리
              </Button>
            )}
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FilterIcon className="h-4 w-4" />
              필터
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Type Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">알림 유형</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={typeFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('type', 'all')}
                  >
                    전체
                  </Button>
                  <Button
                    variant={typeFilter === 'assign' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('type', 'assign')}
                  >
                    <User className="mr-1 h-3 w-3" />
                    배정
                  </Button>
                  <Button
                    variant={typeFilter === 'deadline' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('type', 'deadline')}
                  >
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    마감
                  </Button>
                  <Button
                    variant={typeFilter === 'delivery' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('type', 'delivery')}
                  >
                    <Package className="mr-1 h-3 w-3" />
                    배송
                  </Button>
                  <Button
                    variant={typeFilter === 'proof' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('type', 'proof')}
                  >
                    <ImageIcon className="mr-1 h-3 w-3" />
                    프루프
                  </Button>
                </div>
              </div>

              {/* Read Status Filter */}
              <div>
                <label className="text-sm font-medium mb-2 block">읽음 상태</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={readFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('read', 'all')}
                  >
                    전체
                  </Button>
                  <Button
                    variant={readFilter === 'unread' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('read', 'unread')}
                  >
                    <Bell className="mr-1 h-3 w-3" />
                    읽지 않음
                  </Button>
                  <Button
                    variant={readFilter === 'read' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => updateQueryParams('read', 'read')}
                  >
                    <BellOff className="mr-1 h-3 w-3" />
                    읽음
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {notifications.length > 0 && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={selectAll}
            >
              {selectedIds.size === notifications.length ? '전체 해제' : '전체 선택'}
            </Button>
            {selectedIds.size > 0 && (
              <span className="text-sm text-muted-foreground">
                {selectedIds.size}개 선택됨
              </span>
            )}
          </div>
        )}

        {/* Notifications List */}
        {isLoading ? (
          <NotificationListSkeleton />
        ) : notifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <EmptyState
                icon={Bell}
                title="알림이 없습니다"
                description={
                  typeFilter !== 'all' || readFilter !== 'all'
                    ? '선택한 필터에 해당하는 알림이 없습니다.'
                    : '새로운 알림이 도착하면 여기에 표시됩니다.'
                }
                action={
                  (typeFilter !== 'all' || readFilter !== 'all')
                    ? {
                        label: '필터 초기화',
                        onClick: () => router.push(pathname)
                      }
                    : undefined
                }
              />
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {notifications.map((notification, index) => {
              const TypeIcon = getTypeIcon(notification.type)
              const isSelected = selectedIds.has(notification.id)
              const priorityBadge = getPriorityBadge(notification.priority)
              
              return (
                <div
                  key={notification.id}
                  className={cn(
                    "flex items-start gap-3 p-4 border rounded-lg transition-all cursor-pointer",
                    !notification.isRead && "bg-blue-50 border-blue-200",
                    isSelected && "ring-2 ring-zinc-900",
                    "hover:shadow-md focus-within:ring-2 focus-within:ring-zinc-900"
                  )}
                  tabIndex={0}
                  role="article"
                  aria-label={`알림: ${notification.title}`}
                  onClick={() => {
                    router.push(getRelatedEntityRoute(notification))
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      router.push(getRelatedEntityRoute(notification))
                    } else if (e.key === ' ') {
                      e.preventDefault()
                      toggleSelection(notification.id)
                    }
                  }}
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(notification.id)}
                    className="mt-1 h-4 w-4 rounded border-gray-300 flex-shrink-0 cursor-pointer"
                    aria-label={`${notification.title} 선택`}
                  />

                  {/* Icon */}
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
                    getTypeColor(notification.type)
                  )}>
                    <TypeIcon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={cn(
                          "font-semibold text-sm",
                          !notification.isRead && "text-zinc-900"
                        )}>
                          {notification.title}
                        </h3>
                        <Badge className={cn("text-xs", getTypeColor(notification.type))}>
                          {getTypeLabel(notification.type)}
                        </Badge>
                        {(notification.priority === 'urgent' || notification.priority === 'high') && (
                          <Badge className={cn("text-xs", priorityBadge.className)}>
                            {priorityBadge.label}
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                          locale: ko
                        })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(getRelatedEntityRoute(notification))
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 hover:underline"
                      >
                        {notification.relatedEntityName} 보기
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>

                  {/* Read/Unread Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleNotificationRead(notification.id)
                    }}
                    className="flex-shrink-0 p-2 hover:bg-zinc-100 rounded transition-colors"
                    aria-label={notification.isRead ? '읽지 않음으로 표시' : '읽음으로 표시'}
                  >
                    {notification.isRead ? (
                      <BellOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Circle className="h-4 w-4 text-blue-600 fill-blue-600" />
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default function NotificationsPage() {
  return (
    <Suspense fallback={<AdminLayout><NotificationListSkeleton /></AdminLayout>}>
      <NotificationsContent />
    </Suspense>
  )
}
