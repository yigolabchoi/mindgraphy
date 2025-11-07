import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { ClientPortalData, ClientStep, ClientStepStatus } from '@/lib/mock/client'
import { getStepLabel, getStepPath, isDeadlineNear, isDeadlineOverdue, getDaysUntilDeadline } from '@/lib/mock/client'
import { Check, Circle, AlertCircle, Clock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

interface ProgressStepsProps {
  data: ClientPortalData
}

export function ProgressSteps({ data }: ProgressStepsProps) {
  const steps: ClientStep[] = ['contract', 'info', 'proof', 'download']
  
  const getStatusIcon = (status: ClientStepStatus) => {
    switch (status) {
      case 'completed':
        return <Check className="h-5 w-5" />
      case 'in_progress':
        return <Clock className="h-5 w-5" />
      case 'overdue':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Circle className="h-5 w-5" />
    }
  }
  
  const getStatusColor = (status: ClientStepStatus) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white border-green-500'
      case 'in_progress':
        return 'bg-blue-500 text-white border-blue-500'
      case 'overdue':
        return 'bg-red-500 text-white border-red-500'
      default:
        return 'bg-gray-200 text-gray-500 border-gray-300'
    }
  }
  
  const getConnectorColor = (currentStatus: ClientStepStatus, nextStatus?: ClientStepStatus) => {
    if (currentStatus === 'completed') {
      return 'bg-green-500'
    }
    return 'bg-gray-300'
  }
  
  const getDeadlineInfo = (step: ClientStep) => {
    const stepData = data.steps[step]
    if (!stepData.deadline) return null
    
    const days = getDaysUntilDeadline(stepData.deadline)
    const isNear = isDeadlineNear(stepData.deadline)
    const isOverdue = isDeadlineOverdue(stepData.deadline)
    
    if (isOverdue) {
      return {
        text: `${Math.abs(days)}일 초과`,
        color: 'text-red-600',
        urgent: true
      }
    }
    
    if (isNear) {
      return {
        text: days === 0 ? '오늘 마감' : `D-${days}`,
        color: 'text-orange-600',
        urgent: true
      }
    }
    
    return {
      text: `${format(new Date(stepData.deadline), 'M월 d일', { locale: ko })} 마감`,
      color: 'text-gray-600',
      urgent: false
    }
  }

  return (
    <div className="space-y-8">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const stepData = data.steps[step]
              const nextStep = steps[index + 1]
              const nextStepData = nextStep ? data.steps[nextStep] : undefined
              const deadlineInfo = getDeadlineInfo(step)
              const isClickable = stepData.status === 'in_progress' || stepData.status === 'overdue' || stepData.status === 'completed'
              
              return (
                <div key={step} className="flex items-center flex-1">
                  {/* Step Circle */}
                  <div className="flex flex-col items-center">
                    <Link
                      href={isClickable ? getStepPath(data.token, step) : '#'}
                      className={cn(
                        "relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all",
                        getStatusColor(stepData.status),
                        isClickable && "hover:scale-110 cursor-pointer",
                        !isClickable && "cursor-not-allowed"
                      )}
                    >
                      {getStatusIcon(stepData.status)}
                    </Link>
                    <div className="mt-3 text-center">
                      <p className={cn(
                        "text-sm font-medium",
                        stepData.status === 'completed' && "text-green-700",
                        stepData.status === 'in_progress' && "text-blue-700",
                        stepData.status === 'overdue' && "text-red-700",
                        stepData.status === 'pending' && "text-gray-500"
                      )}>
                        {getStepLabel(step)}
                      </p>
                      {deadlineInfo && (
                        <p className={cn("text-xs mt-1", deadlineInfo.color)}>
                          {deadlineInfo.text}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 mx-2 rounded transition-all",
                      getConnectorColor(stepData.status, nextStepData?.status)
                    )} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {steps.map((step, index) => {
          const stepData = data.steps[step]
          const deadlineInfo = getDeadlineInfo(step)
          const isClickable = stepData.status === 'in_progress' || stepData.status === 'overdue' || stepData.status === 'completed'
          
          return (
            <div key={step}>
              <Link
                href={isClickable ? getStepPath(data.token, step) : '#'}
                className={cn(
                  "block rounded-lg border-2 p-4 transition-all",
                  stepData.status === 'completed' && "border-green-500 bg-green-50",
                  stepData.status === 'in_progress' && "border-blue-500 bg-blue-50",
                  stepData.status === 'overdue' && "border-red-500 bg-red-50",
                  stepData.status === 'pending' && "border-gray-300 bg-gray-50",
                  isClickable && "hover:shadow-md cursor-pointer",
                  !isClickable && "cursor-not-allowed opacity-60"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2",
                      getStatusColor(stepData.status)
                    )}>
                      {getStatusIcon(stepData.status)}
                    </div>
                    <div>
                      <p className="font-medium">{getStepLabel(step)}</p>
                      {deadlineInfo && (
                        <p className={cn("text-xs mt-0.5", deadlineInfo.color)}>
                          {deadlineInfo.text}
                        </p>
                      )}
                    </div>
                  </div>
                  {isClickable && (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">전체 진행률</span>
          <span className="font-semibold text-gray-900">
            {Object.values(data.steps).filter(s => s.status === 'completed').length} / {steps.length}
          </span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
            style={{
              width: `${(Object.values(data.steps).filter(s => s.status === 'completed').length / steps.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Next Step CTA */}
      {(() => {
        const nextStep = steps.find(step => {
          const status = data.steps[step].status
          return status === 'in_progress' || status === 'overdue'
        })
        
        if (!nextStep) return null
        
        const stepData = data.steps[nextStep]
        const deadlineInfo = getDeadlineInfo(nextStep)
        
        return (
          <div className={cn(
            "rounded-lg border-2 p-4",
            stepData.status === 'overdue' ? "border-red-500 bg-red-50" : "border-blue-500 bg-blue-50"
          )}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={stepData.status === 'overdue' ? 'destructive' : 'default'}>
                    다음 단계
                  </Badge>
                  {deadlineInfo?.urgent && (
                    <Badge variant="destructive" className="animate-pulse">
                      긴급
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-1">
                  {getStepLabel(nextStep)}
                </h3>
                {deadlineInfo && (
                  <p className={cn("text-sm", deadlineInfo.color)}>
                    {deadlineInfo.text}
                  </p>
                )}
              </div>
              <Link href={getStepPath(data.token, nextStep)}>
                <Button
                  size="lg"
                  className={cn(
                    stepData.status === 'overdue' && "bg-red-600 hover:bg-red-700"
                  )}
                >
                  {stepData.status === 'overdue' ? '지금 완료하기' : '시작하기'}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        )
      })()}
    </div>
  )
}

