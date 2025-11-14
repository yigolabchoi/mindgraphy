'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { useAuthStore } from '@/lib/store/auth-store'
import type { PostCategory } from '@/lib/mock/board'

interface CreatePostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

const CATEGORY_OPTIONS: { value: PostCategory; label: string; adminOnly?: boolean }[] = [
  { value: 'notice', label: '공지사항', adminOnly: true },
  { value: 'general', label: '자유게시판' },
  { value: 'question', label: '질문' },
  { value: 'tips', label: '팁/노하우' },
  { value: 'event', label: '이벤트', adminOnly: true },
]

export function CreatePostDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreatePostDialogProps) {
  const { user } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    category: 'general' as PostCategory,
    title: '',
    content: '',
    isPinned: false,
  })

  const isAdmin = user?.role === 'admin'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title.trim()) {
      toast.error('제목을 입력해주세요.')
      return
    }

    if (!formData.content.trim()) {
      toast.error('내용을 입력해주세요.')
      return
    }

    // Check admin-only categories
    if (!isAdmin && (formData.category === 'notice' || formData.category === 'event')) {
      toast.error('해당 카테고리는 관리자만 사용할 수 있습니다.')
      return
    }

    setIsSubmitting(true)

    try {
      // TODO: 실제 API 호출로 변경
      // await apiService.post('/posts', formData)

      // Mock: Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast.success('게시글이 등록되었습니다.')

      // Reset form
      setFormData({
        category: 'general',
        title: '',
        content: '',
        isPinned: false,
      })

      onOpenChange(false)
      onSuccess?.()

    } catch (error) {
      toast.error('게시글 등록에 실패했습니다.')
      console.error('Failed to create post:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Filter categories based on user role
  const availableCategories = CATEGORY_OPTIONS.filter(
    option => isAdmin || !option.adminOnly
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>새 글 작성</DialogTitle>
          <DialogDescription>
            팀원들과 공유할 내용을 작성하세요.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              카테고리 <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange('category', value)}
            >
              <SelectTrigger id="category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availableCategories.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                    {option.adminOnly && ' (관리자 전용)'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              제목 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content">
              내용 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleChange('content', e.target.value)}
              placeholder="내용을 입력하세요&#10;&#10;팁: Shift+Enter로 줄바꿈할 수 있습니다."
              rows={12}
              required
            />
            <p className="text-xs text-muted-foreground">
              Markdown 형식을 지원합니다 (향후 업데이트 예정)
            </p>
          </div>

          {/* Pin option (Admin only) */}
          {isAdmin && (
            <div className="flex items-center space-x-2">
              <Checkbox
                id="isPinned"
                checked={formData.isPinned}
                onCheckedChange={(checked) => handleChange('isPinned', checked)}
              />
              <Label
                htmlFor="isPinned"
                className="text-sm font-normal cursor-pointer"
              >
                상단 고정 (공지사항)
              </Label>
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              취소
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '게시글 등록'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

