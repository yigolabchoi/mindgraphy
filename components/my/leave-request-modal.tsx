'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar } from 'lucide-react'

interface LeaveRequestModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (startDate: string, endDate: string, reason: string) => void
}

export function LeaveRequestModal({ open, onOpenChange, onSubmit }: LeaveRequestModalProps) {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmit = () => {
    if (!startDate || !endDate || !reason.trim()) return

    onSubmit(startDate, endDate, reason)
    setStartDate('')
    setEndDate('')
    setReason('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            휴가 신청
          </DialogTitle>
          <DialogDescription>
            휴가를 신청하면 관리자에게 승인 요청이 전송됩니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start-date">시작일 *</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <Label htmlFor="end-date">종료일 *</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="leave-reason">사유 *</Label>
            <Textarea
              id="leave-reason"
              placeholder="휴가 사유를 입력해주세요..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Info */}
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 text-sm text-blue-800">
            <p className="font-medium mb-1">안내사항</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>휴가 신청 후 관리자 승인이 필요합니다.</li>
              <li>휴가 기간 중에는 일정이 배정되지 않습니다.</li>
              <li>긴급한 경우 전화로 문의해주세요.</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!startDate || !endDate || !reason.trim()}
          >
            신청하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

