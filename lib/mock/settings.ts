import { format } from 'date-fns'

// ============================================================
// PRODUCTS, OPTIONS, POLICIES
// ============================================================

export interface Product {
  id: string
  name: string
  category: 'wedding' | 'studio' | 'event' | 'commercial'
  basePrice: number
  maxProofSelections: number
  includesOriginals: boolean
  deliveryFormat: string[]
  turnAroundDays: number
  isActive: boolean
  description: string
  createdAt: string
  updatedAt: string
}

export interface ProductOption {
  id: string
  name: string
  type: 'addon' | 'upgrade'
  price: number
  description: string
  isActive: boolean
  applicableProducts: string[] // product IDs
}

export interface Policy {
  id: string
  name: string
  type: 'cancellation' | 'refund' | 'usage' | 'privacy'
  version: string
  content: string
  effectiveDate: string
  isActive: boolean
  createdAt: string
}

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    name: '프리미엄 웨딩 패키지',
    category: 'wedding',
    basePrice: 2500000,
    maxProofSelections: 50,
    includesOriginals: true,
    deliveryFormat: ['Digital (High-Res)', 'Album 30P', 'USB'],
    turnAroundDays: 30,
    isActive: true,
    description: '본식 + 스냅 전체 촬영, 프리미엄 보정, 앨범 제작 포함',
    createdAt: '2024-01-15',
    updatedAt: '2024-11-01'
  },
  {
    id: 'prod-002',
    name: '스탠다드 웨딩 패키지',
    category: 'wedding',
    basePrice: 1800000,
    maxProofSelections: 40,
    includesOriginals: false,
    deliveryFormat: ['Digital (High-Res)', 'Album 20P'],
    turnAroundDays: 45,
    isActive: true,
    description: '본식 촬영 중심, 기본 보정, 앨범 제작 포함',
    createdAt: '2024-01-15',
    updatedAt: '2024-10-20'
  },
  {
    id: 'prod-003',
    name: '스냅 촬영 패키지',
    category: 'wedding',
    basePrice: 800000,
    maxProofSelections: 30,
    includesOriginals: false,
    deliveryFormat: ['Digital (High-Res)'],
    turnAroundDays: 21,
    isActive: true,
    description: '스냅 촬영만, 디지털 파일 제공',
    createdAt: '2024-02-01',
    updatedAt: '2024-09-15'
  },
  {
    id: 'prod-004',
    name: '가족 스튜디오 촬영',
    category: 'studio',
    basePrice: 350000,
    maxProofSelections: 20,
    includesOriginals: false,
    deliveryFormat: ['Digital (High-Res)', 'Prints 10P'],
    turnAroundDays: 14,
    isActive: true,
    description: '스튜디오 내 가족 촬영, 2시간',
    createdAt: '2024-03-10',
    updatedAt: '2024-10-05'
  },
  {
    id: 'prod-005',
    name: '기업 행사 촬영',
    category: 'event',
    basePrice: 1200000,
    maxProofSelections: 100,
    includesOriginals: true,
    deliveryFormat: ['Digital (High-Res)', 'USB'],
    turnAroundDays: 7,
    isActive: false,
    description: '기업 행사, 세미나, 컨퍼런스 촬영 (단종)',
    createdAt: '2024-01-20',
    updatedAt: '2024-08-30'
  }
]

export const mockProductOptions: ProductOption[] = [
  {
    id: 'opt-001',
    name: '드론 촬영 추가',
    type: 'addon',
    price: 300000,
    description: '외부 전경, 단체 사진 드론 촬영',
    isActive: true,
    applicableProducts: ['prod-001', 'prod-002']
  },
  {
    id: 'opt-002',
    name: '메이크업 동행',
    type: 'addon',
    price: 200000,
    description: '메이크업샵 동행 촬영 (1시간)',
    isActive: true,
    applicableProducts: ['prod-001', 'prod-002']
  },
  {
    id: 'opt-003',
    name: '원본 파일 전체 제공',
    type: 'upgrade',
    price: 500000,
    description: 'RAW + JPEG 전체 원본 파일',
    isActive: true,
    applicableProducts: ['prod-002', 'prod-003']
  },
  {
    id: 'opt-004',
    name: '추가 앨범 제작 (20P)',
    type: 'addon',
    price: 400000,
    description: '고급 양장 앨범 추가 제작',
    isActive: true,
    applicableProducts: ['prod-001', 'prod-002']
  },
  {
    id: 'opt-005',
    name: '긴급 납품 (2주)',
    type: 'upgrade',
    price: 800000,
    description: '촬영 후 2주 내 최종 납품 보장',
    isActive: true,
    applicableProducts: ['prod-001', 'prod-002', 'prod-003']
  }
]

