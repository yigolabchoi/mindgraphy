'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProgressBar } from '@/components/common/progress-bar'
import { DdayBadge } from '@/components/common/dday-badge'
import { mockProjects } from '@/lib/mock-data'
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils'
import {
  ArrowLeft,
  User,
  Calendar,
  MapPin,
  Clock,
  Phone,
  Mail,
  FileText,
  Camera,
  Edit,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const project = mockProjects.find(p => p.id === id)

  if (!project) {
    return (
      <AdminLayout align="left">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">촬영을 찾을 수 없습니다</h2>
          <p className="text-muted-foreground mb-4">요청하신 촬영 정보가 존재하지 않습니다</p>
          <Button onClick={() => router.push('/admin/projects')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            촬영 목록으로
          </Button>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout align="left">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/admin/projects')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                {project.customer?.groomName} & {project.customer?.brideName}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {project.projectNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className={getStatusColor(project.projectStatus)}>
              {getStatusLabel(project.projectStatus)}
            </Badge>
            <DdayBadge targetDate={project.weddingDate} showIcon />
          </div>
        </div>

        {/* Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">진행 상황</CardTitle>
          </CardHeader>
          <CardContent>
            <ProgressBar value={project.progress} showLabel size="lg" />
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="info" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">촬영 정보</TabsTrigger>
                <TabsTrigger value="customer">고객 정보</TabsTrigger>
                <TabsTrigger value="timeline">타임라인</TabsTrigger>
              </TabsList>

              {/* Shooting Info Tab */}
              <TabsContent value="info" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      일정 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">촬영일</div>
                        <div className="font-medium">{formatDate(project.weddingDate)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">촬영 시간</div>
                        <div className="font-medium">{project.weddingTime}</div>
                      </div>
                    </div>
                    
                    {project.makeupInfo && (
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">메이크업 정보</div>
                        <div className="font-medium">{project.makeupInfo}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      장소 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-medium text-lg">{project.weddingVenue}</div>
                    {project.specialRequests && (
                      <div className="mt-4">
                        <div className="text-sm text-muted-foreground mb-1">특별 요청사항</div>
                        <div className="text-sm bg-blue-50 border border-blue-200 rounded-lg p-3">
                          {project.specialRequests}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Customer Info Tab */}
              <TabsContent value="customer" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      신랑 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">이름</div>
                      <div className="font-medium text-lg">{project.customer?.groomName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        연락처
                      </div>
                      <div className="font-medium">{project.customer?.groomPhone}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      신부 정보
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">이름</div>
                      <div className="font-medium text-lg">{project.customer?.brideName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        연락처
                      </div>
                      <div className="font-medium">{project.customer?.bridePhone}</div>
                    </div>
                  </CardContent>
                </Card>

                {project.customer?.email && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        공동 연락처
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-medium">{project.customer.email}</div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Timeline Tab */}
              <TabsContent value="timeline" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      프로젝트 히스토리
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">프로젝트 생성</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(project.createdAt)}
                          </div>
                        </div>
                      </div>

                      {project.updatedAt !== project.createdAt && (
                        <div className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">정보 업데이트</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(project.updatedAt)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <Camera className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">촬영 예정</div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(project.weddingDate)} {project.weddingTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Assignment Info */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">담당자 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">담당 작가</div>
                  {project.assignedPhotographer?.user ? (
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Camera className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {project.assignedPhotographer.user.firstName}
                        </div>
                        {project.assignedPhotographer.user.phone && (
                          <div className="text-xs text-muted-foreground">
                            {project.assignedPhotographer.user.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <AlertCircle className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-orange-700">작가 미배정</span>
                    </div>
                  )}
                </div>

                {project.assignedEditor && (
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">담당 에디터</div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Edit className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {project.assignedEditor.firstName}
                        </div>
                        {project.assignedEditor.phone && (
                          <div className="text-xs text-muted-foreground">
                            {project.assignedEditor.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">계약 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">촬영 유형</span>
                  <Badge variant="outline">
                    {project.projectType === 'wedding' ? '본식' : project.projectType === 'pre_wedding' ? '스냅' : '기타'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">계약 번호</span>
                  <span className="text-sm font-medium">{project.contractId}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">작업 메모</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  메모 추가
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
