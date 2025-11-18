# Deployment Checklist

GitHub 업로드 및 배포 전 최종 체크리스트

## ✅ 코드 품질

- [x] Linter 에러 수정 완료
- [x] TypeScript 타입 에러 해결
- [x] 사용하지 않는 import 정리
- [x] console.log 제거 (개발용 제외)
- [x] 코드 포맷팅 통일

## ✅ 보안

- [x] 환경 변수 파일 (.env.local) .gitignore에 추가
- [x] API 키, 비밀번호 등 하드코딩 제거
- [x] Mock 데이터만 사용 (실제 고객 정보 없음)
- [x] .env.example 파일 생성

## ✅ 문서화

- [x] README.md 업데이트
- [x] CONTRIBUTING.md 작성
- [x] LICENSE 파일 추가
- [x] SECURITY.md 작성
- [x] API 문서 (필요시)

## ✅ GitHub 설정

- [x] .gitignore 최신화
- [x] PR 템플릿 추가
- [x] 이슈 템플릿 추가 (버그, 기능 제안)
- [ ] GitHub Actions 설정 (CI/CD - 선택사항)
- [ ] Branch protection rules (main 브랜치)

## ✅ 빌드 확인

```bash
# 1. 의존성 설치 확인
npm install

# 2. Linter 실행
npm run lint

# 3. 프로덕션 빌드
npm run build

# 4. 빌드 결과 실행
npm start
```

## ✅ 파일 구조 확인

```
✓ .gitignore
✓ .env.example
✓ README.md
✓ LICENSE
✓ CONTRIBUTING.md
✓ SECURITY.md
✓ package.json
✓ .github/
  ✓ pull_request_template.md
  ✓ ISSUE_TEMPLATE/
    ✓ bug_report.md
    ✓ feature_request.md
```

## ✅ 테스트 환경

- [x] 로컬 개발 서버 정상 작동
- [x] 빌드 성공
- [x] 주요 페이지 동작 확인
  - [x] 랜딩 페이지 (/)
  - [x] 고객 포털 (/c)
  - [x] 관리자 대시보드 (/admin/dashboard)
  - [x] 캘린더 (/admin/calendar)
  - [x] 프로젝트 관리 (/admin/projects)
  - [x] 고객 관리 (/admin/customers)

## ✅ 민감 정보 제거

- [x] 실제 고객 데이터 없음
- [x] 실제 API 키 없음
- [x] 실제 계정 정보 없음
- [x] 개발용 비밀번호만 사용 (mock 데이터)

## ✅ 성능 최적화

- [x] 이미지 최적화
- [x] 불필요한 의존성 제거
- [x] 코드 스플리팅 (Next.js 기본)
- [x] 번들 크기 확인

## 🚀 GitHub 업로드 명령어

### 1. Git 초기화 (처음인 경우)
```bash
git init
git add .
git commit -m "Initial commit: MindGraphy v2.0"
```

### 2. Remote 저장소 연결
```bash
git remote add origin [your-repository-url]
git branch -M main
```

### 3. Push
```bash
git push -u origin main
```

### 4. 추가 커밋
```bash
git add .
git commit -m "feat: add new feature"
git push
```

## 📋 배포 후 확인사항

- [ ] GitHub 저장소 접근 가능
- [ ] README가 제대로 표시됨
- [ ] 이슈 템플릿 작동 확인
- [ ] PR 템플릿 작동 확인
- [ ] 협업자 추가 (필요시)
- [ ] Branch protection rules 설정

## 🔐 환경 변수 설정 (배포 환경)

배포 환경에서는 실제 값으로 설정해주세요:

```bash
# Vercel/Netlify 등에서 설정
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_API_URL=https://api.your-domain.com
# ... 기타 필요한 환경 변수
```

## 📞 문의

문제가 있거나 도움이 필요하신가요?
- 📧 Email: dev@mindgraphy.com
- 💬 GitHub Issues

---

**마지막 업데이트**: 2025-01-18  
**체크리스트 버전**: 1.0