export const mockPolicies: Policy[] = [
  {
    id: 'policy-001',
    name: '취소 및 환불 규정',
    type: 'cancellation',
    version: 'v2.1',
    content: `## 취소 및 환불 규정

### 1. 계약 취소
- 촬영 30일 전: 100% 환불
- 촬영 14~29일 전: 50% 환불
- 촬영 7~13일 전: 30% 환불
- 촬영 6일 전 이내: 환불 불가

### 2. 당사 사유로 인한 취소
- 100% 전액 환불 또는 일정 재조정

### 3. 불가항력 (천재지변 등)
- 일정 재조정 우선, 불가능시 전액 환불

### 4. 부분 환불
- 옵션 취소: 옵션 금액의 50%
- 앨범 취소 (촬영 후): 환불 불가`,
    effectiveDate: '2024-10-01',
    isActive: true,
    createdAt: '2024-09-15'
  },
  {
    id: 'policy-002',
    name: '개인정보 처리방침',
    type: 'privacy',
    version: 'v3.0',
    content: `## 개인정보 처리방침

### 1. 수집하는 개인정보
- 이름, 연락처, 이메일, 주소
- 촬영 정보 (일시, 장소)
- 사진 및 영상 (초상권 포함)

### 2. 개인정보의 이용 목적
- 촬영 서비스 제공
- 계약 이행 및 정산
- 결과물 배송
- 마케팅 (동의시)

### 3. 개인정보 보유 기간
- 계약 종료 후 5년
- 법령에서 정한 기간

### 4. 개인정보 제3자 제공
- 원칙적으로 제공하지 않음
- 법령에 의한 경우 예외

### 5. 정보주체의 권리
- 열람, 정정, 삭제 요구권
- 처리 정지 요구권`,
    effectiveDate: '2024-11-01',
    isActive: true,
    createdAt: '2024-10-20'
  },
  {
    id: 'policy-003',
    name: '저작권 및 초상권 활용 동의',
    type: 'usage',
    version: 'v1.5',
    content: `## 저작권 및 초상권 활용 동의

### 1. 저작권
- 모든 사진/영상의 저작권은 MindGraphy에 귀속
- 고객은 개인적 용도로만 사용 가능
- 상업적 이용, 재판매, 2차 저작물 제작 금지

### 2. 초상권
- 고객이 피사체에 대한 초상권을 보유
- 고객 동의 없이 제3자에게 제공하지 않음

### 3. 포트폴리오 활용
- 고객 동의 시 포트폴리오, 홍보자료 활용 가능
- SNS, 웹사이트, 인쇄물 등 게재
- 언제든지 철회 요청 가능

### 4. 보정 및 편집
- MindGraphy는 사진 보정 및 편집 권한 보유
- 예술적 표현의 자유 인정`,
    effectiveDate: '2024-08-01',
    isActive: true,
    createdAt: '2024-07-20'
  }
]

// ============================================================
// NOTIFICATION TEMPLATES
// ============================================================

