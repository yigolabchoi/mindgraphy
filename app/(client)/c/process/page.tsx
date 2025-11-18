'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ProcessPage() {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlePortfolio = () => {
    router.push('/c/portfolio')
  }

  const handleNext = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.push('/c/packages')
    }, 400)
  }

  const handleBack = () => {
    setIsAnimating(true)
    setTimeout(() => {
      router.back()
    }, 400)
  }

  const processSteps = [
    {
      title: '사전미팅',
      description: '모든 촬영에 대해서 사전미팅을 진행해드리고 있습니다'
    },
    {
      title: '촬영',
      description: '한 순간도 놓치지 않으려 최선을 다합니다'
    },
    {
      title: '백업',
      description: '물리적인 공간과 클라우드 공간에 세번 같은 데이터를 보관하여, 데이터의 안정성을 추구합니다'
    },
    {
      title: '고객셀렉',
      description: '고객님께서 쉽게 셀렉하실 수 있도록. 전체원본과 웹갤러리를 제공합니다.'
    },
    {
      title: '리터칭',
      description: '색감과 세부수정은 대표작가 주관하에 진행됩니다'
    },
    {
      title: '컨펌',
      description: '모든 과정에서 고객님의 동의를 받아 진행합니다'
    },
    {
      title: '배송',
      description: '촬영과 사전미팅을 제외한 모든 과정은 비대면으로 진행합니다'
    }
  ]

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
        {/* Title */}
        <div className="text-center">
          <h1 className="text-3xl font-light text-zinc-900 tracking-[0.3em] leading-relaxed">
            process
          </h1>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Content */}
        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <div key={index} className="space-y-3 text-center">
              <h3 className="text-base font-medium text-zinc-900">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleNext}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "active:scale-[0.98]",
              "shadow-md hover:shadow-lg"
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
            체계적인 프로세스로 완벽한 결과를 만듭니다
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

      </div>
    </div>
  )
}
