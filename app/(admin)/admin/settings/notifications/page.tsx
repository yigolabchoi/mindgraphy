'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  mockNotificationTemplates,
  mockNotificationSchedules,
  previewTemplateWithVariables,
  sampleTemplateVariables,
  type NotificationTemplate,
  type NotificationSchedule
} from '@/lib/mock/settings'
import { Search, Plus, Edit, Eye, Mail, MessageSquare, Bell, Send, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function NotificationsSettingsPage() {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockNotificationTemplates)
  const [schedules, setSchedules] = useState<NotificationSchedule[]>(mockNotificationSchedules)

  const [searchTerm, setSearchTerm] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create')
  const [selectedItem, setSelectedItem] = useState<NotificationTemplate | NotificationSchedule | null>(null)
  const [activeTab, setActiveTab] = useState<'templates' | 'schedules'>('templates')
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<NotificationTemplate | null>(null)

  // Mock search
  const filteredTemplates = templates.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const filteredSchedules = schedules.filter(s =>
    s.templateName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCreate = () => {
    setDrawerMode('create')
    setSelectedItem(null)
    setDrawerOpen(true)
  }

  const handleEdit = (item: NotificationTemplate | NotificationSchedule) => {
    setDrawerMode('edit')
    setSelectedItem(item)
    setDrawerOpen(true)
  }

  const handleSave = () => {
    toast.success(
      drawerMode === 'create' ? '새 항목이 생성되었습니다' : '변경사항이 저장되었습니다'
    )
    setDrawerOpen(false)
  }

  const handlePreview = (template: NotificationTemplate) => {
    setPreviewTemplate(template)
    setPreviewDialogOpen(true)
  }

  const getTypeIcon = (type: NotificationTemplate['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'sms':
        return <MessageSquare className="h-4 w-4" />
      case 'kakao':
        return <MessageSquare className="h-4 w-4 text-yellow-600" />
      case 'push':
        return <Bell className="h-4 w-4" />
      default:
        return <Send className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: NotificationTemplate['type']) => {
    const labels = {
      email: '이메일',
      sms: 'SMS',
      kakao: '카카오톡',
      push: '푸시'
    }
    return labels[type]
  }

  const getCategoryLabel = (category: NotificationTemplate['category']) => {
    const labels = {
      booking: '예약',
      reminder: '리마인더',
      delivery: '배송',
      marketing: '마케팅'
    }
    return labels[category]
  }

  const getTriggerTypeLabel = (type: NotificationSchedule['triggerType']) => {
    const labels = {
      immediate: '즉시',
      scheduled: '예약',
      recurring: '반복'
    }
    return labels[type]
  }

  // Template preview with variables replaced
  const renderPreview = () => {
    if (!previewTemplate) return null

    const preview = previewTemplateWithVariables(previewTemplate, sampleTemplateVariables)

    return (
      <div className="space-y-4">
        {/* Type Badge */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            {getTypeIcon(previewTemplate.type)}
            {getTypeLabel(previewTemplate.type)}
          </Badge>
          <Badge variant="outline">{getCategoryLabel(previewTemplate.category)}</Badge>
        </div>

        {/* Subject (Email only) */}
        {previewTemplate.subject && (
          <div>
            <h4 className="text-sm font-medium mb-2">제목</h4>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-semibold">{preview.subject}</p>
            </div>
          </div>
        )}

        {/* Body */}
        <div>
          <h4 className="text-sm font-medium mb-2">내용</h4>
          <div className="p-4 bg-white dark:bg-zinc-900 border rounded-lg">
            <pre className="whitespace-pre-wrap text-sm font-sans">
              {preview.body}
            </pre>
          </div>
        </div>

        {/* Variables Used */}
        <div>
          <h4 className="text-sm font-medium mb-2">사용된 변수</h4>
          <div className="flex flex-wrap gap-2">
            {previewTemplate.variables.map((variable) => (
              <Badge key={variable} variant="outline" className="font-mono text-xs">
                {variable}
              </Badge>
            ))}
          </div>
        </div>

        {/* Sample Values */}
        <div>
          <h4 className="text-sm font-medium mb-2">샘플 데이터</h4>
          <div className="p-3 bg-muted rounded-lg text-xs space-y-1">
            {previewTemplate.variables.map((variable) => (
              <div key={variable} className="flex items-start gap-2">
                <span className="font-mono text-blue-600">{variable}</span>
                <span className="text-muted-foreground">→</span>
                <span>{sampleTemplateVariables[variable as keyof typeof sampleTemplateVariables]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search & Actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          새로 만들기
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'templates' | 'schedules')}>
        <TabsList>
          <TabsTrigger value="templates">
            알림 템플릿 ({templates.length})
          </TabsTrigger>
          <TabsTrigger value="schedules">
            발송 스케줄 ({schedules.length})
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>템플릿명</TableHead>
                  <TableHead>타입</TableHead>
                  <TableHead>카테고리</TableHead>
                  <TableHead>트리거</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                          {getTypeIcon(template.type)}
                          {getTypeLabel(template.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getCategoryLabel(template.category)}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {template.triggerEvent}
                        </span>
                      </TableCell>
                      <TableCell>
                        {template.isActive ? (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            활성
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="mr-1 h-3 w-3" />
                            비활성
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreview(template)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(template)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Schedules Tab */}
        <TabsContent value="schedules" className="space-y-4">
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>템플릿명</TableHead>
                  <TableHead>발송 타입</TableHead>
                  <TableHead>조건</TableHead>
                  <TableHead>발송 시간</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      검색 결과가 없습니다
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSchedules.map((schedule) => (
                    <TableRow key={schedule.id}>
                      <TableCell className="font-medium">{schedule.templateName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTriggerTypeLabel(schedule.triggerType)}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs text-muted-foreground">
                          {schedule.triggerCondition}
                        </span>
                      </TableCell>
                      <TableCell>
                        {schedule.sendTime ? (
                          <span className="text-sm font-mono">{schedule.sendTime}</span>
                        ) : (
                          <span className="text-xs text-muted-foreground">즉시</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {schedule.isActive ? (
                          <Badge variant="default" className="bg-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            활성
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <XCircle className="mr-1 h-3 w-3" />
                            비활성
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(schedule)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>템플릿 미리보기</DialogTitle>
            <DialogDescription>
              실제 발송될 내용을 확인하세요 (샘플 데이터 적용)
            </DialogDescription>
          </DialogHeader>
          {renderPreview()}
        </DialogContent>
      </Dialog>

      {/* Drawer for Create/Edit (Mock) */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              {drawerMode === 'create' ? '새로 만들기' : '수정하기'}
            </SheetTitle>
            <SheetDescription>
              {activeTab === 'templates' && '템플릿 정보를 입력하세요'}
              {activeTab === 'schedules' && '스케줄 정보를 입력하세요'}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground">
              [Mock Editor - 실제 폼이 여기에 구현됩니다]
            </p>
            {selectedItem && (
              <pre className="rounded-lg bg-muted p-4 text-xs overflow-auto">
                {JSON.stringify(selectedItem, null, 2)}
              </pre>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDrawerOpen(false)}>
              취소
            </Button>
            <Button onClick={handleSave}>
              {drawerMode === 'create' ? '생성' : '저장'}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

