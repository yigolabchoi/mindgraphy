import { addDays, subDays, format } from 'date-fns'

export type ClientStep = 'contract' | 'info' | 'proof' | 'download'
export type ClientStepStatus = 'pending' | 'in_progress' | 'completed' | 'overdue'

export interface ClientPortalData {
  token: string
  isValid: boolean
  isExpired: boolean
  
  // Client info
  groomName: string
  brideName: string
  weddingDate: string
  venueName: string
  
  // Contract
  contractId: string
  contractStatus: 'sent' | 'signed' | 'active' | 'completed'
  contractSignedAt?: string
  
  // Progress
  currentStep: ClientStep
  steps: {
    contract: {
      status: ClientStepStatus
      completedAt?: string
    }
    info: {
      status: ClientStepStatus
      completedAt?: string
      deadline?: string
    }
    proof: {
      status: ClientStepStatus
      completedAt?: string
      deadline?: string
      totalPhotos?: number
      selectedPhotos?: number
      maxSelections?: number
    }
    download: {
      status: ClientStepStatus
      completedAt?: string
      deadline?: string
      availableFiles?: number
      downloadedFiles?: number
    }
  }
  
  // Photographer
  photographerName: string
  photographerPhone: string
  photographerEmail: string
  
  // Package
  packageName: string
  packageType: 'premium' | 'standard' | 'basic'
  
  // Notifications
  hasUnreadNotifications: boolean
  unreadCount: number
}

const today = new Date()

// Valid tokens with data
export const mockClientData: Record<string, ClientPortalData> = {
  // Demo token - Active, in proof selection phase
  'demo-token-2025': {
    token: 'demo-token-2025',
    isValid: true,
    isExpired: false,
    
    groomName: '김민준',
    brideName: '이서연',
    weddingDate: format(subDays(today, 7), 'yyyy-MM-dd'),
    venueName: '서울 그랜드 호텔',
    
    contractId: 'contract-001',
    contractStatus: 'active',
    contractSignedAt: format(subDays(today, 30), 'yyyy-MM-dd'),
    
    currentStep: 'proof',
    steps: {
      contract: {
        status: 'completed',
        completedAt: format(subDays(today, 30), 'yyyy-MM-dd')
      },
      info: {
        status: 'completed',
        completedAt: format(subDays(today, 28), 'yyyy-MM-dd'),
        deadline: format(subDays(today, 25), 'yyyy-MM-dd')
      },
      proof: {
        status: 'in_progress',
        deadline: format(addDays(today, 3), 'yyyy-MM-dd'), // D-3! Urgent
        totalPhotos: 450,
        selectedPhotos: 35,
        maxSelections: 50
      },
      download: {
        status: 'pending'
      }
    },
    
    photographerName: '박선우',
    photographerPhone: '010-1234-5678',
    photographerEmail: 'park.photographer@mindgraphy.com',
    
    packageName: '프리미엄 웨딩 패키지',
    packageType: 'premium',
    
    hasUnreadNotifications: true,
    unreadCount: 2
  },
  
  // Token 001 - Just signed contract
  'token-001': {
    token: 'token-001',
    isValid: true,
    isExpired: false,
    
    groomName: '홍길동',
    brideName: '김영희',
    weddingDate: format(addDays(today, 60), 'yyyy-MM-dd'),
    venueName: '코엑스 그랜드 볼룸',
    
    contractId: 'contract-002',
    contractStatus: 'signed',
    contractSignedAt: format(subDays(today, 1), 'yyyy-MM-dd'),
    
    currentStep: 'info',
    steps: {
      contract: {
        status: 'completed',
        completedAt: format(subDays(today, 1), 'yyyy-MM-dd')
      },
      info: {
        status: 'in_progress',
        deadline: format(addDays(today, 7), 'yyyy-MM-dd')
      },
      proof: {
        status: 'pending'
      },
      download: {
        status: 'pending'
      }
    },
    
    photographerName: '최지훈',
    photographerPhone: '010-2345-6789',
    photographerEmail: 'choi.photographer@mindgraphy.com',
    
    packageName: '스탠다드 웨딩 패키지',
    packageType: 'standard',
    
    hasUnreadNotifications: true,
    unreadCount: 1
  },
  
  // Token 002 - Waiting for contract signature
  'token-002': {
    token: 'token-002',
    isValid: true,
    isExpired: false,
    
    groomName: '박준호',
    brideName: '윤서아',
    weddingDate: format(addDays(today, 45), 'yyyy-MM-dd'),
    venueName: '신라호텔',
    
    contractId: 'contract-003',
    contractStatus: 'sent',
    
    currentStep: 'contract',
    steps: {
      contract: {
        status: 'in_progress'
      },
      info: {
        status: 'pending',
        deadline: format(addDays(today, 2), 'yyyy-MM-dd') // D-2! Urgent
      },
      proof: {
        status: 'pending'
      },
      download: {
        status: 'pending'
      }
    },
    
    photographerName: '김태형',
    photographerPhone: '010-3456-7890',
    photographerEmail: 'kim.photographer@mindgraphy.com',
    
    packageName: '베이직 웨딩 패키지',
    packageType: 'basic',
    
    hasUnreadNotifications: false,
    unreadCount: 0
  },
  
  // Token 003 - Overdue on info submission
  'token-003': {
    token: 'token-003',
    isValid: true,
    isExpired: false,
    
    groomName: '정우성',
    brideName: '한가인',
    weddingDate: format(addDays(today, 30), 'yyyy-MM-dd'),
    venueName: '파라다이스 호텔',
    
    contractId: 'contract-004',
    contractStatus: 'active',
    contractSignedAt: format(subDays(today, 15), 'yyyy-MM-dd'),
    
    currentStep: 'info',
    steps: {
      contract: {
        status: 'completed',
        completedAt: format(subDays(today, 15), 'yyyy-MM-dd')
      },
      info: {
        status: 'overdue',
        deadline: format(subDays(today, 2), 'yyyy-MM-dd') // Already passed!
      },
      proof: {
        status: 'pending'
      },
      download: {
        status: 'pending'
      }
    },
    
    photographerName: '이준희',
    photographerPhone: '010-4567-8901',
    photographerEmail: 'lee.photographer@mindgraphy.com',
    
    packageName: '프리미엄 웨딩 패키지',
    packageType: 'premium',
    
    hasUnreadNotifications: true,
    unreadCount: 3
  },
  
  // Token 004 - All completed, ready to download
  'token-004': {
    token: 'token-004',
    isValid: true,
    isExpired: false,
    
    groomName: '송중기',
    brideName: '송혜교',
    weddingDate: format(subDays(today, 30), 'yyyy-MM-dd'),
    venueName: '신라호텔',
    
    contractId: 'contract-005',
    contractStatus: 'completed',
    contractSignedAt: format(subDays(today, 90), 'yyyy-MM-dd'),
    
    currentStep: 'download',
    steps: {
      contract: {
        status: 'completed',
        completedAt: format(subDays(today, 90), 'yyyy-MM-dd')
      },
      info: {
        status: 'completed',
        completedAt: format(subDays(today, 85), 'yyyy-MM-dd'),
        deadline: format(subDays(today, 80), 'yyyy-MM-dd')
      },
      proof: {
        status: 'completed',
        completedAt: format(subDays(today, 15), 'yyyy-MM-dd'),
        deadline: format(subDays(today, 10), 'yyyy-MM-dd'),
        totalPhotos: 520,
        selectedPhotos: 50,
        maxSelections: 50
      },
      download: {
        status: 'in_progress',
        deadline: format(addDays(today, 30), 'yyyy-MM-dd'),
        availableFiles: 3,
        downloadedFiles: 1
      }
    },
    
    photographerName: '박선우',
    photographerPhone: '010-1234-5678',
    photographerEmail: 'park.photographer@mindgraphy.com',
    
    packageName: '프리미엄 웨딩 패키지',
    packageType: 'premium',
    
    hasUnreadNotifications: false,
    unreadCount: 0
  }
}

