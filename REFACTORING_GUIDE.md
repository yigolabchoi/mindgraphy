# 리팩토링 가이드 (Refactoring Guide)

## 📋 목차 (Table of Contents)

1. [개요](#개요)
2. [디렉토리 구조](#디렉토리-구조)
3. [타입 시스템](#타입-시스템)
4. [API 레이어](#api-레이어)
5. [유틸리티 함수](#유틸리티-함수)
6. [Custom Hooks](#custom-hooks)
7. [설정 관리](#설정-관리)
8. [백엔드 연동 가이드](#백엔드-연동-가이드)
9. [마이그레이션 가이드](#마이그레이션-가이드)

---

## 개요

이 프로젝트는 전문가 수준의 코드 품질을 유지하고 백엔드 연동을 쉽게 하기 위해 리팩토링되었습니다.

### 주요 개선사항

- ✅ **타입 안전성 강화**: 모든 타입 정의 중앙화 및 체계화
- ✅ **API 레이어 추상화**: Mock/Real API 분리로 백엔드 연동 준비
- ✅ **유틸리티 모듈화**: 테스트 가능한 순수 함수로 분리
- ✅ **에러 핸들링**: 통합 에러 처리 및 사용자 피드백
- ✅ **설정 중앙화**: 환경 변수 및 앱 설정 통합 관리
- ✅ **Custom Hooks**: 재사용 가능한 로직 캡슐화

---

## 디렉토리 구조

```
lib/
├── config/              # 설정 파일
│   ├── app.config.ts    # 앱 전역 설정
│   └── navigation.ts    # 네비게이션 설정
├── types/               # TypeScript 타입 정의
│   ├── common.ts        # 공통 타입 (API, Pagination 등)
│   ├── auth.ts          # 인증 관련 타입
│   └── project-detail.ts # 프로젝트 상세 타입
├── services/            # API 서비스 레이어
│   ├── api.service.ts   # 실제 API 클라이언트
│   └── mock-api.service.ts # Mock API (개발용)
├── utils/               # 유틸리티 함수
│   ├── date.utils.ts    # 날짜 관련
│   ├── format.utils.ts  # 포맷팅 관련
│   ├── validation.utils.ts # 유효성 검증
│   ├── status.utils.ts  # 상태 관련
│   └── index.ts         # 통합 export
├── hooks/               # Custom React Hooks
│   ├── use-async.ts     # 비동기 작업 처리
│   ├── use-api.ts       # API 호출 처리
│   └── index.ts         # 통합 export
├── mock/                # Mock 데이터
│   ├── admin.ts
│   ├── schedules.ts
│   ├── me.ts
│   └── ...
├── types.ts             # 메인 타입 정의 (유지)
├── constants.ts         # 상수 정의
├── mock-data.ts         # 통합 mock 데이터
└── utils.ts             # 호환성 유지용 (deprecated)
```

---

## 타입 시스템

### 공통 타입 (`lib/types/common.ts`)

모든 API 응답과 공통 데이터 구조를 위한 타입:

```typescript
// API 응답 타입
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ResponseMeta
}

// Pagination 타입
interface PaginatedResponse<T> {
  items: T[]
  pagination: PaginationInfo
}

// 로딩 상태
type LoadingState = 'idle' | 'loading' | 'success' | 'error'
```

### 도메인 타입 (`lib/types.ts`)

비즈니스 도메인별 타입 정의:

```typescript
// 사용자 타입
interface User {
  id: string
  email: string
  role: UserRole
  // ...
}

// 프로젝트 타입
interface Project {
  id: string
  projectNumber: string
  projectStatus: ProjectStatus
  // ...
}
```

---

## API 레이어

### API Service (`lib/services/api.service.ts`)

실제 백엔드 API 호출을 위한 서비스:

```typescript
import { apiService } from '@/lib/services/api.service'

// GET 요청
const response = await apiService.get<Project[]>('/projects')

// POST 요청
const response = await apiService.post<Project>('/projects', {
  name: 'New Project',
  status: 'active'
})

// 파일 업로드
const response = await apiService.upload<UploadedFile>(
  '/upload',
  file,
  {},
  (progress) => console.log(`${progress}%`)
)
```

### Mock API Service (`lib/services/mock-api.service.ts`)

개발 중 사용할 Mock API:

```typescript
import { mockApiService } from '@/lib/services/mock-api.service'

// 로그인
const response = await mockApiService.login(email, password)

// 프로젝트 목록 조회
const response = await mockApiService.getProjects({
  page: 1,
  limit: 20,
  status: 'in_progress'
})
```

### Feature Flag로 전환

```typescript
// lib/services/mock-api.service.ts
export const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false'

// 사용 예시
import { USE_MOCK_API } from '@/lib/services/mock-api.service'
import { apiService } from '@/lib/services/api.service'
import { mockApiService } from '@/lib/services/mock-api.service'

const service = USE_MOCK_API ? mockApiService : apiService
```

---

## 유틸리티 함수

### 날짜 유틸리티 (`lib/utils/date.utils.ts`)

```typescript
import { 
  formatDate, 
  formatDateWithWeekday,
  calculateDDay,
  formatDDay,
  getRelativeTime 
} from '@/lib/utils'

// 날짜 포맷
formatDate('2024-01-15') // '2024년 1월 15일'
formatDateWithWeekday('2024-01-15') // '2024년 1월 15일 (월)'

// D-Day 계산
const dday = calculateDDay('2024-12-31') // 5
formatDDay(5) // 'D-5'

// 상대 시간
getRelativeTime(new Date()) // '방금 전'
```

### 포맷 유틸리티 (`lib/utils/format.utils.ts`)

```typescript
import { 
  formatCurrency,
  formatCurrencyToManwon,
  formatPhoneNumber,
  formatFileSize,
  truncateText 
} from '@/lib/utils'

// 통화 포맷
formatCurrency(1000000) // '₩1,000,000'
formatCurrencyToManwon(1000000) // '100만원'

// 전화번호 포맷
formatPhoneNumber('01012345678') // '010-1234-5678'

// 파일 크기
formatFileSize(1048576) // '1 MB'

// 텍스트 자르기
truncateText('Hello World', 5) // 'Hello...'
```

### 유효성 검증 (`lib/utils/validation.utils.ts`)

```typescript
import { 
  isValidEmail,
  isValidPhoneNumber,
  isValidPassword 
} from '@/lib/utils'

// 이메일 검증
isValidEmail('test@example.com') // true

// 전화번호 검증
isValidPhoneNumber('010-1234-5678') // true

// 비밀번호 검증
const { isValid, errors } = isValidPassword('Pass123!')
```

### 상태 유틸리티 (`lib/utils/status.utils.ts`)

```typescript
import { 
  getStatusColor,
  getStatusLabel,
  getNextStatuses,
  isValidStatusTransition 
} from '@/lib/utils'

// 상태 색상
getStatusColor('in_progress') // 'bg-yellow-100 text-yellow-800'

// 상태 라벨
getStatusLabel('in_progress') // '진행중'

// 다음 가능한 상태
getNextStatuses('in_progress') // ['proof_ready', 'archived']

// 상태 전환 가능 여부
isValidStatusTransition('in_progress', 'completed') // false
```

---

## Custom Hooks

### useAsync Hook

비동기 작업을 처리하는 범용 Hook:

```typescript
import { useAsync } from '@/lib/hooks'

function MyComponent() {
  const { data, isLoading, error, execute } = useAsync(
    async (id: string) => fetchUser(id),
    {
      onSuccess: (data) => console.log('Success!', data),
      onError: (error) => console.error('Error:', error),
      immediate: false
    }
  )
  
  useEffect(() => {
    execute('user-123')
  }, [])
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  
  return <div>{data?.name}</div>
}
```

### useApi Hook

API 호출을 위한 전용 Hook (자동 에러 처리 및 Toast):

```typescript
import { useApi } from '@/lib/hooks'
import { mockApiService } from '@/lib/services/mock-api.service'

function ProjectList() {
  const { data, isLoading, execute } = useApi(
    () => mockApiService.getProjects({ page: 1, limit: 20 }),
    {
      showSuccessToast: true,
      successMessage: '프로젝트를 불러왔습니다.',
      immediate: true
    }
  )
  
  if (isLoading) return <LoadingSkeleton />
  
  return (
    <div>
      {data?.items.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
```

### useMutation Hook

데이터 변경 작업(POST, PUT, DELETE)을 위한 Hook:

```typescript
import { useMutation } from '@/lib/hooks'
import { mockApiService } from '@/lib/services/mock-api.service'

function CreateProjectForm() {
  const { isLoading, execute } = useMutation(
    (data: CreateProjectDto) => apiService.post('/projects', data),
    {
      successMessage: '프로젝트가 생성되었습니다.',
      onSuccess: () => {
        // Redirect or refresh
      }
    }
  )
  
  const handleSubmit = async (formData) => {
    await execute(formData)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? '생성 중...' : '프로젝트 생성'}
      </button>
    </form>
  )
}
```

---

## 설정 관리

### 앱 설정 (`lib/config/app.config.ts`)

모든 앱 설정을 중앙에서 관리:

```typescript
import { 
  API_CONFIG,
  APP_CONFIG,
  UPLOAD_CONFIG,
  DATE_CONFIG,
  FEATURES 
} from '@/lib/config/app.config'

// API 설정
API_CONFIG.baseURL // 'http://localhost:3001/api'
API_CONFIG.timeout // 30000

// 앱 정보
APP_CONFIG.name // 'MindGraphy'
APP_CONFIG.version // '1.0.0'

// 업로드 설정
UPLOAD_CONFIG.maxFileSize // 10485760 (10MB)
UPLOAD_CONFIG.allowedImageTypes // ['image/jpeg', ...]

// Feature Flags
FEATURES.enableAnalytics // false
FEATURES.debugMode // true (in development)
```

### 환경 변수

다음 환경 변수를 설정할 수 있습니다:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_USE_MOCK_API=true
NEXT_PUBLIC_APP_NAME=MindGraphy
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

---

## 백엔드 연동 가이드

### 1단계: 환경 변수 설정

```bash
# .env.production
NEXT_PUBLIC_API_URL=https://api.mindgraphy.com
NEXT_PUBLIC_USE_MOCK_API=false
```

### 2단계: API Service 전환

```typescript
// 자동으로 환경 변수에 따라 전환됨
import { USE_MOCK_API } from '@/lib/services/mock-api.service'

// 또는 명시적으로 사용
import { apiService } from '@/lib/services/api.service'

const response = await apiService.get<Project[]>('/projects')
```

### 3단계: 인증 토큰 관리

```typescript
import { TokenManager } from '@/lib/services/api.service'

// 로그인 후 토큰 저장
TokenManager.setToken(response.token)

// 로그아웃 시 토큰 제거
TokenManager.removeToken()

// API 호출 시 자동으로 토큰이 헤더에 포함됨
```

### 4단계: 에러 처리

```typescript
import { ApiServiceError } from '@/lib/services/api.service'
import { useApi } from '@/lib/hooks'

// Hook 사용 시 자동 에러 처리
const { data, error } = useApi(
  () => apiService.get('/projects'),
  { showErrorToast: true }
)

// 수동 처리
try {
  const response = await apiService.get('/projects')
} catch (error) {
  if (error instanceof ApiServiceError) {
    console.error(`Error ${error.code}: ${error.message}`)
    console.error('Status:', error.status)
    console.error('Details:', error.details)
  }
}
```

---

## 마이그레이션 가이드

### 기존 코드에서 새 코드로 마이그레이션

#### 1. 유틸리티 함수 import 변경

```typescript
// ❌ 기존 (여전히 작동하지만 deprecated)
import { formatDate, formatCurrency } from '@/lib/utils'

// ✅ 새로운 방식
import { formatDate, formatCurrency } from '@/lib/utils'
// (같은 경로지만 내부적으로 모듈화됨)
```

#### 2. 직접 API 호출을 Hook으로 변경

```typescript
// ❌ 기존
function MyComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    setLoading(true)
    fetch('/api/projects')
      .then(res => res.json())
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])
  
  // ...
}

// ✅ 새로운 방식
function MyComponent() {
  const { data, isLoading, error } = useApi(
    () => mockApiService.getProjects(),
    { immediate: true }
  )
  
  // ...
}
```

#### 3. 상태 관리 개선

```typescript
// ❌ 기존
const [status, setStatus] = useState('scheduled')
const statusLabel = status === 'scheduled' ? '예정' : 
                   status === 'in_progress' ? '진행중' : '완료'

// ✅ 새로운 방식
import { getStatusLabel, getStatusColor } from '@/lib/utils'

const statusLabel = getStatusLabel(status)
const statusColor = getStatusColor(status)
```

#### 4. 날짜 포맷팅 개선

```typescript
// ❌ 기존
const formatted = new Date(date).toLocaleDateString('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// ✅ 새로운 방식
import { formatDate, formatDateWithWeekday } from '@/lib/utils'

const formatted = formatDate(date)
const withWeekday = formatDateWithWeekday(date)
```

---

## 베스트 프랙티스

### 1. 타입 안전성

- 모든 API 응답에 `ApiResponse<T>` 타입 사용
- `unknown` 대신 구체적인 타입 정의
- Optional chaining (`?.`)과 Nullish coalescing (`??`) 활용

### 2. 에러 처리

- `useApi` Hook으로 자동 에러 처리
- 사용자 친화적인 에러 메시지 제공
- 네트워크 에러, 인증 에러 등 구분하여 처리

### 3. 성능 최적화

- React.memo 사용으로 불필요한 리렌더링 방지
- useCallback, useMemo 적절히 활용
- 큰 리스트는 가상 스크롤링 고려

### 4. 코드 재사용성

- Custom Hooks로 로직 추출
- 유틸리티 함수는 순수 함수로 작성
- 컴포넌트는 작고 단일 책임 원칙 준수

### 5. 테스트 가능성

- 순수 함수로 유틸리티 작성
- Mock API 서비스로 테스트 용이
- Props를 명시적으로 정의

---

## 추가 작업 제안

향후 개선을 위한 제안사항:

1. **Unit Tests 추가**
   - 유틸리티 함수 테스트 (Jest)
   - Custom Hooks 테스트 (React Testing Library)

2. **E2E Tests**
   - Playwright 또는 Cypress로 주요 플로우 테스트

3. **Storybook 도입**
   - UI 컴포넌트 문서화 및 시각적 테스트

4. **성능 모니터링**
   - Sentry 또는 LogRocket 연동
   - 에러 추적 및 성능 메트릭 수집

5. **CI/CD 파이프라인**
   - GitHub Actions로 자동 빌드 및 테스트
   - Vercel 또는 AWS로 자동 배포

---

## 문의 및 지원

리팩토링 관련 질문이나 제안사항이 있으시면:

- 코드 리뷰 요청
- 이슈 등록
- 팀 미팅에서 논의

**Happy Coding! 🚀**

