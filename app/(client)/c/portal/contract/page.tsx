'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import { ArrowLeft, FileText } from 'lucide-react'
import { mockContractTemplate } from '@/lib/mock/settings'

export default function ContractPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)
  const [brideName, setBrideName] = useState('')
  const [groomName, setGroomName] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Contract template from admin settings
  const contractTemplate = mockContractTemplate

  // Mock contract data - 실제로는 고객 데이터에서 가져옴
  const contractData = {
    contractNumber: 'MG-2025-001',
    contractDate: '2025년 1월 15일',
    weddingDate: '2025년 4월 12일',
    weddingTime: '오후 2시',
    venue: '서울 그랜드 웨딩홀',
    packageName: 'new BASIC',
    totalAmount: '1,210,000원',
    depositAmount: '500,000원',
    balanceAmount: '710,000원'
  }

  // Replace variables in contract content
  const replaceVariables = (text: string) => {
    return text
      .replace(/{weddingDate}/g, contractData.weddingDate)
      .replace(/{weddingTime}/g, contractData.weddingTime)
      .replace(/{venue}/g, contractData.venue)
      .replace(/{packageName}/g, contractData.packageName)
      .replace(/{totalAmount}/g, contractData.totalAmount)
      .replace(/{depositAmount}/g, contractData.depositAmount)
      .replace(/{balanceAmount}/g, contractData.balanceAmount)
      .replace(/{contractDate}/g, contractData.contractDate)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleBack = () => {
    router.push('/c/portal')
  }

  const handleSubmit = async () => {
    if (!brideName.trim() || !groomName.trim() || !agreeToTerms) return
    
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // TODO: Send contract agreement to backend
    alert(`계약이 완료되었습니다.\n\n신랑: ${groomName}\n신부: ${brideName}\n\n계약서는 이메일로 발송됩니다.`)
    
    router.push('/c/portal')
  }

  const isValid = brideName.trim().length > 0 && groomName.trim().length > 0 && agreeToTerms

  return (
    <div className="min-h-screen bg-white">
      <div 
        className={cn(
          "max-w-3xl mx-auto px-4 py-8 space-y-8 transition-all duration-1000 ease-out",
          isMounted 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-600" />
          </button>
          <div className="flex-1 text-center">
            <div className="flex items-center justify-center gap-2">
              <FileText className="w-6 h-6 text-zinc-900" />
              <h1 className="text-2xl font-light text-zinc-900 tracking-tight">
                촬영 계약서
              </h1>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              계약번호: {contractData.contractNumber}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Contract Content */}
        <div className="bg-zinc-50 border-2 border-zinc-200 p-8 space-y-8">
          {/* Title */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-medium text-zinc-900">
              {contractTemplate.title}
            </h2>
            <p className="text-sm text-zinc-600">
              {contractTemplate.description}
            </p>
          </div>

          <div className="border-t border-zinc-300"></div>

          {/* Articles (from admin settings) */}
          {contractTemplate.articles.map((article) => (
            <div key={article.id} className="space-y-3">
              <h3 className="text-base font-semibold text-zinc-900">
                {article.title}
              </h3>
              <div className="text-sm text-zinc-700 leading-relaxed space-y-2 pl-4">
                {article.content.map((line, index) => (
                  <p key={index} className={line.startsWith('※') ? 'text-xs text-zinc-500' : ''}>
                    {replaceVariables(line)}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="border-t-2 border-zinc-300 pt-6"></div>

          {/* Contract Date */}
          <div className="text-center">
            <p className="text-sm text-zinc-700">
              {replaceVariables(contractTemplate.footer)}
            </p>
          </div>

          <div className="border-t border-zinc-300"></div>

          {/* Important Notice */}
          <div className="bg-amber-50 border-2 border-amber-200 p-4 space-y-2">
            <p className="text-sm font-semibold text-amber-900">
              📌 중요 안내
            </p>
            <p className="text-xs text-amber-800 leading-relaxed">
              {contractTemplate.importantNotice}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Signature Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-zinc-900 text-center">
            계약 당사자 서명
          </h3>

          <div className="bg-white border-2 border-zinc-200 p-6 space-y-6">
            {/* Company Signature */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-700">
                회사 (마인드그라피)
              </p>
              <div className="border-2 border-zinc-300 bg-zinc-50 p-4 text-center">
                <p className="text-base font-medium text-zinc-900">
                  마인드그라피
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  대표자 서명
                </p>
              </div>
            </div>

            <div className="border-t border-zinc-200"></div>

            {/* Customer Signature */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-zinc-700">
                고객 (예식 당사자)
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-zinc-600">
                    신랑 성함 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={groomName}
                    onChange={(e) => setGroomName(e.target.value)}
                    placeholder="신랑 성함을 입력하세요"
                    className="h-12 border-2 border-zinc-300 focus:border-zinc-900 focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-zinc-600">
                    신부 성함 <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={brideName}
                    onChange={(e) => setBrideName(e.target.value)}
                    placeholder="신부 성함을 입력하세요"
                    className="h-12 border-2 border-zinc-300 focus:border-zinc-900 focus:ring-0"
                  />
                </div>
              </div>

              <p className="text-xs text-zinc-500 leading-relaxed">
                위 성함은 계약서의 서명으로 사용되며, 법적 효력이 있습니다.<br />
                정확한 성함을 입력해 주세요.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-200"></div>

        {/* Agreement Checkbox */}
        <div className="flex items-start space-x-3 bg-zinc-50 border-2 border-zinc-200 p-6">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            className="mt-1"
          />
          <label
            htmlFor="terms"
            className="text-sm text-zinc-700 leading-relaxed cursor-pointer"
          >
            본인은 위 계약서의 내용을 충분히 확인하였으며, 모든 조항에 동의합니다. 
            본 계약서는 전자 문서로서 법적 효력을 가지며, 계약 체결 후에는 취소 및 환불 규정이 적용됨을 이해하고 동의합니다.
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className={cn(
              "flex-1 h-14 text-base font-normal transition-all duration-300",
              "border-2 border-zinc-300 bg-white text-zinc-700",
              "hover:border-zinc-900 hover:bg-zinc-50 hover:text-zinc-900",
              "active:scale-[0.98]"
            )}
          >
            돌아가기
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className={cn(
              "flex-1 h-14 text-base font-normal transition-all duration-300",
              "bg-zinc-900 hover:bg-zinc-800 text-white",
              "active:scale-[0.98]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-md hover:shadow-lg"
            )}
          >
            {isSubmitting ? '처리 중...' : '계약 확인 및 동의'}
          </Button>
        </div>

        {/* Footer Notice */}
        <div className="text-center text-xs text-zinc-500 leading-relaxed pt-4">
          계약서는 체결 후 등록하신 이메일로 발송됩니다<br />
          문의사항이 있으시면 언제든지 연락 주세요 (02-2202-9966)
        </div>
      </div>
    </div>
  )
}

