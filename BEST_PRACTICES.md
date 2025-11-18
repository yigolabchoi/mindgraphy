# 베스트 프랙티스 (Best Practices)

이 문서는 MindGraphy 프로젝트에서 따라야 할 코딩 표준과 베스트 프랙티스를 정의합니다.

---

## 📁 파일 및 폴더 구조

### 컴포넌트 조직
```
components/
├── common/          # 재사용 가능한 공통 컴포넌트
│   ├── kpi-card.tsx
│   ├── stat-card.tsx
│   └── index.ts     # 항상 index.ts로 export 통합
├── layout/          # 레이아웃 컴포넌트
├── calendar/        # 도메인별 컴포넌트
└── ...
```

### 네이밍 컨벤션
- **컴포넌트**: PascalCase (`KPICard.tsx`)
- **유틸리티**: camelCase (`status.utils.ts`)
- **타입**: PascalCase (`ProjectStatus`)
- **상수**: UPPER_SNAKE_CASE (`MAX_FILE_SIZE`)

---

## 🎨 컴포넌트 설계

### 1. 재사용 가능한 컴포넌트

**좋은 예**:
```typescript
interface KPICardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  className?: string
  onClick?: () => void
}

export function KPICard({ title, value, ... }: KPICardProps) {
  return (
    <Card className={cn("base-styles", className)}>
      {/* ... */}
    </Card>
  )
}
```

**나쁜 예**:
```typescript
// ❌ 너무 많은 props, 불명확한 타입
export function Card({ data, config, options }: any) {
  // ...
}
```

### 2. Props 타입 정의

**필수 사항**:
- 모든 props에 TypeScript 인터페이스 정의
- optional props는 `?` 사용
- 기본값은 destructuring에서 정의

```typescript
interface Props {
  // 필수
  id: string
  name: string
  
  // 선택적
  description?: string
  onClick?: () => void
  
  // 기본값 있음
  size?: 'sm' | 'md' | 'lg'
}

export function Component({ 
  id, 
  name, 
  description, 
  onClick,
  size = 'md' // 기본값
}: Props) {
  // ...
}
```

### 3. 조건부 스타일링

**권장**: `cn()` 유틸리티 사용
```typescript
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  error && "error-styles",
  className // 외부에서 전달된 클래스
)} />
```

**지양**: 문자열 결합
```typescript
// ❌
<div className={`base ${isActive ? 'active' : ''} ${className}`} />
```

---

## 🔧 상태 관리

### 1. Local State (useState)
단일 컴포넌트 내부 상태에 사용

```typescript
const [isOpen, setIsOpen] = useState(false)
const [formData, setFormData] = useState({ name: '', email: '' })
```

### 2. Global State (Zustand)
여러 컴포넌트에서 공유하는 상태

```typescript
// ✅ 좋은 예: 인증 상태
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
```

### 3. Server State
API 데이터는 React Query 사용 권장 (향후)

---

## 📊 데이터 흐름

### 1. Props Drilling 방지

**나쁜 예**:
```typescript
// ❌ 3단계 이상 props 전달
<Parent data={data}>
  <Child data={data}>
    <GrandChild data={data} />
  </Child>
</Parent>
```

**좋은 예**:
```typescript
// ✅ Context 또는 전역 상태 사용
const { data } = useDataContext()
// 또는
const data = useDataStore(state => state.data)
```

### 2. 데이터 변환은 유틸리티에서

```typescript
// ✅ 유틸리티 함수로 분리
import { formatDate, calculateProgress } from '@/lib/utils'

const formattedDate = formatDate(project.date)
const progress = calculateProgress(project)
```

```typescript
// ❌ 컴포넌트 내부에서 복잡한 로직
const formattedDate = new Date(project.date).toLocaleDateString('ko-KR', {...})
```

---

## 🎯 타입 안정성

### 1. any 타입 금지

**나쁜 예**:
```typescript
// ❌
const handleClick = (data: any) => { ... }
const [state, setState] = useState<any>(null)
```

**좋은 예**:
```typescript
// ✅
interface Project {
  id: string
  name: string
  status: ProjectStatus
}

const handleClick = (data: Project) => { ... }
const [state, setState] = useState<Project | null>(null)
```

### 2. 타입 추론 활용

```typescript
// ✅ 타입 추론
const items = mockData.map(item => ({
  id: item.id,
  label: item.name
}))

// items의 타입이 자동으로 추론됨
```

### 3. Generic 타입 사용

```typescript
// ✅ 재사용 가능한 타입
interface ApiResponse<T> {
  data: T
  status: number
  message: string
}

const response: ApiResponse<Project[]> = await api.get('/projects')
```

---

## ♿ 접근성 (Accessibility)

### 1. 키보드 네비게이션

```typescript
// ✅ 키보드 이벤트 처리
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }}
>
  Click me
</div>
```

