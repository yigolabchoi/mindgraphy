/**
 * Application Configuration
 * 환경 변수와 앱 설정을 중앙에서 관리
 */

// API Configuration
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  useMockApi: process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false',
} as const

// App Configuration
export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'MindGraphy',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  description: '웨딩 촬영 관리 시스템',
  version: '1.0.0',
} as const

// File Upload Configuration
export const UPLOAD_CONFIG = {
  maxFileSize: Number(process.env.NEXT_PUBLIC_MAX_FILE_SIZE) || 10 * 1024 * 1024, // 10MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  allowedDocumentTypes: ['application/pdf'],
  allowedVideoTypes: ['video/mp4', 'video/quicktime'],
} as const

// Pagination Configuration
export const PAGINATION_CONFIG = {
  defaultPageSize: 20,
  pageSizeOptions: [10, 20, 50, 100],
  maxPageSize: 100,
} as const

// Date Format Configuration
export const DATE_CONFIG = {
  displayFormat: 'yyyy년 MM월 dd일',
  displayWithTimeFormat: 'yyyy년 MM월 dd일 HH:mm',
  displayWithWeekdayFormat: 'yyyy년 MM월 dd일 (EEE)',
  isoFormat: "yyyy-MM-dd'T'HH:mm:ss'Z'",
  apiFormat: 'yyyy-MM-dd',
  timeFormat: 'HH:mm',
} as const

// Feature Flags
export const FEATURES = {
  enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  enableNotifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === 'true',
  debugMode: process.env.NODE_ENV === 'development',
} as const

// Storage Keys (for localStorage/sessionStorage)
export const STORAGE_KEYS = {
  authToken: 'auth_token',
  userPreferences: 'user_preferences',
  lastVisitedPage: 'last_visited_page',
  theme: 'theme',
} as const

// Gallery Configuration
export const GALLERY_CONFIG = {
  maxProofSelections: 50,
  maxDownloadCount: 5,
  thumbnailSize: 300,
  previewSize: 1200,
} as const

// Notification Configuration
export const NOTIFICATION_CONFIG = {
  autoHideDuration: 5000,
  maxNotifications: 5,
} as const

// Schedule Configuration
export const SCHEDULE_CONFIG = {
  workingHours: {
    start: '09:00',
    end: '22:00',
  },
  slotDuration: 30, // minutes
  travelTimeBuffer: 30, // minutes
} as const

// Validation Rules
export const VALIDATION_RULES = {
  password: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: false,
  },
  phone: {
    pattern: /^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/,
    format: 'XXX-XXXX-XXXX',
  },
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const

// Error Messages
export const ERROR_MESSAGES = {
  network: '네트워크 연결을 확인해주세요.',
  unauthorized: '로그인이 필요합니다.',
  forbidden: '접근 권한이 없습니다.',
  notFound: '요청한 리소스를 찾을 수 없습니다.',
  serverError: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  unknown: '알 수 없는 오류가 발생했습니다.',
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  created: '성공적으로 생성되었습니다.',
  updated: '성공적으로 수정되었습니다.',
  deleted: '성공적으로 삭제되었습니다.',
  saved: '저장되었습니다.',
} as const

