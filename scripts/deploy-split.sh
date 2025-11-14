#!/bin/bash

# MindGraphy 도메인별 배포 스크립트
# AWS S3 + CloudFront 배포 예시

set -e

echo "🚀 MindGraphy 배포 시작..."

# 빌드
echo "📦 Next.js 빌드 중..."
npm run build

# S3 버킷 이름 (환경 변수로 설정)
WWW_BUCKET=${WWW_BUCKET:-"mindgraphy-www"}
PORTAL_BUCKET=${PORTAL_BUCKET:-"mindgraphy-portal"}
ADMIN_BUCKET=${ADMIN_BUCKET:-"mindgraphy-admin"}

# CloudFront Distribution ID (환경 변수로 설정)
WWW_DISTRIBUTION=${WWW_DISTRIBUTION:-""}
PORTAL_DISTRIBUTION=${PORTAL_DISTRIBUTION:-""}
ADMIN_DISTRIBUTION=${ADMIN_DISTRIBUTION:-""}

# 배포 모드 선택
MODE=${1:-"all"}

deploy_www() {
    echo "🌐 소개 홈페이지 배포 중... (www.mindgraphy.com)"
    
    # 루트 파일들 (index.html 등)
    aws s3 sync out/ s3://$WWW_BUCKET/ \
        --exclude "admin/*" \
        --exclude "c/*" \
        --exclude "login/*" \
        --delete \
        --cache-control "public, max-age=3600"
    
    # CloudFront 캐시 무효화
    if [ ! -z "$WWW_DISTRIBUTION" ]; then
        aws cloudfront create-invalidation \
            --distribution-id $WWW_DISTRIBUTION \
            --paths "/*"
    fi
    
    echo "✅ 소개 홈페이지 배포 완료"
}

deploy_portal() {
    echo "👥 고객 포털 배포 중... (portal.mindgraphy.com)"
    
    # c/ 디렉토리만
    aws s3 sync out/c/ s3://$PORTAL_BUCKET/c/ \
        --delete \
        --cache-control "public, max-age=3600"
    
    # CloudFront 캐시 무효화
    if [ ! -z "$PORTAL_DISTRIBUTION" ]; then
        aws cloudfront create-invalidation \
            --distribution-id $PORTAL_DISTRIBUTION \
            --paths "/c/*"
    fi
    
    echo "✅ 고객 포털 배포 완료"
}

deploy_admin() {
    echo "🔐 내부 시스템 배포 중... (admin.mindgraphy.com)"
    
    # admin/ 및 login/ 디렉토리
    aws s3 sync out/admin/ s3://$ADMIN_BUCKET/admin/ \
        --delete \
        --cache-control "private, max-age=0"
    
    aws s3 sync out/login/ s3://$ADMIN_BUCKET/login/ \
        --delete \
        --cache-control "private, max-age=0"
    
    # CloudFront 캐시 무효화
    if [ ! -z "$ADMIN_DISTRIBUTION" ]; then
        aws cloudfront create-invalidation \
            --distribution-id $ADMIN_DISTRIBUTION \
            --paths "/admin/*" "/login/*"
    fi
    
    echo "✅ 내부 시스템 배포 완료"
}

# 배포 실행
case $MODE in
    "www")
        deploy_www
        ;;
    "portal")
        deploy_portal
        ;;
    "admin")
        deploy_admin
        ;;
    "all")
        deploy_www
        deploy_portal
        deploy_admin
        ;;
    *)
        echo "❌ 잘못된 배포 모드: $MODE"
        echo "사용법: ./deploy-split.sh [www|portal|admin|all]"
        exit 1
        ;;
esac

echo ""
echo "🎉 배포 완료!"
echo ""
echo "📍 접속 주소:"
echo "   소개 페이지: https://www.mindgraphy.com"
echo "   고객 포털:   https://portal.mindgraphy.com"
echo "   내부 시스템: https://admin.mindgraphy.com"

