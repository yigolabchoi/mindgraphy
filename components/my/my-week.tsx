'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { MySchedule } from '@/lib/mock/me'
import {
  Calendar,
  Clock,
  MapPin,
  Camera,
  Tag
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

interface MyWeekProps {
  schedule: MySchedule[]
}

export function MyWeek({ schedule }: MyWeekProps) {
  const getProductTypeLabel = (type: string) => {
    const labels = {
      wedding: '일반 웨딩 촬영',
      hanbok: 'HANBOK & CASUAL',
      dress_shop: 'DRESS SHOP',
      baby: 'BABY 돌스냅'
    }
    return labels[type as keyof typeof labels] || type
  }

  const getProductTypeBadgeColor = (type: string) => {
    const colors = {
      wedding: 'bg-blue-100 text-blue-800 border-blue-200',
      hanbok: 'bg-purple-100 text-purple-800 border-purple-200',
      dress_shop: 'bg-pink-100 text-pink-800 border-pink-200',
      baby: 'bg-green-100 text-green-800 border-green-200'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Schedule List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          예정된 일정
        </h2>

        {schedule.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              예정된 일정이 없습니다
            </CardContent>
          </Card>
        ) : (
          schedule.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{item.groomName} & {item.brideName}</CardTitle>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={`text-xs ${getProductTypeBadgeColor(item.productType)}`}>
                        {getProductTypeLabel(item.productType)}
                      </Badge>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(item.date), 'M월 d일 (EEE)', { locale: ko })}
                      </p>
                    </div>
                  </div>
                  <Badge variant={item.status === 'upcoming' ? 'outline' : 'default'}>
                    {item.status === 'upcoming' ? '예정' : item.status === 'in_progress' ? '진행중' : '완료'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">
                    {item.startTime} - {item.endTime}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span>{item.productType === 'wedding' ? '예식' : '촬영'} {item.weddingTime}</span>
                </div>

                {item.venueName && (
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <span>{item.venueName}</span>
                  </div>
                )}

                {item.photographerNames && item.photographerNames.length > 0 && (
                  <div className="flex items-start gap-2 text-sm">
                    <Camera className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">담당 작가:</span>
                      <span className="text-muted-foreground">
                        {item.photographerNames.join(', ')}
                      </span>
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {item.photographerNames.length}명
                      </Badge>
                    </div>
                  </div>
                )}

                {item.referralSource && (
                  <div className="flex items-start gap-2 text-sm">
                    <Tag className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-muted-foreground">유입 경로:</span>
                      <span className="ml-2 font-medium">{item.referralSource}</span>
                    </div>
                  </div>
                )}

              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

