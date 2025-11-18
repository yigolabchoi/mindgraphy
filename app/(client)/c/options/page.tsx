'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { optionProducts } from '@/lib/mock/settings'

export default function OptionsPage() {
  const router = useRouter()
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  useEffect(() => {
    // Fade in on mount
    setIsMounted(true)
  }, [])

  const handlePortfolio = () => {
    router.push('/c/portfolio')
  }

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => {
      const newSelection = prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
      
      // Scroll to the clicked option to bring it to the top
      setTimeout(() => {
        optionRefs.current[optionId]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 100)
      
      return newSelection
    })
  }

  // Only show active options
  const activeOptions = optionProducts.filter(opt => opt.isActive)

  const calculateTotal = () => {
    return selectedOptions.reduce((total, optionId) => {
      const option = activeOptions.find(opt => opt.id === optionId)
      return total + (option?.basePrice || 0)
    }, 0)
  }
  
  // Get selected option details
  const selectedOptionDetails = selectedOptions.map(id => 
    activeOptions.find(opt => opt.id === id)
  ).filter(Boolean)

  const handleNext = () => {
    setIsAnimating(true)
    
    // Store the selections
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mindgraphy_options', JSON.stringify(selectedOptions))
    }
    
    // Navigate to venue info input
    setTimeout(() => {
      router.push('/c/venue-info')
    }, 400)
  }

  const handleSkip = () => {
    setIsAnimating(true)
    
    // Clear any previously selected options
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mindgraphy_options', JSON.stringify([]))
    }
    
    // Navigate to venue info input
    setTimeout(() => {
      router.push('/c/venue-info')
    }, 400)
  }

  const handleBack = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push('/c/packages')
    }, 400)
  }

  const formatPrice = (price: number) => {
    return '+' + price.toLocaleString('ko-KR') + '원'
  }

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-4 py-8">
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
            추가 옵션을
          </h1>
          <h2 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            선택해 주세요
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed pt-2">
            필요한 옵션을 자유롭게 선택하실 수 있습니다<br />
            선택하지 않으셔도 됩니다
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Options Selection */}
        <div className="space-y-3">
          {activeOptions.map((option) => (
            <button
              key={option.id}
              ref={(el) => { optionRefs.current[option.id] = el }}
              onClick={() => toggleOption(option.id)}
              className={cn(
                "w-full p-5 text-left border-2 transition-all duration-300",
                "hover:border-zinc-900 hover:bg-zinc-50 hover:shadow-sm",
                "focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2",
                "active:scale-[0.99]",
                selectedOptions.includes(option.id)
                  ? "border-zinc-900 bg-zinc-50 shadow-sm"
                  : "border-zinc-200 bg-white"
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <h3 className="text-base font-medium text-zinc-900">
                    {option.title}
                  </h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    {option.description.join(' • ')}
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 pt-1">
                    {formatPrice(option.basePrice)}
                  </p>
                </div>
                <div className={cn(
                  "h-5 w-5 border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300",
                  selectedOptions.includes(option.id)
                    ? "border-zinc-900 bg-zinc-900"
                    : "border-zinc-300"
                )}>
                  {selectedOptions.includes(option.id) && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Info */}
        <div className="text-center">
          <p className="text-xs text-zinc-400 leading-relaxed">
            옵션을 선택하지 않고 다음으로 진행하실 수도 있습니다
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Selected Options Summary */}
        <div ref={summaryRef}>
          {selectedOptionDetails.length > 0 && (
            <div className="p-6 bg-zinc-50 border border-zinc-200 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
                <p className="text-sm font-medium text-zinc-900">
                  선택한 옵션
                </p>
                <p className="text-xs text-zinc-500">
                  {selectedOptionDetails.length}개
                </p>
              </div>
              
              <div className="space-y-2">
                {selectedOptionDetails.map((option: any) => (
                  <div key={option.id} className="flex items-center justify-between py-1.5">
                    <p className="text-xs text-zinc-700">
                      {option.title}
                    </p>
                    <p className="text-xs font-semibold text-zinc-900">
                      {formatPrice(option.basePrice)}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="pt-3 border-t border-zinc-200 flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-900">
                  옵션 총액
                </p>
                <p className="text-lg font-bold text-zinc-900">
                  {formatPrice(calculateTotal())}
                </p>
              </div>
              
              <p className="text-xs text-zinc-500 text-center pt-2">
                패키지 금액에 추가되는 비용입니다
              </p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Button
            onClick={selectedOptions.length > 0 ? handleNext : handleSkip}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "active:scale-[0.98]",
              "shadow-md hover:shadow-lg focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            )}
          >
            {selectedOptions.length > 0 ? '다음' : '옵션 없이 진행'}
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
            옵션은 나중에 추가하거나 변경하실 수 있습니다
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

      </div>
    </div>
  )
}
