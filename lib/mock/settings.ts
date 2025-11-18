import { format } from 'date-fns'
import type { Product, Policy, ContractTemplate, ContractArticle } from '@/lib/types'

// ============================================================
// PRODUCTS, OPTIONS, POLICIES
// ============================================================

// ============================================================
// BASE PRODUCTS (본식스냅 상품)
// ============================================================

export const baseProducts: Product[] = [
  {
    id: 'new-basic',
    name: 'new BASIC',
    category: 'SNAP',
    title: '본식스냅 앨범형 기본상품',
    description: [
      '1인 작가 진행',
      '예식 시작시간 기준 1시간30분 전 시작, 연회장 촬영 1인 작가 진행 후 마무리',
      '13x10인치 합본(스냅·원판) 앨범 60페이지 1권',
      '11x8.5인치 미니합본(스냅·원판) 앨범 60페이지 2권',
      '최종본 60장 (고객셀렉, 세부보정 적용)',
      '웹갤러리 제공 (사진링크, 다운로드링크)',
      '전체원본 제공 (다운로드링크)'
    ],
    albumIncluded: true,
    photoCount: 60,
    albumPages: 60,
    miniAlbums: 2,
    basePrice: 1210000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'new-data',
    name: 'new DATA',
    category: 'SNAP',
    title: '본식스냅 데이터형 기본상품',
    description: [
      '1인 작가 진행',
      '예식 시작시간 기준 1시간30분 전 시작, 연회장 촬영 1인 작가 진행 후 마무리',
      '최종본 65장 (고객셀렉, 세부보정 적용)',
      '웹갤러리 제공 (사진링크, 다운로드링크)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 65,
    basePrice: 990000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'basic',
    name: 'BASIC',
    category: 'SNAP',
    title: '본식스냅 앨범형 기본상품',
    description: [
      '1인 작가 진행',
      '예식 시작시간 기준 1시간30분 전 시작, 연회장 촬영 1인 작가 진행 후 마무리',
      '13x10인치 합본(스냅·원판) 앨범 50페이지 1권',
      '11x8.5인치 미니합본(스냅·원판) 앨범 50페이지 2권',
      '최종본 50장 (고객셀렉, 세부보정 적용)',
      '웹갤러리 제공 (사진링크, 다운로드링크)',
      '전체원본 제공 (다운로드링크)'
    ],
    albumIncluded: true,
    photoCount: 50,
    albumPages: 50,
    miniAlbums: 2,
    basePrice: 1020000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'data',
    name: 'DATA',
    category: 'SNAP',
    title: '본식스냅 데이터형 기본상품',
    description: [
      '1인 작가 진행',
      '예식 시작시간 기준 1시간30분 전 시작, 연회장 촬영 1인 작가 진행 후 마무리',
      '최종본 60장 (고객셀렉, 세부보정 적용)',
      '웹갤러리 제공 (사진링크, 다운로드링크)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 60,
    basePrice: 930000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  }
]

// ============================================================
// HANBOK & CASUAL PRODUCTS
// ============================================================

export const hanbokProducts: Product[] = [
  {
    id: 'hanbok-a1',
    name: 'A-1',
    category: 'SNAP',
    title: '야외 촬영 기본',
    description: [
      '1인 작가 진행',
      '3시간 촬영 진행 (이동, 준비, 모니터링 시간 포함)',
      '장소 한 곳에서 촬영 진행 (장소 비용 별도)',
      '의상 한 가지 컨셉',
      '최종본 20장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 20,
    basePrice: 800000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'hanbok-a2',
    name: 'A-2',
    category: 'SNAP',
    title: '야외 촬영 추가',
    description: [
      '1인 작가 진행',
      '4시간 촬영 진행 (이동, 준비, 모니터링 시간 포함)',
      '장소 두 곳에서 촬영 진행 (장소 비용 별도)',
      '의상 두 가지 컨셉',
      '최종본 35장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 35,
    basePrice: 1150000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'hanbok-b1',
    name: 'B-1',
    category: 'SNAP',
    title: '야외 촬영 + 실내 스튜디오',
    description: [
      '1인 작가 진행',
      '4시간 촬영 진행 (이동, 준비, 모니터링 시간 포함)',
      '장소 한 곳 + 실내 스튜디오 촬영',
      '의상 두 가지 컨셉',
      '최종본 30장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 30,
    basePrice: 1200000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'hanbok-b2',
    name: 'B-2',
    category: 'SNAP',
    title: '야외 촬영 + 실내 스튜디오',
    description: [
      '1인 작가 진행',
      '5시간 촬영 진행 (이동, 준비, 모니터링 시간 포함)',
      '장소 두 곳 + 실내 스튜디오 촬영',
      '의상 세 가지 컨셉',
      '최종본 50장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 50,
    basePrice: 1500000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'hanbok-c1',
    name: 'C-1',
    category: 'SNAP',
    title: '야외 촬영만 + 추가 시간',
    description: [
      '1인 작가 진행',
      '5시간 촬영 진행 (이동, 준비, 모니터링 시간 포함)',
      '장소 두 곳에서 촬영 진행 (장소 비용 별도)',
      '의상 두 가지 컨셉',
      '최종본 40장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 40,
    basePrice: 1300000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'hanbok-c2',
    name: 'C-2',
    category: 'SNAP',
    title: '야외 촬영 + 실내 + 추가 시간',
    description: [
      '1인 작가 진행',
      '6시간 촬영 진행 (이동, 준비, 모니터링 시간 포함)',
      '장소 세 곳 + 실내 스튜디오 촬영',
      '의상 세 가지 컨셉',
      '최종본 60장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 60,
    basePrice: 1700000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'hanbok-d1',
    name: 'D-1',
    category: 'SNAP',
    title: '실내(흰색배경) 스튜디오',
    description: [
      '1인 작가 진행',
      '2시간 촬영 진행 (실내 촬영만 진행, 준비 및 모니터링 시간 포함)',
      '장소 한 곳에서 촬영 진행 (스튜디오 장소금액 포함)',
      '의상 한 가지 컨셉',
      '최종본 3장 (고객셀렉, 세부보정)',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 3,
    basePrice: 500000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  }
]

// ============================================================
// DRESS SHOP & BABY PRODUCTS
// ============================================================

export const dressShopProducts: Product[] = [
  {
    id: 'dress-shop-1',
    name: 'DRESS SHOP',
    category: 'SNAP',
    title: '가봉 스냅',
    description: [
      '1인 대표작가 촬영 진행',
      '최종본 10장 (고객셀렉, 세부보정)',
      '20x16 아크릴 액자 1개',
      '전체원본 제공'
    ],
    albumIncluded: false,
    photoCount: 10,
    basePrice: 550000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  }
]

export const babyProducts: Product[] = [
  {
    id: 'baby-1',
    name: 'BABY',
    category: 'SNAP',
    title: '돌스냅 행사 촬영',
    description: [
      '2인 (작가 + 작가) 진행',
      '돌잔치 행사 촬영',
      '13x10인치 화보앨범 50페이지 1권',
      '14x14인치 액자 1개',
      '최종본 50장 (고객셀렉, 세부보정 적용)',
      '전체원본 제공'
    ],
    albumIncluded: true,
    photoCount: 50,
    basePrice: 660000,
    delivery: { 
      includesWebGallery: true, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  }
]

// ============================================================
// OPTION PRODUCTS (추가 옵션 항목)
// ============================================================

export const optionProducts: Product[] = [
  {
    id: 'option-1',
    name: 'Option 1',
    category: 'OPTION',
    title: '대표작가 지정',
    description: ['대표작가 지정 촬영 상품'],
    albumIncluded: false,
    photoCount: 0,
    basePrice: 440000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: false 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'option-2',
    name: 'Option 2',
    category: 'OPTION',
    title: '2인 작가 진행',
    description: [
      '기본상품에서 최종본 20장 업그레이드',
      '앨범이 포함된 경우 각 20페이지씩 업그레이드'
    ],
    albumIncluded: true,
    photoCount: 20,
    basePrice: 330000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: false 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'option-3',
    name: 'Option 3',
    category: 'OPTION',
    title: '메이크업샵부터 촬영',
    description: ['메이크업샵 촬영 포함'],
    albumIncluded: false,
    photoCount: 0,
    basePrice: 250000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: false 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'option-y',
    name: 'Option Y',
    category: 'OPTION',
    title: '이사 지정 촬영',
    description: ['이사 지정 작가 촬영 상품'],
    albumIncluded: false,
    photoCount: 0,
    basePrice: 330000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: false 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'option-s',
    name: 'Option S',
    category: 'OPTION',
    title: '수석작가 지정 촬영',
    description: ['수석작가 지정 촬영 상품'],
    albumIncluded: false,
    photoCount: 0,
    basePrice: 220000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: false 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'option-iphone',
    name: 'Option iPhone',
    category: 'OPTION',
    title: '아이폰 스냅 촬영',
    description: [
      '여성 작가 1인 진행',
      '예식 시작 1시간30분 전부터 원판 촬영 직후까지',
      '연회장 이후 30여 장 현장 베스트컷 제공',
      '작가셀렉 최종본 10장 (세부보정) 48시간 이내 제공',
      '아이폰 촬영은 앨범 수록 불가'
    ],
    albumIncluded: false,
    photoCount: 10,
    basePrice: 330000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: true 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  },
  {
    id: 'option-early',
    name: 'EARLY',
    category: 'OPTION',
    title: '얼리 진행',
    description: [
      '예식 시작시간 기준 1시간30분보다 일찍 시작하는 경우 적용',
      '1인 작가당 적용'
    ],
    albumIncluded: false,
    photoCount: 0,
    basePrice: 55000,
    delivery: { 
      includesWebGallery: false, 
      includesRawDownload: false 
    },
    isActive: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-11-12'
  }
]

// Combined product list for easier access
export const mockProducts: Product[] = [...baseProducts, ...hanbokProducts, ...dressShopProducts, ...babyProducts, ...optionProducts]

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

// ============================================================
// CONTRACT
// ============================================================

export const mockContractTemplate: ContractTemplate = {
  id: 'contract-template-001',
  name: '웨딩 촬영 서비스 이용 계약서',
  version: 'v1.0',
  title: '웨딩 촬영 서비스 이용 계약서',
  description: '본 계약서는 마인드그라피(이하 "회사")와 고객 간의 웨딩 촬영 서비스 제공에 관한 계약입니다',
  articles: [
    {
      id: 'article-1',
      order: 1,
      title: '제1조 (계약 당사자)',
      content: [
        '회사: 마인드그라피',
        '주소: 서울 성동구 마조로15길 6 1층',
        '전화: 02-2202-9966',
        '',
        '고객: 예식 당사자 (본 계약서 하단 서명자)'
      ]
    },
    {
      id: 'article-2',
      order: 2,
      title: '제2조 (촬영 서비스 내용)',
      content: [
        '① 촬영 일시: {weddingDate} {weddingTime}',
        '② 촬영 장소: {venue}',
        '③ 선택 상품: {packageName}',
        '※ 상품 세부 내용은 마인드그라피 상품 안내서를 따릅니다'
      ]
    },
    {
      id: 'article-3',
      order: 3,
      title: '제3조 (계약 금액 및 지불 조건)',
      content: [
        '① 총 계약 금액: {totalAmount}',
        '② 계약금 (선불): {depositAmount}',
        '③ 잔금: {balanceAmount}',
        '※ 계약금은 계약 체결 후 7일 이내 입금',
        '※ 잔금은 촬영일 7일 전까지 입금'
      ]
    },
    {
      id: 'article-4',
      order: 4,
      title: '제4조 (회사의 의무)',
      content: [
        '① 회사는 계약된 일시 및 장소에서 성실히 촬영을 진행합니다',
        '② 회사는 촬영 후 14일 이내에 프루프 사진을 제공합니다',
        '③ 회사는 고객이 선택한 사진에 대해 세부 보정을 진행합니다',
        '④ 회사는 최종 결과물을 촬영일로부터 60일 이내에 배송합니다'
      ]
    },
    {
      id: 'article-5',
      order: 5,
      title: '제5조 (고객의 의무)',
      content: [
        '① 고객은 계약금 및 잔금을 기한 내에 지불해야 합니다',
        '② 고객은 촬영 일정 및 장소 변경 시 최소 7일 전에 통보해야 합니다',
        '③ 고객은 프루프 사진 선택을 14일 이내에 완료해야 합니다',
        '④ 고객은 촬영에 필요한 정보를 사전 미팅 시 제공해야 합니다'
      ]
    },
    {
      id: 'article-6',
      order: 6,
      title: '제6조 (취소 및 환불 규정)',
      content: [
        '① 촬영일 30일 전: 전액 환불',
        '② 촬영일 14~29일 전: 50% 환불',
        '③ 촬영일 7~13일 전: 30% 환불',
        '④ 촬영일 6일 전 이내: 환불 불가',
        '※ 회사 귀책 사유로 인한 취소는 전액 환불'
      ]
    },
    {
      id: 'article-7',
      order: 7,
      title: '제7조 (저작권 및 초상권)',
      content: [
        '① 모든 사진의 저작권은 회사에 귀속됩니다',
        '② 고객은 개인적 용도로만 사진을 사용할 수 있습니다',
        '③ 상업적 이용, 재판매, 2차 저작물 제작은 금지됩니다',
        '④ 회사는 고객의 동의 하에 포트폴리오 및 홍보 목적으로 사진을 사용할 수 있습니다'
      ]
    },
    {
      id: 'article-8',
      order: 8,
      title: '제8조 (불가항력)',
      content: [
        '천재지변, 전쟁, 감염병 등 불가항력적 사유로 인해 계약 이행이 불가능한 경우, 양 당사자는 협의하여 일정을 재조정하거나 계약을 해지할 수 있습니다.'
      ]
    },
    {
      id: 'article-9',
      order: 9,
      title: '제9조 (분쟁 해결)',
      content: [
        '본 계약과 관련된 분쟁은 상호 협의하여 해결하며, 협의가 이루어지지 않을 경우 회사 소재지 관할 법원에서 해결합니다.'
      ]
    }
  ],
  footer: '계약 체결일: {contractDate}',
  importantNotice: '본 계약서는 전자 문서로 작성되었으며, 하단에 성명을 입력하고 "계약 확인 및 동의" 버튼을 클릭하는 것으로 계약이 체결되고 법적 효력이 발생합니다. 계약 체결 후에는 위 취소 및 환불 규정이 적용됩니다.',
  effectiveDate: '2025-01-01',
  isActive: true,
  createdAt: '2025-01-01',
  updatedAt: '2025-01-01'
}

