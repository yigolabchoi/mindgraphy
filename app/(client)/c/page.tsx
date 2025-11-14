'use client'

import Link from 'next/link'

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Client Portal
            </h1>
            <p className="text-sm text-gray-500">
              고객용 포털 개발 중
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Content */}
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              이 페이지는 내부 테스트용 임시 페이지입니다.
            </p>
            
            <div className="space-y-3 text-left max-w-md mx-auto">
              <p className="text-sm leading-relaxed">
                • 고객 포털 기능은 현재 개발 중입니다.
              </p>
              <p className="text-sm leading-relaxed">
                • 실제 고객에게 제공되는 페이지가 아닙니다.
              </p>
              <p className="text-sm leading-relaxed">
                • 백엔드 연동 후 정식 UI를 구현할 예정입니다.
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Navigation */}
          <div>
            <Link 
              href="/" 
              className="inline-block text-sm text-gray-600 hover:text-gray-900 underline underline-offset-4"
            >
              ← 홈으로 돌아가기
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-8">
            <p className="text-xs text-gray-400">
              MindGraphy Internal Testing
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
