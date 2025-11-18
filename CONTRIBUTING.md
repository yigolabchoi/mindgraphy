# Contributing to MindGraphy

마인드그라피 프로젝트에 기여해 주셔서 감사합니다! 🎉

## 개발 환경 설정

### 요구사항
- Node.js 18.0 이상
- npm 또는 yarn
- Git

### 초기 설정
```bash
# 저장소 포크 및 클론
git clone [your-fork-url]
cd mindgraphy

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local

# 개발 서버 실행
npm run dev
```

## 개발 가이드

### 브랜치 전략
- `main`: 프로덕션 코드
- `develop`: 개발 브랜치
- `feature/기능명`: 새 기능 개발
- `fix/버그명`: 버그 수정
- `refactor/내용`: 리팩토링

### 커밋 메시지 규칙
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅 (기능 변경 없음)
- `refactor`: 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정 등

**예시:**
```
feat: 고객 포털 사진 셀렉 기능 추가

- 고객이 원하는 사진을 선택할 수 있는 UI 추가
- 선택 완료 시 알림 기능 구현

Closes #123
```

### 코드 스타일

#### TypeScript
```typescript
// ✅ Good
interface Props {
  name: string
  age: number
}

export function Component({ name, age }: Props) {
  return <div>{name}</div>
}

// ❌ Bad
function Component(props: any) {
  return <div>{props.name}</div>
}
```

#### React
```typescript
// ✅ Good
'use client'

import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}

// ❌ Bad
export function Counter() {
  let count = 0
  return <button onClick={() => count++}>Count: {count}</button>
}
```

#### CSS/Tailwind
```tsx
// ✅ Good
<div className="flex items-center gap-4 px-4 py-2">
  <span className="text-sm text-zinc-600">Hello</span>
</div>

// ❌ Bad
<div className="flex items-center    gap-4   px-4 py-2  ">
  <span className="text-sm    text-zinc-600">Hello</span>
</div>
```

### 파일 구조
```
components/
├── ui/              # shadcn/ui 컴포넌트
├── common/          # 공통 컴포넌트
│   ├── button.tsx
│   └── index.ts    # 배럴 export
└── feature/         # 기능별 컴포넌트
    ├── feature-component.tsx
    └── feature-dialog.tsx
```

### 네이밍 규칙

#### 파일
- 컴포넌트: `PascalCase.tsx`
- 유틸: `camelCase.ts`
- 타입: `types.ts` 또는 `feature.types.ts`

#### 변수/함수
```typescript
// 변수: camelCase
const userName = 'John'

// 함수: camelCase
function getUserName() {}

// 컴포넌트: PascalCase
function UserProfile() {}

// 상수: UPPER_SNAKE_CASE
const API_URL = 'https://api.example.com'

// 타입/인터페이스: PascalCase
interface User {}
type UserRole = 'admin' | 'user'
```

## Pull Request 프로세스

### 1. 이슈 생성 (선택사항)
기능 개발이나 버그 수정 전에 이슈를 먼저 생성하는 것을 권장합니다.

### 2. 브랜치 생성
```bash
git checkout -b feature/amazing-feature
```

### 3. 개발 및 커밋
```bash
git add .
git commit -m "feat: 멋진 기능 추가"
```

### 4. 푸시
```bash
git push origin feature/amazing-feature
```

### 5. PR 생성
- 명확한 제목 작성
- 변경 사항 설명
- 스크린샷 첨부 (UI 변경 시)
- 관련 이슈 링크

### PR 템플릿
```markdown
## 변경 사항
- 무엇을 변경했는지 간단히 설명

## 변경 이유
- 왜 이 변경이 필요한지 설명

## 스크린샷 (선택사항)
- UI 변경 시 Before/After 스크린샷

## 체크리스트
- [ ] 코드 작동 확인
- [ ] Linter 통과
- [ ] 타입 에러 없음
- [ ] 문서 업데이트 (필요 시)

## 관련 이슈
Closes #이슈번호
```

## 테스트

### Linter 실행
```bash
npm run lint
```

### 빌드 확인
```bash
npm run build
```

### 개발 서버 확인
```bash
npm run dev
```

## 도움이 필요한가요?

- 📧 이메일: dev@mindgraphy.com
- 💬 이슈: GitHub Issues
- 📖 문서: README.md, ARCHITECTURE.md

## Code of Conduct

- 존중하는 태도로 커뮤니케이션
- 건설적인 피드백 제공
- 다양성 존중
- 협력적인 문제 해결

## 라이선스

이 프로젝트에 기여하는 것은 프로젝트의 라이선스에 동의하는 것으로 간주됩니다.

---

다시 한번 기여해 주셔서 감사합니다! 🙏

