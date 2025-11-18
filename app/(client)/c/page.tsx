'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ClientType = 'venue' | 'direct' | null

export default function ClientStartPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<ClientType>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Fade in on mount
    setIsMounted(true)
  }, [])

  const handleSelect = (type: ClientType) => {
    setSelectedType(type)
  }

  const handleNext = () => {
    if (!selectedType) return
    
    setIsAnimating(true)
    
    // Store the selection
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mindgraphy_client_type', selectedType)
    }
    
    // Navigate based on client type
    setTimeout(() => {
      if (selectedType === 'venue') {
        // Wedding hall affiliated customer → venue info
        router.push('/c/venue-info')
      } else {
        // Direct inquiry customer → wedding date
        router.push('/c/wedding-date')
      }
    }, 400)
  }

  const handleBack = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push('/c/product-type')
    }, 400)
  }


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div 
        className={cn(
          "max-w-md w-full space-y-8 transition-all duration-700 ease-out",
          isMounted 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8",
          isAnimating && "opacity-0 -translate-y-8"
        )}
      >
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            어떤 경로로
          </h1>
          <h2 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            방문하셨나요?
          </h2>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* All Options Section */}
        <div className="space-y-4">
          {/* Option 1: Direct Inquiry */}
          <button
            onClick={() => handleSelect('direct')}
            className={cn(
              "w-full p-6 text-left border-2 transition-all duration-300",
              "hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2",
              "active:scale-[0.99]",
              selectedType === 'direct'
                ? "border-zinc-900 bg-zinc-50 shadow-sm"
                : "border-zinc-200 bg-white"
            )}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <p className="text-base font-medium text-zinc-900">
                    직접 문의 및 상담
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    상세한 상품 설명을 듣고 직접 계약을 진행하고 싶습니다
                  </p>
                </div>
                <div className={cn(
                  "ml-4 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  selectedType === 'direct'
                    ? "border-zinc-900 bg-zinc-900 scale-110"
                    : "border-zinc-300"
                )}>
                  {selectedType === 'direct' && (
                    <div className="h-1.5 w-1.5 bg-white rounded-full animate-in fade-in zoom-in duration-200"></div>
                  )}
                </div>
              </div>
            </div>
          </button>

          {/* Option 2: Venue Partnership */}
          <button
            onClick={() => handleSelect('venue')}
            className={cn(
              "w-full p-6 text-left border-2 transition-all duration-300",
              "hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2",
              "active:scale-[0.99]",
              selectedType === 'venue' 
                ? "border-zinc-900 bg-zinc-50 shadow-sm" 
                : "border-zinc-200 bg-white"
            )}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <p className="text-base font-medium text-zinc-900">
                    웨딩홀 제휴 고객
                  </p>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    웨딩홀을 통해 계약이 완료되었으며 촬영 정보를 입력하고 싶습니다
                  </p>
                </div>
                <div className={cn(
                  "ml-4 h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  selectedType === 'venue'
                    ? "border-zinc-900 bg-zinc-900 scale-110"
                    : "border-zinc-300"
                )}>
                  {selectedType === 'venue' && (
                    <div className="h-1.5 w-1.5 bg-white rounded-full animate-in fade-in zoom-in duration-200"></div>
                  )}
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleNext}
            disabled={!selectedType}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed",
              "active:scale-[0.98]",
              selectedType && "shadow-md hover:shadow-lg"
            )}
          >
            다음
          </Button>

          <button
            onClick={handleBack}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-200",
              "text-zinc-600 hover:text-zinc-900",
              "active:scale-[0.98]"
            )}
          >
            이전
          </button>

          <p className="text-xs text-center text-zinc-400 leading-relaxed">
            두 분의 특별한 날을 함께 준비합니다
          </p>
        </div>

      </div>
    </div>
  )
}
