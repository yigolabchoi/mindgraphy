'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgressBar } from '@/components/common/progress-bar'
import { DdayBadge } from '@/components/common/dday-badge'
import { mockProjects, mockContracts, mockPayments } from '@/lib/mock-data'
import { mockProducts } from '@/lib/mock/settings'
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { 
  Phone, 
  Mail, 
  Calendar,
  MapPin,
  CreditCard,
  FileText,
  MessageSquare,
  TrendingUp,
  User,
  Heart,
  CheckCircle2,
  Clock,
  AlertCircle,
  CalendarCheck,
  Package,
  Tag,
  Users as UsersIcon
} from 'lucide-react'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface CustomerDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: any | null
}

export function CustomerDetailDialog({ 
  open, 
  onOpenChange, 
  customer 
}: CustomerDetailDialogProps) {
  if (!customer) return null

  const [confirmingSchedule, setConfirmingSchedule] = useState(false)

  // 고객의 프로젝트 가져오기
  const customerProjects = mockProjects.filter(p => p.customerId === customer.id)
  const customerContracts = mockContracts.filter(c => c.customerId === customer.id)
  const customerPayments = mockPayments.filter(p => 
    customerContracts.some(c => c.id === p.contractId)
  )

  // 통계 계산
  const totalRevenue = customerPayments.reduce((sum, p) => sum + p.amount, 0)
  const paidAmount = customerPayments
    .filter(p => p.paymentStatus === 'completed')
    .reduce((sum, p) => sum + p.amount, 0)
  const pendingAmount = customerPayments
    .filter(p => p.paymentStatus === 'pending')
    .reduce((sum, p) => sum + p.amount, 0)

  // 최신 프로젝트 (일정 미확정)
  const latestProject = customerProjects.find(p => 
    p.projectStatus === 'scheduled' || p.projectStatus === 'in_progress'
  ) || customerProjects[0]

  // 상품 타입 라벨
  const getProductTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'wedding': '일반 웨딩',
      'hanbok': '한복 & 캐주얼',
      'dress_shop': '가봉 스냅',
      'baby': '돌스냅',
    }
    return labels[type] || type
  }

  // 일정 확정 핸들러
  const handleConfirmSchedule = () => {
    setConfirmingSchedule(true)
    
    // 실제로는 API 호출하여 스케줄에 추가
    setTimeout(() => {
      toast.success('일정이 확정되었습니다', {
        description: `${customer.groomName} & ${customer.brideName}님의 촬영 일정이 캘린더에 추가되었습니다.`
      })
      setConfirmingSchedule(false)
      // onOpenChange(false) // 다이얼로그 닫기 (선택사항)
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="space-y-3">
            <DialogTitle className="text-2xl flex items-center gap-2">
              <User className="h-6 w-6" />
              {customer.groomName} & {customer.brideName}
            </DialogTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                고객 ID: {customer.id}
              </Badge>
              {customer.activeProjects > 0 && (
                <Badge className="bg-blue-600">
                  진행 중 {customer.activeProjects}건
                </Badge>
              )}
              {customer.completedProjects > 0 && (
                <Badge className="bg-green-600">
                  완료 {customer.completedProjects}건
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {customer.totalProjects}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">총 촬영 건수</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(paidAmount / 10000).toLocaleString('ko-KR')}만
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">총 결제금액</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {(pendingAmount / 10000).toLocaleString('ko-KR')}만
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">미수금</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {customer.latestProject 
                      ? formatDate(customer.latestProject.weddingDate)
                      : '-'
                    }
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">최근 촬영일</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue={latestProject && !latestProject.assignedPhotographerIds?.length ? "booking" : "projects"} className="w-full">
            <TabsList className={`grid w-full ${latestProject ? 'grid-cols-5' : 'grid-cols-4'}`}>
              {latestProject && (
                <TabsTrigger value="booking" className="flex items-center gap-1">
                  <CalendarCheck className="h-3 w-3" />
                  접수 정보
                  {!latestProject.assignedPhotographerIds?.length && (
                    <span className="ml-1 h-2 w-2 bg-orange-500 rounded-full animate-pulse" />
                  )}
                </TabsTrigger>
              )}
              <TabsTrigger value="projects">촬영 이력</TabsTrigger>
              <TabsTrigger value="contact">연락처</TabsTrigger>
              <TabsTrigger value="payment">결제 정보</TabsTrigger>
              <TabsTrigger value="notes">메모</TabsTrigger>
            </TabsList>

            {/* Booking Info Tab */}
            {latestProject && (
              <TabsContent value="booking" className="space-y-4 mt-4">
                <Card className={!latestProject.assignedPhotographerIds?.length ? "border-orange-200 bg-orange-50/30" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base flex items-center gap-2">
                        <CalendarCheck className="h-4 w-4" />
                        고객 접수 정보
                      </CardTitle>
                      {!latestProject.assignedPhotographerIds?.length && (
                        <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-300">
                          일정 미확정
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* 촬영 정보 */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-muted-foreground">촬영 정보</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">촬영일:</span>
                          <span className="font-medium">{formatDate(latestProject.weddingDate)} {latestProject.weddingTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">장소:</span>
                          <span className="font-medium">{latestProject.weddingVenue}</span>
                        </div>
                      </div>
                    </div>

                    {/* 상품 정보 */}
                    <div className="space-y-3 pt-3 border-t">
                      <h4 className="text-sm font-semibold text-muted-foreground">선택 상품</h4>
                      <div className="space-y-2">
                        {latestProject.projectType && (
                          <div className="flex items-center gap-2 text-sm">
                            <Tag className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">상품 타입:</span>
                            <Badge variant="outline" className={
                              latestProject.projectType === 'hanbok' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                              latestProject.projectType === 'dress_shop' ? 'bg-pink-50 text-pink-700 border-pink-200' :
                              latestProject.projectType === 'baby' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-zinc-50 text-zinc-700 border-zinc-200'
                            }>
                              {getProductTypeLabel(latestProject.projectType)}
                            </Badge>
                          </div>
                        )}
                        
                        {latestProject.packageId && (
                          <div className="flex items-center gap-2 text-sm">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">패키지:</span>
                            <span className="font-medium">
                              {mockProducts.find(p => p.id === latestProject.packageId)?.name || latestProject.packageId}
                            </span>
                          </div>
                        )}

                        {latestProject.optionIds && latestProject.optionIds.length > 0 && (
                          <div className="flex items-start gap-2 text-sm">
                            <Tag className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <span className="text-muted-foreground">옵션:</span>
                            <div className="flex flex-wrap gap-1">
                              {latestProject.optionIds.map((optionId: string) => {
                                const option = mockProducts.find(p => p.id === optionId)
                                return option ? (
                                  <Badge key={optionId} variant="secondary" className="text-xs">
                                    {option.name}
                                  </Badge>
                                ) : null
                              })}
                            </div>
                          </div>
                        )}

                        {latestProject.referralSource && (
                          <div className="flex items-center gap-2 text-sm">
                            <UsersIcon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">유입 경로:</span>
                            <span className="font-medium">{latestProject.referralSource}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 특별 요청사항 */}
                    {latestProject.specialRequests && (
                      <div className="space-y-2 pt-3 border-t">
                        <h4 className="text-sm font-semibold text-muted-foreground">특별 요청사항</h4>
                        <div className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
                          {latestProject.specialRequests}
                        </div>
                      </div>
                    )}

                    {/* 일정 확정 버튼 */}
                    {!latestProject.assignedPhotographerIds?.length && (
                      <div className="pt-4 border-t">
                        <Button 
                          onClick={handleConfirmSchedule} 
                          disabled={confirmingSchedule}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md"
                          size="lg"
                        >
                          <CalendarCheck className="mr-2 h-5 w-5" />
                          {confirmingSchedule ? '일정 확정 중...' : '일정 확정하기'}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center mt-2">
                          일정을 확정하면 촬영 캘린더에 자동으로 추가됩니다
                        </p>
                      </div>
                    )}

                    {latestProject.assignedPhotographerIds && latestProject.assignedPhotographerIds.length > 0 && (
                      <div className="pt-4 border-t bg-green-50 border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-green-700">
                          <CheckCircle2 className="h-5 w-5" />
                          <span className="font-semibold">일정이 확정되었습니다</span>
                        </div>
                        <p className="text-xs text-green-600 mt-1">
                          촬영 캘린더에서 일정을 확인하실 수 있습니다
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Projects Tab */}
            <TabsContent value="projects" className="space-y-4 mt-4">
              {customerProjects.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    촬영 이력이 없습니다
                  </CardContent>
                </Card>
              ) : (
                customerProjects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <h3 className="font-semibold text-lg">
                                {project.projectNumber}
                              </h3>
                              <Badge className={getStatusColor(project.projectStatus)}>
                                {getStatusLabel(project.projectStatus)}
                              </Badge>
                              <DdayBadge targetDate={project.weddingDate} showIcon={false} />
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                {formatDate(project.weddingDate)} {project.weddingTime}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {project.weddingVenue}
                              </div>
                            </div>

                            {/* 상품 정보 */}
                            <div className="mt-3 space-y-2">
                              {project.projectType && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Tag className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-muted-foreground">상품:</span>
                                  <Badge variant="outline" className="text-xs">
                                    {getProductTypeLabel(project.projectType)}
                                  </Badge>
                                </div>
                              )}
                              
                              {project.packageId && (
                                <div className="flex items-center gap-2 text-sm">
                                  <Package className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-muted-foreground">패키지:</span>
                                  <span className="font-medium text-xs">
                                    {mockProducts.find(p => p.id === project.packageId)?.name || project.packageId}
                                  </span>
                                </div>
                              )}

                              {project.optionIds && project.optionIds.length > 0 && (
                                <div className="flex items-start gap-2 text-sm">
                                  <Tag className="h-3 w-3 text-muted-foreground mt-0.5" />
                                  <span className="text-muted-foreground">옵션:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {project.optionIds.map((optionId: string) => {
                                      const option = mockProducts.find(p => p.id === optionId)
                                      return option ? (
                                        <Badge key={optionId} variant="secondary" className="text-xs">
                                          {option.name}
                                        </Badge>
                                      ) : null
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>

                            {project.specialRequests && (
                              <div className="mt-3 text-sm bg-blue-50 border border-blue-200 rounded-lg p-2">
                                <span className="text-muted-foreground">특별 요청: </span>
                                <span>{project.specialRequests}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <ProgressBar value={project.progress} showLabel />
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            {/* Contact Tab - 고객용 페이지 수집 정보와 동일 */}
            <TabsContent value="contact" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    고객 연락처 정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">신랑</div>
                      <div className="font-medium text-lg">{customer.groomName}</div>
                      {customer.groomPhone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{customer.groomPhone}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">신부</div>
                      <div className="font-medium text-lg">{customer.brideName}</div>
                      {customer.bridePhone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="font-medium">{customer.bridePhone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {customer.email && (
                    <div className="pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">이메일:</span>
                        <span className="font-medium">{customer.email}</span>
                      </div>
                    </div>
                  )}

                  {latestProject?.referralSource && (
                    <div className="pt-3 border-t">
                      <div className="flex items-center gap-2 text-sm">
                        <UsersIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">유입 경로:</span>
                        <span className="font-medium">{latestProject.referralSource}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Tab */}
            <TabsContent value="payment" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    결제 요약
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">총 계약금액</span>
                    <span className="font-bold text-lg">{(totalRevenue / 10000).toLocaleString('ko-KR')}만원</span>
                  </div>
                  <div className="flex justify-between items-center text-green-600">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      입금 완료
                    </span>
                    <span className="font-bold">{(paidAmount / 10000).toLocaleString('ko-KR')}만원</span>
                  </div>
                  <div className="flex justify-between items-center text-orange-600">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      미수금
                    </span>
                    <span className="font-bold">{(pendingAmount / 10000).toLocaleString('ko-KR')}만원</span>
                  </div>
                </CardContent>
              </Card>

              {customerPayments.length > 0 ? (
                customerPayments.map((payment) => {
                  const paymentTypeLabel = 
                    payment.paymentType === 'deposit' ? '계약금' : 
                    payment.paymentType === 'balance' ? '잔금' : 
                    payment.paymentType === 'additional' ? '추가 결제' : '환불'
                  
                  return (
                    <Card key={payment.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                              <span className="font-semibold">{paymentTypeLabel}</span>
                              <Badge variant={payment.paymentStatus === 'completed' ? 'default' : 'outline'} 
                                className={payment.paymentStatus === 'completed' ? 'bg-green-600' : 'text-orange-600 border-orange-300'}>
                                {payment.paymentStatus === 'completed' ? '입금완료' : 
                                 payment.paymentStatus === 'pending' ? '미입금' : 
                                 payment.paymentStatus === 'failed' ? '입금실패' : '환불'}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              결제수단: {payment.paymentMethod}
                            </div>
                            {payment.paymentDate && (
                              <div className="text-sm text-muted-foreground">
                                입금일: {formatDate(payment.paymentDate)}
                              </div>
                            )}
                            {payment.notes && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {payment.notes}
                              </div>
                            )}
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg">{(payment.amount / 10000).toLocaleString('ko-KR')}만원</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })
              ) : (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    결제 내역이 없습니다
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    고객 메모
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      고객 관련 메모나 특이사항을 기록할 수 있습니다.
                    </p>
                    <Button variant="outline" className="w-full">
                      메모 추가
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {customer.specialRequests && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      특별 요청사항
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
                      {customer.specialRequests}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

