'use client'

import { AdminLayout } from '@/components/layout/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ProgressBar } from '@/components/common/progress-bar'
import { DdayBadge } from '@/components/common/dday-badge'
import { mockProjects } from '@/lib/mock-data'
import { getStatusColor, getStatusLabel, formatDate } from '@/lib/utils'
import { Plus, Search } from 'lucide-react'

export default function ProjectsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">프로젝트</h1>
            <p className="text-muted-foreground">
              모든 웨딩 프로젝트를 관리하세요
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            새 프로젝트
          </Button>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold">
                        {project.customer?.groomName} & {project.customer?.brideName}
                      </h3>
                      <Badge className={getStatusColor(project.projectStatus)}>
                        {getStatusLabel(project.projectStatus)}
                      </Badge>
                      <DdayBadge targetDate={project.weddingDate} showIcon={false} />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">프로젝트:</span> {project.projectNumber}
                      </div>
                      <div>
                        <span className="font-medium">날짜:</span> {formatDate(project.weddingDate)}
                      </div>
                      <div>
                        <span className="font-medium">장소:</span> {project.weddingVenue}
                      </div>
                      <div>
                        <span className="font-medium">사진작가:</span>{' '}
                        {project.assignedPhotographer?.user?.firstName || '미배정'}
                      </div>
                    </div>

                    <ProgressBar value={project.progress} showLabel={true} />
                  </div>

                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}

