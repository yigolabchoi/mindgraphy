'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Schedule } from '@/lib/mock/admin'
import { mockProjects, mockCustomers } from '@/lib/mock-data'
import { mockProducts } from '@/lib/mock/settings'
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Camera,
  Tag,
  Image as ImageIcon,
  Phone,
  Mail,
  Users as UsersIcon,
  Scissors,
  FileText,
  Package,
  AlertCircle,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ScheduleDetailDialogProps {
  schedule: Schedule | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const STATUS_CONFIG = {
  unassigned: { label: '미배정', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  assigned: { label: '배정 완료', color: 'bg-blue-100 text-blue-800 border-blue-200' },
  confirmed: { label: '확정', color: 'bg-green-100 text-green-800 border-green-200' },
  completed: { label: '완료', color: 'bg-zinc-100 text-zinc-800 border-zinc-200' },
  cancelled: { label: '취소', color: 'bg-red-100 text-red-800 border-red-200' },
}

const TYPE_CONFIG = {
  wedding: { label: '일반 웨딩', color: 'bg-zinc-100 text-zinc-800' },
  hanbok: { label: '한복 & 캐주얼', color: 'bg-purple-100 text-purple-800' },
  dress_shop: { label: '가봉 스냅', color: 'bg-pink-100 text-pink-800' },
  baby: { label: '돌스냅', color: 'bg-blue-100 text-blue-800' },
}

const PROOF_STATUS_CONFIG = {
  pending: { label: '대기중', color: 'bg-orange-100 text-orange-800' },
  ready: { label: '준비완료', color: 'bg-blue-100 text-blue-800' },
  selected: { label: '선택완료', color: 'bg-green-100 text-green-800' },
  completed: { label: '완료', color: 'bg-zinc-100 text-zinc-800' },
}

export function ScheduleDetailDialog({
  schedule,
  open,
  onOpenChange
}: ScheduleDetailDialogProps) {
  if (!schedule) return null

  // Find project and customer details
  const project = mockProjects.find(p => p.id === schedule.projectId)
  const customer = project ? mockCustomers.find(c => c.id === project.customerId) : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            일정 상세 정보
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Header Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="h-5 w-5 text-pink-500" />
              <h3 className="font-semibold text-xl">{schedule.customerName}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className={cn("border", STATUS_CONFIG[schedule.status].color)}>
                {STATUS_CONFIG[schedule.status].label}
              </Badge>
              <Badge className={TYPE_CONFIG[schedule.type].color}>
                {TYPE_CONFIG[schedule.type].label}
              </Badge>
              {schedule.daysUntil >= 0 && schedule.daysUntil <= 3 && (
                <Badge variant="outline" className="border-orange-500 text-orange-700">
                  {schedule.daysUntil === 0 ? '오늘' : schedule.daysUntil === 1 ? '내일' : `D-${schedule.daysUntil}`}
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="schedule">일정 정보</TabsTrigger>
              <TabsTrigger value="customer">고객 정보</TabsTrigger>
              <TabsTrigger value="details">상세 정보</TabsTrigger>
            </TabsList>

            {/* 일정 정보 탭 */}
            <TabsContent value="schedule" className="space-y-4 mt-4">
              <div className="grid gap-3">
                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">촬영 날짜</div>
                    <div className="font-medium">{schedule.date}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">촬영 시간</div>
                    <div className="font-medium">{schedule.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground mb-1">촬영 장소</div>
                    <div className="font-medium">{schedule.location}</div>
                  </div>
                </div>

                {schedule.photographerNames && schedule.photographerNames.length > 0 ? (
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <Camera className="h-4 w-4 mt-0.5 text-blue-600" />
                    <div className="flex-1">
                      <div className="text-sm text-blue-600 mb-1">담당 작가</div>
                      <div className="font-medium text-blue-900">{schedule.photographerNames.join(', ')}</div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertCircle className="h-4 w-4 mt-0.5 text-orange-600" />
                    <div className="flex-1">
                      <div className="text-sm text-orange-600 mb-1">담당 작가</div>
                      <div className="font-medium text-orange-900">미배정</div>
                    </div>
                  </div>
                )}

                {project?.makeupInfo && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Scissors className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">메이크업 정보</div>
                      <div className="font-medium">{project.makeupInfo}</div>
                    </div>
                  </div>
                )}

                {project?.projectType && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">상품 타입</div>
                      <div className="font-medium">
                        {project.projectType === 'wedding' ? '일반 웨딩' : 
                         project.projectType === 'hanbok' ? '한복 & 캐주얼' :
                         project.projectType === 'dress_shop' ? '가봉 스냅' :
                         project.projectType === 'baby' ? '돌스냅' : project.projectType}
                      </div>
                    </div>
                  </div>
                )}

                {project?.packageId && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Package className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">선택 패키지</div>
                      <div className="font-medium">
                        {mockProducts.find(p => p.id === project.packageId)?.name || project.packageId}
                      </div>
                    </div>
                  </div>
                )}

                {project?.optionIds && project.optionIds.length > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <Tag className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">선택 옵션</div>
                      <div className="font-medium">
                        {project.optionIds.map(optionId => 
                          mockProducts.find(p => p.id === optionId)?.name || optionId
                        ).join(', ')}
                      </div>
                    </div>
                  </div>
                )}

                {project?.referralSource && (
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <UsersIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">유입 경로</div>
                      <div className="font-medium">{project.referralSource}</div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* 고객 정보 탭 */}
            <TabsContent value="customer" className="space-y-4 mt-4">
              {customer ? (
                <div className="grid gap-3">
                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <UsersIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">신랑</div>
                      <div className="font-medium">{customer.groomName}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {customer.groomPhone && (
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">신랑 연락처</div>
                          <a 
                            href={`tel:${customer.groomPhone}`} 
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {customer.groomPhone}
                          </a>
                        </div>
                      </div>
                    )}

                    {customer.bridePhone && (
                      <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                        <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm text-muted-foreground mb-1">신부 연락처</div>
                          <a 
                            href={`tel:${customer.bridePhone}`}
                            className="font-medium text-blue-600 hover:underline"
                          >
                            {customer.bridePhone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="my-2" />

                  <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <UsersIcon className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground mb-1">신부</div>
                      <div className="font-medium">{customer.brideName}</div>
                    </div>
                  </div>

                  {customer.email && (
                    <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                      <Mail className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">이메일</div>
                        <a 
                          href={`mailto:${customer.email}`}
                          className="font-medium text-blue-600 hover:underline break-all"
                        >
                          {customer.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {customer.notes && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg col-span-full">
                      <div className="flex items-start gap-3">
                        <FileText className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-semibold text-yellow-900 mb-1">고객 메모</div>
                          <div className="text-sm text-yellow-800 whitespace-pre-wrap">{customer.notes}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>고객 정보를 불러올 수 없습니다</p>
                </div>
              )}
            </TabsContent>

            {/* 상세 정보 탭 */}
            <TabsContent value="details" className="space-y-4 mt-4">
              {project?.specialRequests && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-900 mb-1">특별 요청사항</div>
                      <div className="text-sm text-yellow-800">{project.specialRequests}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Proof Status */}
              {schedule.hasProof && schedule.proofStatus && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    <div className="font-semibold">시안 현황</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">시안 상태</span>
                    <Badge className={PROOF_STATUS_CONFIG[schedule.proofStatus].color}>
                      {PROOF_STATUS_CONFIG[schedule.proofStatus].label}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Project Progress */}
              {project && (
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div className="font-semibold">프로젝트 진행률</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all" 
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{project.progress}%</span>
                  </div>
                </div>
              )}

              {!project?.specialRequests && !schedule.hasProof && (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>추가 상세 정보가 없습니다</p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Footer Reference IDs */}
          <Separator />
          <div className="text-xs text-muted-foreground space-y-1">
            <div>프로젝트 ID: {schedule.projectId}</div>
            <div>일정 ID: {schedule.id}</div>
            {customer && <div>고객 ID: {customer.id}</div>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