export interface NotificationTemplate {
  id: string
  name: string
  type: 'email' | 'sms' | 'push' | 'kakao'
  category: 'booking' | 'reminder' | 'delivery' | 'marketing'
  subject?: string
  body: string
  variables: string[] // e.g., ['{name}', '{date}', '{venue}']
  triggerEvent: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationSchedule {
  id: string
  templateId: string
  templateName: string
  triggerType: 'immediate' | 'scheduled' | 'recurring'
  triggerCondition: string
  sendTime?: string // e.g., "09:00"
  daysOffset?: number // e.g., -7 for 7 days before event
  isActive: boolean
}

export const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: 'tmpl-001',
    name: '계약 완료 확인',
    type: 'email',
    category: 'booking',
    subject: '[MindGraphy] {name} 님, 계약이 완료되었습니다',
    body: `안녕하세요, {name} 님!

MindGraphy와 함께하게 되어 영광입니다.

📅 촬영 일정: {date}
📍 촬영 장소: {venue}
📦 계약 상품: {package}

[고객 포털 바로가기]
{portalUrl}

감사합니다.
MindGraphy 팀`,
    variables: ['{name}', '{date}', '{venue}', '{package}', '{portalUrl}'],
    triggerEvent: 'contract_signed',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-10-15'
  },
  {
    id: 'tmpl-002',
    name: '촬영 D-7 리마인더',
    type: 'kakao',
    category: 'reminder',
    subject: undefined,
    body: `🎉 {name} 님, 촬영이 일주일 남았습니다!

📅 {date} {time}
📍 {venue}
📷 담당 작가: {photographer}

[준비 체크리스트]
✓ 메이크업 예약 확인
✓ 예식장 위치 확인
✓ 특별 요청 사항 전달

문의: {phone}`,
    variables: ['{name}', '{date}', '{time}', '{venue}', '{photographer}', '{phone}'],
    triggerEvent: 'shooting_date_minus_7',
    isActive: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-09-20'
  },
  {
    id: 'tmpl-003',
    name: '프루프 사진 준비 완료',
    type: 'email',
    category: 'delivery',
    subject: '[MindGraphy] {name} 님, 프루프 사진이 준비되었습니다!',
    body: `안녕하세요, {name} 님!

촬영하신 사진의 프루프가 준비되었습니다.

📸 전체 사진 수: {totalPhotos}장
✅ 선택 가능: {maxSelections}장
⏰ 선택 마감일: {deadline}

[사진 선택하러 가기]
{proofUrl}

기한 내에 선택 부탁드립니다.

감사합니다.`,
    variables: ['{name}', '{totalPhotos}', '{maxSelections}', '{deadline}', '{proofUrl}'],
    triggerEvent: 'proof_ready',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-10-28'
  },
  {
    id: 'tmpl-004',
    name: '선택 마감 D-3 알림',
    type: 'sms',
    category: 'reminder',
    subject: undefined,
    body: `[MindGraphy] {name}님, 프루프 선택 마감이 3일 남았습니다. 
마감: {deadline}
지금 선택하기: {proofUrl}`,
    variables: ['{name}', '{deadline}', '{proofUrl}'],
    triggerEvent: 'proof_deadline_minus_3',
    isActive: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-10-10'
  },
  {
    id: 'tmpl-005',
    name: '최종 결과물 다운로드 안내',
    type: 'email',
    category: 'delivery',
    subject: '[MindGraphy] {name} 님, 최종 결과물이 준비되었습니다!',
    body: `{name} 님, 안녕하세요!

최종 편집된 사진이 모두 준비되었습니다.

📦 최종 파일: {fileCount}장
⏰ 다운로드 만료: {expiryDate}
🔒 비밀번호: {downloadPassword}

[다운로드 하러 가기]
{downloadUrl}

아래 항목이 배송 예정입니다:
{deliveryItems}

평생 소중한 추억이 되길 바랍니다!

MindGraphy 팀`,
    variables: ['{name}', '{fileCount}', '{expiryDate}', '{downloadPassword}', '{downloadUrl}', '{deliveryItems}'],
    triggerEvent: 'final_delivery',
    isActive: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-11-01'
  },
  {
    id: 'tmpl-006',
    name: '만족도 조사 요청',
    type: 'email',
    category: 'marketing',
    subject: '[MindGraphy] {name} 님의 소중한 의견을 들려주세요',
    body: `{name} 님, 안녕하세요!

MindGraphy의 서비스는 만족스러우셨나요?

📸 촬영 일자: {date}
👤 담당 작가: {photographer}

[만족도 조사 참여하기]
{surveyUrl}

소중한 의견 부탁드립니다.
리뷰 작성시 다음 촬영 10% 할인권 증정!

감사합니다.`,
    variables: ['{name}', '{date}', '{photographer}', '{surveyUrl}'],
    triggerEvent: 'project_completed_plus_7',
    isActive: true,
    createdAt: '2024-02-10',
    updatedAt: '2024-09-05'
  }
]

