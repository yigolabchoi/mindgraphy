import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DdayBadge } from '@/components/common/dday-badge'
import type { ScheduleEvent } from '@/lib/mock/schedules'
import { getStatusLabel, getPackageLabel, getVenueTypeLabel } from '@/lib/mock/schedules'
import { ROUTES } from '@/lib/constants'
import {
  Phone,
  MapPin,
  Clock,
  User,
  Building2,
  Package,
  FileText,
  CheckSquare,
  ExternalLink,
  Navigation
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ScheduleDrawerProps {
  event: ScheduleEvent | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleDrawer({ event, open, onOpenChange }: ScheduleDrawerProps) {
  if (!event) return null

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      reserved: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      editing: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getTravelTimeBadge = () => {
    if (!event.travelTimeMinutes) return null
    
    const hours = Math.floor(event.travelTimeMinutes / 60)
    const minutes = event.travelTimeMinutes % 60
    
    let label = '이동시간: '
    if (hours > 0) label += `${hours}시간 `
    if (minutes > 0) label += `${minutes}분`
    
    return (
      <Badge variant="outline" className="text-xs">
        <Navigation className="mr-1 h-3 w-3" />
        {label}
      </Badge>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">
            {event.groomName} & {event.brideName}
          </SheetTitle>
          <SheetDescription>
            {event.venueName} · {event.ceremonyTime}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Status & Meta */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={cn("border", getStatusColor(event.status))}>
              {getStatusLabel(event.status)}
            </Badge>
            <DdayBadge targetDate={event.start.split('T')[0]} showIcon={false} />
            {getTravelTimeBadge()}
            <Badge variant="outline" className="text-xs">
              {getPackageLabel(event.packageType)}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${event.groomPhone}`}
              className="inline-flex"
            >
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                신랑 전화
              </Button>
            </a>
            <a
              href={`tel:${event.bridePhone}`}
              className="inline-flex"
            >
              <Button variant="outline" size="sm" className="w-full">
                <Phone className="mr-2 h-4 w-4" />
                신부 전화
              </Button>
            </a>
            <a
              href={`https://map.kakao.com/?q=${encodeURIComponent(event.venueAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button variant="outline" size="sm" className="w-full">
                <MapPin className="mr-2 h-4 w-4" />
                지도 보기
              </Button>
            </a>
            <Link href={ROUTES.CLIENT_PORTAL(event.clientPortalToken)}>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                고객 포털
              </Button>
            </Link>
          </div>

          {/* Client Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <User className="h-4 w-4" />
              고객 정보
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm bg-zinc-50 rounded-lg p-4">
              <div>
                <span className="text-muted-foreground">신랑:</span>
                <p className="font-medium">{event.groomName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">신부:</span>
                <p className="font-medium">{event.brideName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">신랑 연락처:</span>
                <p className="font-medium">{event.groomPhone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">신부 연락처:</span>
                <p className="font-medium">{event.bridePhone}</p>
              </div>
            </div>
          </div>

          {/* Venue Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              예식장 정보
            </h3>
            <div className="space-y-2 text-sm bg-zinc-50 rounded-lg p-4">
              <div>
                <span className="text-muted-foreground">예식장:</span>
                <p className="font-medium">{event.venueName}</p>
              </div>
              {event.ballroom && (
                <div>
                  <span className="text-muted-foreground">볼룸:</span>
                  <p className="font-medium">{event.ballroom}</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">주소:</span>
                <p className="font-medium">{event.venueAddress}</p>
              </div>
              {event.venuePhone && (
                <div>
                  <span className="text-muted-foreground">전화:</span>
                  <p className="font-medium">{event.venuePhone}</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">유형:</span>
                <p className="font-medium">{getVenueTypeLabel(event.venueType)}</p>
              </div>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              스케줄
            </h3>
            <div className="space-y-2 text-sm bg-zinc-50 rounded-lg p-4">
              <div>
                <span className="text-muted-foreground">예식 시간:</span>
                <p className="font-medium">{event.ceremonyTime}</p>
              </div>
              {event.makeupTime && (
                <div>
                  <span className="text-muted-foreground">메이크업:</span>
                  <p className="font-medium">{event.makeupTime} ({event.makeupLocation})</p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">촬영 시간:</span>
                <p className="font-medium">
                  {new Date(event.start).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })} 
                  {' - '}
                  {new Date(event.end).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Package & Options */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Package className="h-4 w-4" />
              패키지 & 옵션
            </h3>
            <div className="space-y-2 text-sm bg-zinc-50 rounded-lg p-4">
              <div>
                <span className="text-muted-foreground">패키지:</span>
                <p className="font-medium">{event.packageName}</p>
              </div>
              {event.options.length > 0 && (
                <div>
                  <span className="text-muted-foreground">옵션:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {event.options.map((option, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {option}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Assignment */}
          {event.photographerName && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <User className="h-4 w-4" />
                배정 정보
              </h3>
              <div className="text-sm bg-zinc-50 rounded-lg p-4">
                <span className="text-muted-foreground">사진작가:</span>
                <p className="font-medium">{event.photographerName}</p>
              </div>
            </div>
          )}

          {/* Special Requests */}
          {event.specialRequests && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                특이사항
              </h3>
              <div className="text-sm bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p>{event.specialRequests}</p>
              </div>
            </div>
          )}

          {/* Internal Notes */}
          {event.internalNotes && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                내부 메모
              </h3>
              <div className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p>{event.internalNotes}</p>
              </div>
            </div>
          )}

          {/* Checklist Placeholder */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              체크리스트
            </h3>
            <div className="space-y-2">
              {['장비 확인', '배터리 충전', '메모리카드 준비', '이동 경로 확인'].map((item, index) => (
                <label key={index} className="flex items-center gap-2 cursor-pointer hover:bg-zinc-50 p-2 rounded transition-colors">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button className="flex-1">
              일정 수정
            </Button>
            <Button variant="outline" className="flex-1">
              메모 추가
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

