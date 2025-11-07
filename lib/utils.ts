import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date)
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function calculateDDay(targetDate: Date | string): number {
  const target = new Date(targetDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  const diffTime = target.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW'
  }).format(amount)
}

export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    // Project statuses
    'scheduled': 'bg-blue-100 text-blue-800',
    'in_progress': 'bg-yellow-100 text-yellow-800',
    'proof_ready': 'bg-purple-100 text-purple-800',
    'editing': 'bg-orange-100 text-orange-800',
    'completed': 'bg-green-100 text-green-800',
    'delivered': 'bg-teal-100 text-teal-800',
    'archived': 'bg-gray-100 text-gray-800',
    
    // Contract statuses
    'draft': 'bg-gray-100 text-gray-800',
    'sent': 'bg-blue-100 text-blue-800',
    'signed': 'bg-green-100 text-green-800',
    'active': 'bg-emerald-100 text-emerald-800',
    'cancelled': 'bg-red-100 text-red-800',
    
    // Payment statuses
    'pending': 'bg-yellow-100 text-yellow-800',
    'failed': 'bg-red-100 text-red-800',
    'refunded': 'bg-orange-100 text-orange-800',
  }
  
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function getStatusLabel(status: string): string {
  const statusLabels: Record<string, string> = {
    // Project statuses
    'scheduled': '예정',
    'in_progress': '진행중',
    'proof_ready': '프루프 준비',
    'editing': '편집중',
    'completed': '완료',
    'delivered': '배송완료',
    'archived': '보관',
    
    // Contract statuses
    'draft': '초안',
    'sent': '발송됨',
    'signed': '서명완료',
    'active': '활성',
    'cancelled': '취소',
    
    // Payment statuses
    'pending': '대기중',
    'failed': '실패',
    'refunded': '환불',
  }
  
  return statusLabels[status] || status
}

