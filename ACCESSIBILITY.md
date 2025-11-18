# 접근성 가이드 (Accessibility Guide)

이 문서는 MindGraphy 프로젝트의 접근성(a11y) 모범 사례를 정의합니다.

---

## 🎯 핵심 원칙

1. **키보드 접근성**: 모든 기능은 키보드로 사용 가능해야 합니다
2. **스크린 리더**: 스크린 리더 사용자가 콘텐츠를 이해할 수 있어야 합니다
3. **색상 대비**: WCAG 2.1 AA 기준 이상의 색상 대비
4. **포커스 표시**: 키보드 포커스가 명확하게 보여야 합니다

---

## 📋 컴포넌트별 가이드

### Dialog (모달)

**필수 사항**: 모든 `DialogContent`는 `DialogTitle`을 포함해야 합니다.

#### ✅ 올바른 사용법

```tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

function MyDialog() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>대화상자 제목</DialogTitle>
          <DialogDescription>
            대화상자에 대한 설명입니다.
          </DialogDescription>
        </DialogHeader>
        {/* 콘텐츠 */}
      </DialogContent>
    </Dialog>
  )
}
```

#### ✅ 제목을 시각적으로 숨기기

스크린 리더에는 제공하되, 시각적으로 숨기고 싶은 경우:

```tsx
import { VisuallyHidden } from "@/components/ui/visually-hidden"
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"

function MyDialog() {
  return (
    <Dialog>
      <DialogContent>
        <VisuallyHidden>
          <DialogTitle>스크린 리더용 제목</DialogTitle>
        </VisuallyHidden>
        {/* 시각적 콘텐츠 */}
      </DialogContent>
    </Dialog>
  )
}
```

#### ❌ 잘못된 사용법

```tsx
// ❌ DialogTitle 없음 - 접근성 경고 발생
<Dialog>
  <DialogContent>
    <h2>제목</h2>
    {/* DialogTitle을 사용해야 함 */}
  </DialogContent>
</Dialog>
```

---

### 버튼

#### ✅ 올바른 사용법

```tsx
// 텍스트가 있는 버튼
<Button>저장</Button>

// 아이콘만 있는 버튼 - aria-label 필수
<Button aria-label="닫기" size="icon">
  <X className="h-4 w-4" />
</Button>

// 또는 sr-only 사용
<Button size="icon">
  <X className="h-4 w-4" />
  <span className="sr-only">닫기</span>
</Button>
```

#### ❌ 잘못된 사용법

```tsx
// ❌ 아이콘만 있고 설명이 없음
<Button>
  <X className="h-4 w-4" />
</Button>
```

---

### 폼 (Form)

#### ✅ 올바른 사용법

```tsx
// Label과 Input 연결
<div className="space-y-2">
  <Label htmlFor="email">이메일 *</Label>
  <Input
    id="email"
    type="email"
    placeholder="example@email.com"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" className="text-sm text-red-600">
      유효한 이메일을 입력해주세요
    </p>
  )}
</div>
```

#### ❌ 잘못된 사용법

```tsx
// ❌ Label이 없음
<Input type="email" placeholder="이메일" />

// ❌ Label과 Input이 연결되지 않음
<Label>이메일</Label>
<Input type="email" />
```

---

### 키보드 네비게이션

#### ✅ 올바른 사용법

```tsx
// 클릭 가능한 요소는 키보드도 지원
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
  className="cursor-pointer focus-ring"
>
  클릭 가능한 영역
</div>
```

#### 포커스 링 스타일

프로젝트에서 제공하는 `focus-ring` 클래스를 사용:

```tsx
<Button className="focus-ring">버튼</Button>
<Input className="focus-ring" />
```

---

### 이미지

#### ✅ 올바른 사용법

```tsx
// 의미 있는 이미지 - alt 텍스트 제공
<img src="/photo.jpg" alt="웨딩 촬영 사진" />

// 장식용 이미지 - 빈 alt
<img src="/decoration.svg" alt="" />

// Next.js Image 컴포넌트
<Image 
  src="/photo.jpg" 
  alt="웨딩 촬영 사진"
  width={500}
  height={300}
/>
```

#### ❌ 잘못된 사용법

```tsx
// ❌ alt 속성 없음
<img src="/photo.jpg" />

// ❌ 의미 없는 alt
<img src="/photo.jpg" alt="이미지" />
```

---

### 색상과 대비

#### ✅ 올바른 사용법

```tsx
// WCAG AA 기준 이상의 대비율
<div className="bg-white text-zinc-900">
  높은 대비의 텍스트
</div>

// 정보를 색상에만 의존하지 않음
<Badge className="bg-red-100 text-red-800 border-red-200">
  <AlertCircle className="h-3 w-3 mr-1" />
  오류
</Badge>
```

#### ❌ 잘못된 사용법

```tsx
// ❌ 낮은 대비
<div className="bg-gray-200 text-gray-300">
  읽기 어려운 텍스트
</div>

// ❌ 색상에만 의존
<span className="text-red-600">중요</span>
```

---

### ARIA 속성

#### 자주 사용하는 ARIA 속성

```tsx
// 현재 페이지 표시
<nav>
  <a href="/dashboard" aria-current="page">대시보드</a>
</nav>

// 로딩 상태
<Button disabled aria-busy="true">
  로딩 중...
</Button>

// 확장/축소 상태
<button
  aria-expanded={isOpen}
  aria-controls="menu"
>
  메뉴
</button>

// 숨김 콘텐츠 (스크린 리더용)
<span className="sr-only">
  새 창에서 열기
</span>

// 라이브 영역 (동적 콘텐츠)
<div role="status" aria-live="polite">
  {message}
</div>
```

---

## 🧪 테스트 방법

### 1. 키보드 테스트

- `Tab` 키로 모든 인터랙티브 요소에 접근 가능한지 확인
- `Enter` 또는 `Space`로 버튼/링크 활성화 확인
- `Esc` 키로 모달 닫기 확인
- 포커스 순서가 논리적인지 확인

### 2. 스크린 리더 테스트

**macOS**:
- VoiceOver 켜기: `Cmd + F5`
- 테스트하며 콘텐츠가 명확하게 읽히는지 확인

**Windows**:
- NVDA 또는 JAWS 사용

### 3. 자동화 도구

```bash
# Lighthouse 감사
npm run build
npm start
# Chrome DevTools > Lighthouse > Accessibility 실행

# axe DevTools (Chrome 확장 프로그램 설치)
# https://www.deque.com/axe/devtools/
```

---

## 📚 유틸리티 클래스

### sr-only (Screen Reader Only)

시각적으로 숨기지만 스크린 리더에는 제공:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

사용 예:

```tsx
<button>
  <X className="h-4 w-4" />
  <span className="sr-only">닫기</span>
</button>
```

### focus-ring

키보드 포커스 링:

```css
.focus-ring {
  @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2;
}
```

---

## ✅ 체크리스트

새로운 기능을 추가할 때:

- [ ] 모든 버튼과 링크가 키보드로 접근 가능한가?
- [ ] 모든 폼 입력에 Label이 있는가?
- [ ] 모든 Dialog에 DialogTitle이 있는가?
- [ ] 아이콘 버튼에 aria-label이나 sr-only 텍스트가 있는가?
- [ ] 이미지에 적절한 alt 텍스트가 있는가?
- [ ] 포커스 순서가 논리적인가?
- [ ] 색상 대비가 충분한가?
- [ ] 에러 메시지가 스크린 리더에 전달되는가?

---

## 📖 참고 자료

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Radix UI Accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

**마지막 업데이트**: 2025-11-17
**담당자**: Development Team

