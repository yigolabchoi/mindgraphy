# 🚀 MindGraphy 배포 가이드

## 📋 목차

1. [배포 전략 개요](#배포-전략-개요)
2. [AWS S3 + CloudFront 배포](#aws-s3--cloudfront-배포)
3. [Vercel 배포](#vercel-배포)
4. [도메인 설정](#도메인-설정)
5. [배포 스크립트 사용법](#배포-스크립트-사용법)

## 배포 전략 개요

MindGraphy는 **단일 프로젝트**를 **3개의 도메인**으로 분리 배포합니다:

```
빌드 (1회) → 배포 (3개 도메인)
   ↓
   ├─ www.mindgraphy.com    (소개 홈페이지)
   ├─ portal.mindgraphy.com (고객 포털)
   └─ admin.mindgraphy.com  (내부 시스템)
```

## AWS S3 + CloudFront 배포

### 1단계: S3 버킷 생성

```bash
# 1. www 버킷 생성
aws s3 mb s3://mindgraphy-www --region ap-northeast-2

# 2. portal 버킷 생성
aws s3 mb s3://mindgraphy-portal --region ap-northeast-2

# 3. admin 버킷 생성
aws s3 mb s3://mindgraphy-admin --region ap-northeast-2

# 버킷 정적 웹사이트 호스팅 활성화
aws s3 website s3://mindgraphy-www \
    --index-document index.html \
    --error-document 404.html

aws s3 website s3://mindgraphy-portal \
    --index-document index.html

aws s3 website s3://mindgraphy-admin \
    --index-document index.html
```

### 2단계: 버킷 정책 설정

각 버킷에 다음 정책 적용:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::mindgraphy-www/*"
    }
  ]
}
```

### 3단계: CloudFront Distribution 생성

각 S3 버킷에 대해 CloudFront Distribution 생성:

**www.mindgraphy.com 설정:**
```yaml
Origin Domain: mindgraphy-www.s3.ap-northeast-2.amazonaws.com
Origin Path: /
Default Root Object: index.html
Viewer Protocol Policy: Redirect HTTP to HTTPS
Allowed HTTP Methods: GET, HEAD, OPTIONS
Cache Policy: CachingOptimized
```

**portal.mindgraphy.com 설정:**
```yaml
Origin Domain: mindgraphy-portal.s3.ap-northeast-2.amazonaws.com
Origin Path: /
Default Root Object: c/index.html
# 나머지 동일
```

**admin.mindgraphy.com 설정:**
```yaml
Origin Domain: mindgraphy-admin.s3.ap-northeast-2.amazonaws.com
Origin Path: /
Default Root Object: admin/index.html
Cache Policy: CachingDisabled (인증 페이지이므로)
```

### 4단계: 환경 변수 설정

```bash
# .env.production 파일 생성
cp .env.example .env.production

# 환경 변수 편집
nano .env.production
```

### 5단계: 빌드 및 배포

```bash
# 전체 배포
chmod +x scripts/deploy-split.sh
./scripts/deploy-split.sh all

# 개별 배포
./scripts/deploy-split.sh www      # 소개 페이지만
./scripts/deploy-split.sh portal   # 고객 포털만
./scripts/deploy-split.sh admin    # 내부 시스템만
```

## Vercel 배포

### 방법 1: 단일 프로젝트, 다중 도메인

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel --prod

# 도메인 추가
vercel domains add www.mindgraphy.com
vercel domains add portal.mindgraphy.com
vercel domains add admin.mindgraphy.com

# 각 도메인별 라우팅은 Next.js가 자동 처리
```

**vercel.json 설정:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "out",
  "rewrites": [
    {
      "source": "/admin/:path*",
      "destination": "/admin/:path*"
    },
    {
      "source": "/c/:path*",
      "destination": "/c/:path*"
    }
  ],
  "headers": [
    {
      "source": "/admin/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, no-store, must-revalidate"
        }
      ]
    }
  ]
}
```

### 방법 2: 3개 별도 프로젝트

```bash
# 1. www 프로젝트
cd mindgraphy
vercel --prod --name mindgraphy-www

# 2. portal 프로젝트 (same code, different domain)
vercel --prod --name mindgraphy-portal

# 3. admin 프로젝트
vercel --prod --name mindgraphy-admin
```

## 도메인 설정

### DNS 레코드 설정 (Route 53 / Cloudflare)

```
# A 레코드 또는 CNAME
www.mindgraphy.com      → CloudFront Distribution (www)
portal.mindgraphy.com   → CloudFront Distribution (portal)
admin.mindgraphy.com    → CloudFront Distribution (admin)

# 또는
www.mindgraphy.com      → Vercel
portal.mindgraphy.com   → Vercel
admin.mindgraphy.com    → Vercel
```

### SSL 인증서

**AWS Certificate Manager (ACM):**
```bash
# 각 도메인별 SSL 인증서 요청
aws acm request-certificate \
    --domain-name www.mindgraphy.com \
    --subject-alternative-names mindgraphy.com \
    --validation-method DNS \
    --region us-east-1  # CloudFront는 us-east-1 필수

# portal, admin도 동일하게 진행
```

**Vercel:**
- 자동으로 Let's Encrypt 인증서 발급

## 배포 스크립트 사용법

### package.json 스크립트 추가

```json
{
  "scripts": {
    "build": "next build",
    "deploy": "./scripts/deploy-split.sh all",
    "deploy:www": "./scripts/deploy-split.sh www",
    "deploy:portal": "./scripts/deploy-split.sh portal",
    "deploy:admin": "./scripts/deploy-split.sh admin"
  }
}
```

### GitHub Actions 자동 배포

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2
          
      - name: Deploy to S3
        run: ./scripts/deploy-split.sh all
        env:
          WWW_BUCKET: ${{ secrets.WWW_BUCKET }}
          PORTAL_BUCKET: ${{ secrets.PORTAL_BUCKET }}
          ADMIN_BUCKET: ${{ secrets.ADMIN_BUCKET }}
          WWW_DISTRIBUTION: ${{ secrets.WWW_DISTRIBUTION }}
          PORTAL_DISTRIBUTION: ${{ secrets.PORTAL_DISTRIBUTION }}
          ADMIN_DISTRIBUTION: ${{ secrets.ADMIN_DISTRIBUTION }}
```

## 배포 확인

### 체크리스트

- [ ] 모든 도메인이 HTTPS로 접속되는가?
- [ ] www.mindgraphy.com → 소개 페이지 표시
- [ ] portal.mindgraphy.com/c/token-001 → 고객 포털 접속
- [ ] admin.mindgraphy.com/login → 로그인 페이지 표시
- [ ] admin.mindgraphy.com/admin → 인증 후 대시보드 접속
- [ ] 각 도메인 간 CORS 에러 없음
- [ ] 이미지, CSS, JS 파일 로드 정상
- [ ] 모바일 반응형 정상 작동

### 모니터링

```bash
# CloudFront 로그 활성화
aws cloudfront update-distribution \
    --id YOUR_DISTRIBUTION_ID \
    --distribution-config \
    '{"Logging":{"Enabled":true,"Bucket":"logs.s3.amazonaws.com"}}'

# CloudWatch 메트릭 확인
aws cloudwatch get-metric-statistics \
    --namespace AWS/CloudFront \
    --metric-name Requests \
    --dimensions Name=DistributionId,Value=YOUR_DISTRIBUTION_ID \
    --start-time 2025-01-01T00:00:00Z \
    --end-time 2025-01-02T00:00:00Z \
    --period 3600 \
    --statistics Sum
```

## 트러블슈팅

### 404 에러 발생
- CloudFront Error Pages 설정
- S3 index.html fallback 설정

### CORS 에러
- API 서버에서 각 도메인 허용 설정
- CloudFront에서 CORS 헤더 전달 설정

### 캐시 이슈
```bash
# CloudFront 캐시 즉시 무효화
aws cloudfront create-invalidation \
    --distribution-id YOUR_DISTRIBUTION_ID \
    --paths "/*"
```

## 비용 최적화

### AWS 예상 비용 (월간)

```
S3 스토리지: ~$1-5 (1GB 기준)
CloudFront: ~$10-50 (트래픽 따라)
Route 53: ~$0.50 (호스팅 영역)
---------------
총: ~$12-56/월
```

### Vercel 비용

```
Pro Plan: $20/월 (팀용)
- 무제한 대역폭
- 자동 SSL
- Edge Functions
```

## 다음 단계

1. ✅ 정적 사이트 배포 완료
2. 🔄 Backend API 구축
3. 🔄 DB 연동
4. 🔄 CDN 최적화
5. 🔄 모니터링 대시보드

