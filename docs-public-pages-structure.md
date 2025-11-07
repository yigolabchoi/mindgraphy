# Public Pages Directory

이 디렉토리는 공개 접근 가능한 페이지들을 포함합니다.

## 현재 구조

- **`page.tsx`** - 메인 진입 페이지 (포털 선택 페이지)
  - 고객용 포털과 내부 업무 시스템 중 선택
  - 개발 편의상 만든 페이지로, 불필요한 소개 문구는 제거됨

## 향후 확장 가능한 페이지 구조

필요에 따라 아래 페이지들을 추가할 수 있습니다:

⚠️ **주의사항**: 
- Next.js는 `app` 디렉토리 내의 모든 파일 변경을 감지합니다
- 빈 디렉토리나 `.gitkeep` 파일을 만들지 마세요 (무한 재컴파일 발생)
- 실제로 페이지를 만들 때만 디렉토리와 `page.tsx`를 함께 생성하세요

### `/home` - 실제 랜딩 페이지
서비스 소개, 주요 기능, CTA 등이 포함된 마케팅 랜딩 페이지

```typescript
// app/(public)/home/page.tsx
export default function LandingPage() {
  // 서비스 소개, 기능 설명, 가격 안내 등
}
```

### `/about` - 회사/서비스 소개
회사 소개, 팀 소개, 비전과 미션 등

```typescript
// app/(public)/about/page.tsx
export default function AboutPage() {
  // 회사 소개, 팀 정보 등
}
```

### `/pricing` - 가격 안내
패키지별 가격, 기능 비교, 결제 옵션 등

```typescript
// app/(public)/pricing/page.tsx
export default function PricingPage() {
  // 패키지 가격 정보
}
```

### `/contact` - 문의하기
문의 폼, 연락처 정보, FAQ 등

```typescript
// app/(public)/contact/page.tsx
export default function ContactPage() {
  // 문의 폼
}
```

### `/features` - 기능 상세 안내
각 기능에 대한 상세 설명, 스크린샷, 데모 등

```typescript
// app/(public)/features/page.tsx
export default function FeaturesPage() {
  // 기능 상세 설명
}
```

### `/blog` - 블로그/뉴스
업데이트 소식, 사용 팁, 케이스 스터디 등

```typescript
// app/(public)/blog/page.tsx
export default function BlogPage() {
  // 블로그 목록
}

// app/(public)/blog/[slug]/page.tsx
export default function BlogPostPage() {
  // 개별 블로그 포스트
}
```

## 레이아웃

필요시 공통 레이아웃을 추가할 수 있습니다:

```typescript
// app/(public)/layout.tsx
export default function PublicLayout({ children }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}
```

## 라우팅 구조

```
/ (루트)                          → 포털 선택 페이지
/home                             → 실제 랜딩 페이지
/about                            → 소개
/pricing                          → 가격
/contact                          → 문의
/features                         → 기능 상세
/blog                             → 블로그 목록
/blog/[slug]                      → 블로그 포스트
/c/[token]                        → 클라이언트 포털 (별도 그룹)
/admin/*                          → 내부 업무 시스템 (별도 그룹)
```

## 참고사항

- 현재 `/` 페이지는 개발/테스트 편의를 위한 포털 선택 페이지입니다
- 실제 프로덕션에서는 `/home`을 메인 랜딩으로 사용하거나, `/`를 직접 마케팅 랜딩으로 전환할 수 있습니다
- 각 페이지는 필요에 따라 점진적으로 추가하면 됩니다