### 2. Focus Ring

```typescript
// ✅ focus-ring 클래스 사용
<Button className="focus-ring">
  Click me
</Button>
```

### 3. ARIA 속성

```typescript
// ✅
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
>
  <X className="h-4 w-4" />
</button>
```

---

## 🎨 스타일링

### 1. Tailwind 클래스 순서

```typescript
// ✅ 권장 순서: layout → spacing → typography → colors → effects
<div className="
  flex flex-col          // layout
  gap-4 p-6              // spacing
  text-lg font-semibold  // typography
  text-gray-900          // colors
  rounded-lg shadow-md   // effects
  hover:shadow-lg        // pseudo-classes
  transition-all         // transitions
" />
```

### 2. 커스텀 애니메이션

```typescript
// ✅ globals.css의 유틸리티 사용
<div className="animate-in fade-in slide-in-from-bottom" />

// ✅ 지연 시간 추가
<div 
  className="animate-in fade-in"
  style={{ animationDelay: `${index * 50}ms` }}
/>
```

### 3. 반응형 디자인

```typescript
// ✅ 모바일 우선
<div className="
  text-sm              // 기본 (모바일)
  md:text-base         // 태블릿
  lg:text-lg           // 데스크톱
" />
```

---

## 🔍 성능 최적화

### 1. 메모이제이션

```typescript
// ✅ 비용이 큰 계산은 useMemo
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

// ✅ 콜백은 useCallback
const handleClick = useCallback(() => {
  // ...
}, [dependencies])
```

### 2. 조건부 렌더링

```typescript
// ✅ 조기 반환
if (!data) {
  return <LoadingSkeleton />
}

return <DataView data={data} />
```

### 3. 리스트 렌더링

```typescript
// ✅ 항상 key 사용
{items.map((item, index) => (
  <Item 
    key={item.id}  // ✅ 고유한 ID 사용
    data={item} 
  />
))}

// ❌ index를 key로 사용하지 않기
{items.map((item, index) => (
  <Item key={index} data={item} /> // ❌
))}
```

---

## 🧪 테스트 (향후)

### 1. 컴포넌트 테스트

```typescript
// 테스트 가능한 구조
export function Component({ data, onClick }: Props) {
  // 로직 분리
  const processedData = useProcessData(data)
  
  return (
    <div data-testid="component">
      {/* ... */}
    </div>
  )
}
```

### 2. 유틸리티 함수 테스트

```typescript
// ✅ 순수 함수는 테스트하기 쉬움
export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

// 테스트
expect(calculateProgress(5, 10)).toBe(50)
expect(calculateProgress(0, 10)).toBe(0)
expect(calculateProgress(5, 0)).toBe(0)
```

---

## 📝 문서화

### 1. 컴포넌트 문서

```typescript
/**
 * KPI Card component for displaying key metrics
 * 
 * @example
 * ```tsx
 * <KPICard
 *   title="Total Users"
 *   value={1234}
 *   icon={Users}
 *   description="Active users this month"
 * />
 * ```
 */
export function KPICard({ ... }: KPICardProps) {
  // ...
}
```

### 2. 유틸리티 함수 문서

```typescript
/**
 * Format a date string to Korean locale format
 * @param date - ISO date string or Date object
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  // ...
}
```

---

## 🚫 안티패턴

### 1. 컴포넌트에서 API 호출

```typescript
// ❌ 나쁜 예
export function Component() {
  useEffect(() => {
    fetch('/api/data').then(res => {
      // ...
    })
  }, [])
}

// ✅ 좋은 예: 서비스 레이어 사용
import { apiService } from '@/lib/services/api'

export function Component() {
  useEffect(() => {
    apiService.getData().then(data => {
      // ...
    })
  }, [])
}
```

### 2. 인라인 스타일

```typescript
// ❌
<div style={{ marginTop: '20px', color: 'red' }}>

// ✅
<div className="mt-5 text-red-600">
```

### 3. 중복 코드

```typescript
// ❌ 여러 곳에서 반복
<Card className="hover:shadow-md transition-shadow">
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
</Card>

// ✅ 재사용 가능한 컴포넌트로 추출
<StatCard title="..." icon={Icon}>
  {children}
</StatCard>
```

---

## ✅ 체크리스트

새로운 기능을 추가할 때 다음을 확인하세요:

- [ ] TypeScript 타입이 정의되어 있는가?
- [ ] any 타입을 사용하지 않았는가?
- [ ] 재사용 가능한 컴포넌트로 분리했는가?
- [ ] 접근성 (a11y)를 고려했는가?
- [ ] 반응형 디자인이 적용되었는가?
- [ ] Linter 에러가 없는가?
- [ ] 불필요한 console.log가 제거되었는가?
- [ ] 문서화가 되어 있는가?

---

**마지막 업데이트**: 2025-11-17
**담당자**: Development Team

