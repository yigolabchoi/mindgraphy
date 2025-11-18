# Security Policy

## 🔒 보안 정책

마인드그라피는 사용자의 개인정보와 데이터 보안을 최우선으로 생각합니다.

## 🛡️ 지원되는 버전

현재 보안 업데이트가 제공되는 버전:

| Version | Supported          |
| ------- | ------------------ |
| 2.0.x   | :white_check_mark: |
| 1.0.x   | :x:                |

## 📢 보안 취약점 신고

보안 취약점을 발견하셨나요? 즉시 알려주세요!

### 신고 방법

**공개 이슈로 신고하지 마세요.** 대신 아래 방법을 사용해주세요:

1. **이메일**: security@mindgraphy.com
2. **제목**: [SECURITY] 간단한 설명
3. **내용**:
   - 취약점 설명
   - 재현 방법
   - 영향 범위
   - 제안 해결책 (선택사항)

### 신고 시 포함할 정보

```markdown
## 취약점 유형
- [ ] XSS
- [ ] SQL Injection
- [ ] CSRF
- [ ] 인증/권한 우회
- [ ] 정보 노출
- [ ] 기타: ___

## 상세 설명
[취약점에 대한 자세한 설명]

## 재현 단계
1. 
2. 
3. 

## 영향도
- [ ] Critical (즉시 조치 필요)
- [ ] High (긴급 조치 필요)
- [ ] Medium (조치 필요)
- [ ] Low (낮은 위험)

## 환경
- OS: 
- Browser: 
- Version: 
```

## 🔄 대응 프로세스

1. **접수** (24시간 이내)
   - 신고 확인 및 접수 완료 회신

2. **조사** (3영업일 이내)
   - 취약점 검증 및 영향 분석
   - 심각도 평가

3. **수정** (심각도에 따라)
   - Critical: 24시간 이내
   - High: 3일 이내
   - Medium: 7일 이내
   - Low: 다음 릴리스

4. **공지** (수정 완료 후)
   - 패치 릴리스
   - 보안 권고사항 게시

## 🏆 인정

책임있게 보안 취약점을 신고해주신 분들의 기여를 인정하고 감사드립니다.

- 원하시는 경우, 릴리스 노트에 이름을 기재해드립니다
- 심각한 취약점 발견 시, 감사의 표시를 전달합니다

## 📋 보안 Best Practices

### 개발자를 위한 가이드

#### 환경 변수
```bash
# ❌ 절대 하지 마세요
const API_KEY = 'hardcoded-key-123'

# ✅ 올바른 방법
const API_KEY = process.env.API_KEY
```

#### 사용자 입력 검증
```typescript
// ✅ 항상 검증하세요
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^010-\d{4}-\d{4}$/)
})
```

#### XSS 방어
```tsx
// ✅ React는 기본적으로 XSS를 방어합니다
<div>{userInput}</div>

// ❌ dangerouslySetInnerHTML 사용 시 주의
<div dangerouslySetInnerHTML={{ __html: sanitize(userInput) }} />
```

## 🔐 데이터 보호

### 개인정보 처리
- 최소한의 정보만 수집
- 암호화 저장 (민감 정보)
- 정기적인 데이터 삭제
- HTTPS 통신 강제

### 인증 및 권한
- JWT 토큰 기반 인증
- 역할 기반 접근 제어 (RBAC)
- 세션 타임아웃
- 비밀번호 해싱 (bcrypt)

## 📞 연락처

보안 관련 문의:
- 📧 Email: security@mindgraphy.com
- 🔗 Website: https://mindgraphy.com/security

---

**마지막 업데이트**: 2025-01-18