export const mockNotificationSchedules: NotificationSchedule[] = [
  {
    id: 'sched-001',
    templateId: 'tmpl-001',
    templateName: '계약 완료 확인',
    triggerType: 'immediate',
    triggerCondition: 'contract.status = signed',
    isActive: true
  },
  {
    id: 'sched-002',
    templateId: 'tmpl-002',
    templateName: '촬영 D-7 리마인더',
    triggerType: 'scheduled',
    triggerCondition: 'shooting_date - 7 days',
    sendTime: '09:00',
    daysOffset: -7,
    isActive: true
  },
  {
    id: 'sched-003',
    templateId: 'tmpl-003',
    templateName: '프루프 사진 준비 완료',
    triggerType: 'immediate',
    triggerCondition: 'proof.status = ready',
    isActive: true
  },
  {
    id: 'sched-004',
    templateId: 'tmpl-004',
    templateName: '선택 마감 D-3 알림',
    triggerType: 'scheduled',
    triggerCondition: 'proof_deadline - 3 days',
    sendTime: '10:00',
    daysOffset: -3,
    isActive: true
  },
  {
    id: 'sched-005',
    templateId: 'tmpl-005',
    templateName: '최종 결과물 다운로드 안내',
    triggerType: 'immediate',
    triggerCondition: 'project.status = final_delivery',
    isActive: true
  }
]

// ============================================================
// MASTER DATA (VENUES, PARTNERS)
// ============================================================

