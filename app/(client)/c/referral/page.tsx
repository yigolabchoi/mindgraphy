'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ReferralSource = 'referral' | 'direct' | null

export default function ReferralPage() {
  const router = useRouter()
  const [selectedSource, setSelectedSource] = useState<ReferralSource>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Fade in on mount
    setIsMounted(true)
  }, [])

  const handlePortfolio = () => {
    router.push('/c/portfolio')
  }

  const handleSelect = (source: ReferralSource) => {
    setSelectedSource(source)
  }

  const handleNext = () => {
    if (!selectedSource) return
    
    setIsAnimating(true)
    
    // Store the selection
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mindgraphy_referral_source', selectedSource)
    }
    
    // Navigate to final message page
    setTimeout(() => {
      router.push('/c/final-message')
    }, 400)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 overflow-hidden">
      <div 
        className={cn(
          "max-w-md w-full space-y-12 transition-all duration-700 ease-out",
          isMounted 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8",
          isAnimating && "opacity-0 -translate-y-8"
        )}
      >
        {/* Header */}
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            마인드그라피를
          </h1>
          <h2 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            어떻게 알게 되셨나요?
          </h2>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Selection Options */}
        <div className="space-y-4">
          {/* Option 1: Referral */}
          <button
            onClick={() => handleSelect('referral')}
            className={cn(
              "w-full p-8 text-left border-2 transition-all duration-300",
              "hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2",
              "active:scale-[0.99]",
              selectedSource === 'referral' 
                ? "border-zinc-900 bg-zinc-50 shadow-sm" 
                : "border-zinc-200 bg-white"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="text-lg font-medium text-zinc-900">
                    지인 소개 또는 추천
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    가족, 친구, 또는 다른 분의 소개로<br />
                    마인드그라피를 알게 되셨습니다
                  </p>
                </div>
                <div className={cn(
                  "ml-4 h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  selectedSource === 'referral'
                    ? "border-zinc-900 bg-zinc-900 scale-110"
                    : "border-zinc-300"
                )}>
                  {selectedSource === 'referral' && (
                    <div className="h-2 w-2 bg-white rounded-full animate-in fade-in zoom-in duration-200"></div>
                  )}
                </div>
              </div>
            </div>
          </button>

          {/* Option 2: Direct */}
          <button
            onClick={() => handleSelect('direct')}
            className={cn(
              "w-full p-8 text-left border-2 transition-all duration-300",
              "hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-sm",
              "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2",
              "active:scale-[0.99]",
              selectedSource === 'direct'
                ? "border-zinc-900 bg-zinc-50 shadow-sm"
                : "border-zinc-200 bg-white"
            )}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <p className="text-lg font-medium text-zinc-900">
                    검색 또는 SNS
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    인터넷 검색, 인스타그램 등을 통해<br />
                    직접 찾아오셨습니다
                  </p>
                </div>
                <div className={cn(
                  "ml-4 h-6 w-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  selectedSource === 'direct'
                    ? "border-zinc-900 bg-zinc-900 scale-110"
                    : "border-zinc-300"
                )}>
                  {selectedSource === 'direct' && (
                    <div className="h-2 w-2 bg-white rounded-full animate-in fade-in zoom-in duration-200"></div>
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
            disabled={!selectedSource}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed",
              "active:scale-[0.98]",
              selectedSource && "shadow-md hover:shadow-lg focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            )}
          >
            제출
          </Button>

          <p className="text-xs text-center text-zinc-400 leading-relaxed">
            소중한 순간을 함께하게 되어 영광입니다
          </p>
        </div>
      </div>
    </div>
  )
}
