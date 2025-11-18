'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function FinalMessagePage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Fade in on mount
    setTimeout(() => {
      setIsMounted(true)
    }, 100)
  }, [])

  const handleGoHome = () => {
    // Clear session storage and go to home
    if (typeof window !== 'undefined') {
      sessionStorage.clear()
    }
    router.push('/')
  }

  const handleGoToPortal = () => {
    // Clear session storage and go to first page (product type selection)
    if (typeof window !== 'undefined') {
      sessionStorage.clear()
    }
    router.push('/c/product-type')
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div 
        className={cn(
          "max-w-md w-full space-y-12 transition-all duration-1000 ease-out",
          isMounted 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="h-20 w-20 rounded-full bg-zinc-900 flex items-center justify-center animate-in zoom-in duration-700">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-6 text-center">
          <h1 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            소중한 순간을
          </h1>
          <h2 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            함께하게 되어 영광입니다
          </h2>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Message */}
        <div className="space-y-4 text-center">
          <p className="text-sm text-zinc-600 leading-relaxed">
            입력하신 정보는 안전하게 전달되었으며<br />
            담당자가 확인 후 영업일 기준 1-2일 이내에<br />
            연락드릴 예정입니다
          </p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            여러분의 특별한 날을<br />
            마인드그라피가 함께하겠습니다
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "active:scale-[0.98]",
              "shadow-md hover:shadow-lg focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            )}
          >
            홈으로 이동
          </Button>

          <Button
            onClick={handleGoToPortal}
            variant="outline"
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "border-2 border-zinc-300 bg-white text-zinc-700",
              "hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
              "active:scale-[0.98]",
              "shadow-sm hover:shadow-md"
            )}
          >
            마인드 포털로 이동
          </Button>

          <p className="text-xs text-center text-zinc-400 leading-relaxed pt-4">
            문의사항이 있으시면 언제든지<br />
            전화 또는 카카오톡으로 연락 주세요
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Signature */}
        <div className="text-center">
          <p className="text-sm text-zinc-500 leading-relaxed">
            마인드그라피 올림
          </p>
        </div>
      </div>
    </div>
  )
}

