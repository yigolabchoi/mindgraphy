'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getAllClientFormData, type ClientFormData } from '@/lib/utils/session-storage'
import { mockProducts } from '@/lib/mock/settings'

export default function VenueCompletePage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [formData, setFormData] = useState<ClientFormData | null>(null)
  const [packageName, setPackageName] = useState('')

  useEffect(() => {
    // Load form data from session using utility function
    const data = getAllClientFormData()
    setFormData(data)
    
    // Get package name from product data
    if (data.packageId) {
      const product = mockProducts.find(p => p.id === data.packageId)
      setPackageName(product ? product.name : data.packageId)
    }

    // Fade in on mount
    setTimeout(() => {
      setIsMounted(true)
    }, 100)
  }, [])

  const formatWeddingDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const dayNames = ['일', '월', '화', '수', '목', '금', '토']
    const dayName = dayNames[date.getDay()]
    
    return `${year}년 ${month}월 ${day}일 (${dayName})`
  }

  const handleFinish = () => {
    // Navigate to referral page (final step)
    router.push('/c/referral')
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
          <div className="h-16 w-16 rounded-full bg-zinc-900 flex items-center justify-center animate-in zoom-in duration-500">
            <svg
              className="h-8 w-8 text-white"
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
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-light text-zinc-900 tracking-tight leading-relaxed">
            감사합니다
          </h1>
          <h2 className="text-base font-light text-zinc-600 tracking-tight leading-relaxed">
            정보가 성공적으로 등록되었습니다
          </h2>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Summary */}
        {formData && (
          <div className="space-y-4 bg-zinc-50 p-6 border border-zinc-200">
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">신랑 신부</span>
                <span className="text-zinc-900 font-medium">
                  {formData.groomName} · {formData.brideName}
                </span>
              </div>
              
              <div className="border-t border-zinc-200"></div>
              
              <div className="flex justify-between">
                <span className="text-zinc-600">연락처</span>
                <span className="text-zinc-900 font-medium">
                  {formData.phone}
                </span>
              </div>
              
              <div className="border-t border-zinc-200"></div>
              
              {formData.email && (
                <>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">이메일</span>
                    <span className="text-zinc-900 font-medium">
                      {formData.email}
                    </span>
                  </div>
                  
                  <div className="border-t border-zinc-200"></div>
                </>
              )}
              
              {packageName && (
                <>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">선택 패키지</span>
                    <span className="text-zinc-900 font-medium">
                      {packageName}
                    </span>
                  </div>
                  
                  <div className="border-t border-zinc-200"></div>
                </>
              )}
              
              <div className="flex justify-between">
                <span className="text-zinc-600">예식 날짜</span>
                <span className="text-zinc-900 font-medium">
                  {formatWeddingDate(formData.weddingDate || '')}
                </span>
              </div>
              
              <div className="border-t border-zinc-200"></div>
              
              <div className="flex justify-between">
                <span className="text-zinc-600">예식장</span>
                <span className="text-zinc-900 font-medium">
                  {formData.venue}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Next Steps */}
        <div className="space-y-4">
          <div className="text-sm text-zinc-600 leading-relaxed space-y-3">
            <p>
              담당자가 확인 후 영업일 기준 1-2일 이내에<br />
              연락드릴 예정입니다
            </p>
            <p>
              촬영 일정 및 상세 내용은<br />
              유선으로 안내해 드리겠습니다
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Finish Button */}
        <div className="space-y-4">
          <Button
            onClick={handleFinish}
            className={cn(
              "w-full h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "active:scale-[0.98]",
              "shadow-md hover:shadow-lg focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
            )}
          >
            다음
          </Button>

          <p className="text-xs text-center text-zinc-400 leading-relaxed">
            소중한 순간을 함께하게 되어 영광입니다
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

      </div>
    </div>
  )
}
