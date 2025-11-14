// 프로젝트 상세 관리를 위한 확장 타입

export interface BackupLocation {
  primary: string // 0차 백업
  secondary: string // 1차 백업
  tertiary: string // 2차 백업
  deliveryStartDate?: string
}

export interface ShootingData {
  mainPhotographer: string
  subPhotographer?: string
  totalFiles: number
  totalSize?: string
}

export interface ProgressEntry {
  date: string
  year: number
  description: string
  assignee?: string
  completed: boolean
}

export interface ProductInfo {
  type: string // '돌잔치 행사', '웨딩' 등
  team: string[] // ['작가', '작가']
  description: string
  album?: {
    size: string
    pages: number
    quantity: number
  }
  frame?: {
    size: string
    quantity: number
  }
  finalPhotos: {
    count: number
    selectionType: string // '고객셀렉', '작가셀렉'
    retouching: boolean
  }
  originalPhotos: boolean
}

export interface ClientContactInfo {
  father?: {
    name: string
    phone: string
    email: string
  }
  mother?: {
    name: string
    phone: string
    email: string
  }
  groom?: {
    name: string
    phone: string
    email: string
  }
  bride?: {
    name: string
    phone: string
    email: string
  }
  baby?: {
    name: string
    gender: '남아' | '여아'
  }
}

export interface DeliveryInfo {
  recipient: string
  phone: string
  address: string
  postalCode?: string
}

export interface ShootingSchedule {
  date: string
  time: string
  venue: {
    name: string
    address: string
    phone?: string
    url?: string
  }
}

export interface SpecialNotes {
  contractDate: string
  contractPerson: string
  source: string // '워크인', '인터넷', '지인소개' 등
  reason?: string
  venueConfirmed?: boolean
  venueTiming?: {
    beforeTime: boolean
    afterTime: boolean
    ceremonyGap: number // 분 단위
  }
  arrivalTime?: string
  finishTime?: string
}

export interface PaymentInfo {
  totalAmount: number
  deposit: {
    amount: number
    note: string
  }
  balance: {
    amount: number
    dueDate: string
    note: string
    paid: boolean
    paidDate?: string
    receiptUrl?: string
  }
  bankAccount: {
    bank: string
    account: string
    holder: string
  }
}

export interface ResourceLinks {
  downloadLink?: {
    url: string
    password?: string
    expiryDate: string
  }
  galleryLink?: {
    url: string
    password?: string
    note: string
  }
  revisionRequests?: string
}

export interface ProjectDetail {
  id: string
  projectNumber: string
  title: string
  
  // 저장 위치
  backup: BackupLocation
  
  // 촬영 데이터
  shootingData: ShootingData
  
  // 진행 트리
  progressTimeline: ProgressEntry[]
  
  // 촬영 상품
  product: ProductInfo
  
  // 고객 정보
  client: ClientContactInfo
  delivery: DeliveryInfo
  
  // 촬영 일정
  schedule: ShootingSchedule
  
  // 특이사항
  specialNotes: SpecialNotes
  photographerNotes?: string
  postShootingNotes?: string
  
  // 금액 정보
  payment: PaymentInfo
  
  // 링크 모음
  links: ResourceLinks
  
  // 메타
  createdBy: string
  createdAt: string
  updatedAt: string
}