// Helper: Get client data by token
export const getClientDataByToken = (token: string): ClientPortalData | null => {
  return mockClientData[token] || null
}

// Helper: Check if token is valid
export const isTokenValid = (token: string): boolean => {
  const data = mockClientData[token]
  return data ? data.isValid && !data.isExpired : false
}

// Helper: Get step label
export const getStepLabel = (step: ClientStep): string => {
  const labels: Record<ClientStep, string> = {
    contract: '계약 확인',
    info: '정보 입력',
    proof: '사진 선택',
    download: '다운로드'
  }
  return labels[step]
}

// Helper: Get step status label
export const getStepStatusLabel = (status: ClientStepStatus): string => {
  const labels: Record<ClientStepStatus, string> = {
    pending: '대기중',
    in_progress: '진행중',
    completed: '완료',
    overdue: '기한 초과'
  }
  return labels[status]
}

// Helper: Get step path
export const getStepPath = (token: string, step: ClientStep): string => {
  const paths: Record<ClientStep, string> = {
    contract: `/c/${token}/contract`,
    info: `/c/${token}/info`,
    proof: `/c/${token}/proof-gallery`,
    download: `/c/${token}/download`
  }
  return paths[step]
}

// Helper: Calculate days until deadline
export const getDaysUntilDeadline = (deadline: string): number => {
  const deadlineDate = new Date(deadline)
  const diffTime = deadlineDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Helper: Check if deadline is near (within 3 days)
export const isDeadlineNear = (deadline: string): boolean => {
  const days = getDaysUntilDeadline(deadline)
  return days >= 0 && days <= 3
}

// Helper: Check if deadline is overdue
export const isDeadlineOverdue = (deadline: string): boolean => {
  return getDaysUntilDeadline(deadline) < 0
}

// Helper: Get overall progress percentage
export const getOverallProgress = (data: ClientPortalData): number => {
  const steps = Object.values(data.steps)
  const completedSteps = steps.filter(s => s.status === 'completed').length
  return Math.round((completedSteps / steps.length) * 100)
}

// Helper: Get next step CTA
export const getNextStepCTA = (data: ClientPortalData): {
  step: ClientStep
  label: string
  path: string
  isUrgent: boolean
} | null => {
  const stepOrder: ClientStep[] = ['contract', 'info', 'proof', 'download']
  
  for (const step of stepOrder) {
    const stepData = data.steps[step]
    if (stepData.status === 'in_progress' || stepData.status === 'overdue') {
      const deadline = 'deadline' in stepData ? stepData.deadline : undefined
      const isUrgent = deadline 
        ? isDeadlineNear(deadline) || isDeadlineOverdue(deadline)
        : false
      
      return {
        step,
        label: getStepLabel(step),
        path: getStepPath(data.token, step),
        isUrgent
      }
    }
  }
  
  return null
}