export interface Venue {
  id: string
  name: string
  type: 'wedding_hall' | 'hotel' | 'church' | 'outdoor' | 'other'
  address: string
  phone: string
  ballrooms: string[]
  parkingInfo?: string
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Partner {
  id: string
  name: string
  type: 'makeup' | 'dress' | 'studio' | 'planner' | 'florist' | 'other'
  contactPerson: string
  phone: string
  email: string
  address?: string
  website?: string
  commissionRate?: number
  notes?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const mockVenues: Venue[] = [
  {
    id: 'venue-001',
    name: '더 그랜드 웨딩홀',
    type: 'wedding_hall',
    address: '서울시 강남구 테헤란로 123',
    phone: '02-1234-5678',
    ballrooms: ['그랜드홀 (300석)', '프리미어홀 (200석)', '스위트홀 (100석)'],
    parkingInfo: '지하 3층 주차장, 발렛파킹 가능',
    notes: '천장 높이 5m, 자연광 우수',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-10-15'
  },
  {
    id: 'venue-002',
    name: '신라호텔 영빈관',
    type: 'hotel',
    address: '서울시 중구 동호로 249',
    phone: '02-2233-3131',
    ballrooms: ['다이아몬드홀 (500석)', '에메랄드홀 (300석)', '루비홀 (150석)'],
    parkingInfo: '호텔 내 주차장 이용',
    notes: '고급스러운 인테리어, 샹들리에 조명',
    isActive: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-09-20'
  },
  {
    id: 'venue-003',
    name: '명동성당',
    type: 'church',
    address: '서울시 중구 명동길 74',
    phone: '02-774-1784',
    ballrooms: ['대성당'],
    parkingInfo: '주변 공영주차장 이용',
    notes: '역사적 건축물, 촬영 제약 있음 (플래시 금지)',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-08-10'
  },
  {
    id: 'venue-004',
    name: '남이섬 야외정원',
    type: 'outdoor',
    address: '강원도 춘천시 남산면 남이섬길 1',
    phone: '031-580-8114',
    ballrooms: ['메타세쿼이아 길', '잔디광장'],
    parkingInfo: '선착장 주차장',
    notes: '날씨 영향 큼, 예비일정 필수',
    isActive: true,
    createdAt: '2024-02-01',
    updatedAt: '2024-10-05'
  },
  {
    id: 'venue-005',
    name: '63스퀘어 아쿠아플라넷',
    type: 'other',
    address: '서울시 영등포구 63로 50',
    phone: '02-789-5663',
    ballrooms: ['아쿠아홀'],
    parkingInfo: '건물 내 주차장',
    notes: '수족관 배경, 독특한 분위기',
    isActive: false,
    createdAt: '2024-02-10',
    updatedAt: '2024-07-20'
  }
]

export const mockPartners: Partner[] = [
  {
    id: 'partner-001',
    name: '프리미엄 메이크업샵',
    type: 'makeup',
    contactPerson: '김미연',
    phone: '010-1234-5678',
    email: 'premium@makeup.com',
    address: '서울시 강남구 압구정로 456',
    website: 'https://premium-makeup.com',
    commissionRate: 15,
    notes: '웨딩 전문, 출장 가능',
    isActive: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-10-20'
  },
  {
    id: 'partner-002',
    name: '로즈 드레스샵',
    type: 'dress',
    contactPerson: '이수진',
    phone: '010-2345-6789',
    email: 'info@rosedress.com',
    address: '서울시 강남구 도산대로 789',
    website: 'https://rosedress.com',
    commissionRate: 10,
    notes: '드레스 + 턱시도 패키지',
    isActive: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-09-15'
  },
  {
    id: 'partner-003',
    name: '스튜디오 블루밍',
    type: 'studio',
    contactPerson: '박지훈',
    phone: '010-3456-7890',
    email: 'contact@blooming.studio',
    address: '서울시 마포구 연남동 123',
    website: 'https://blooming.studio',
    commissionRate: 20,
    notes: '본식 촬영 협업, 장비 대여 가능',
    isActive: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-10-01'
  },
  {
    id: 'partner-004',
    name: '웨딩플래너 by Grace',
    type: 'planner',
    contactPerson: '최은혜',
    phone: '010-4567-8901',
    email: 'grace@weddingplanner.com',
    website: 'https://graceplan.com',
    commissionRate: 12,
    notes: '전체 웨딩 플래닝, 프리미엄 고객 위주',
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-10-10'
  },
  {
    id: 'partner-005',
    name: '플라워하우스',
    type: 'florist',
    contactPerson: '정민아',
    phone: '010-5678-9012',
    email: 'info@flowerhouse.com',
    address: '서울시 서초구 반포대로 321',
    commissionRate: 8,
    notes: '부케, 테이블 장식, 예식장 꽃 세팅',
    isActive: true,
    createdAt: '2024-01-20',
    updatedAt: '2024-09-25'
  }
]

// ============================================================
// TEMPLATE PREVIEW HELPER
// ============================================================

export const previewTemplateWithVariables = (
  template: NotificationTemplate,
  variables: Record<string, string>
): { subject: string; body: string } => {
  let previewSubject = template.subject || ''
  let previewBody = template.body

  // Replace all variables
  Object.entries(variables).forEach(([key, value]) => {
    const regex = new RegExp(key.replace(/[{}]/g, '\\$&'), 'g')
    previewSubject = previewSubject.replace(regex, value)
    previewBody = previewBody.replace(regex, value)
  })

  return {
    subject: previewSubject,
    body: previewBody
  }
}

// Sample variables for preview
export const sampleTemplateVariables = {
  '{name}': '김철수 & 이영희',
  '{date}': '2025년 4월 12일 토요일',
  '{time}': '오후 2시',
  '{venue}': '더 그랜드 웨딩홀',
  '{package}': '프리미엄 웨딩 패키지',
  '{photographer}': '박작가',
  '{phone}': '02-1234-5678',
  '{portalUrl}': 'https://mindgraphy.com/c/demo-token-2025',
  '{proofUrl}': 'https://mindgraphy.com/c/demo-token-2025/proof',
  '{downloadUrl}': 'https://mindgraphy.com/c/demo-token-2025/download',
  '{totalPhotos}': '450',
  '{maxSelections}': '50',
  '{deadline}': '2025년 5월 12일',
  '{fileCount}': '50',
  '{expiryDate}': '2025년 6월 12일',
  '{downloadPassword}': '1234',
  '{deliveryItems}': '앨범 30P, USB',
  '{surveyUrl}': 'https://mindgraphy.com/survey/123'
}

