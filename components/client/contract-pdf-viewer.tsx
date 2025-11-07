import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContractPdfViewerProps {
  contractId: string
  contractTitle: string
  packageName: string
}

export function ContractPdfViewer({ contractId, contractTitle, packageName }: ContractPdfViewerProps) {
  return (
    <Card>
      <CardContent className="p-0">
        {/* PDF Placeholder */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg p-8 border-b">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="text-center space-y-3 pb-6 border-b-2 border-gray-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="h-8 w-8 text-gray-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                웨딩 촬영 서비스 계약서
              </h1>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary">{packageName}</Badge>
                <Badge variant="outline" className="text-xs">
                  계약번호: {contractId}
                </Badge>
              </div>
            </div>

            {/* Contract Content */}
            <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제1조 (목적)</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  본 계약은 MindGraphy(이하 &quot;갑&quot;)와 고객(이하 &quot;을&quot;) 간에 웨딩 사진 촬영 및 관련 서비스 제공에 관한 
                  권리와 의무를 명확히 하여 상호 신뢰를 바탕으로 원활한 서비스 이행을 목적으로 한다.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제2조 (서비스 내용)</h2>
                <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                  <li>본식 촬영 서비스 (예식 당일 전문 포토그래퍼 배정)</li>
                  <li>메이크업 리허설 촬영 (선택 옵션)</li>
                  <li>야외 스냅 촬영 (선택 옵션)</li>
                  <li>원본 사진 전달 (고해상도 JPEG 포맷)</li>
                  <li>보정 사진 제공 (고객 선택 50장 기준)</li>
                  <li>온라인 프루프 갤러리 제공 (3주 이내)</li>
                  <li>최종 앨범 제작 및 배송 (선택 옵션)</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제3조 (계약 금액 및 지불 조건)</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>1. 총 계약 금액: 패키지 가격에 준함</p>
                  <p>2. 계약금(선금): 총 금액의 30% (계약 체결 시)</p>
                  <p>3. 중도금: 총 금액의 30% (예식 1개월 전)</p>
                  <p>4. 잔금: 총 금액의 40% (촬영 완료 후)</p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제4조 (촬영 일정 및 변경)</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  촬영 일정은 상호 협의하에 정하며, 부득이한 사유로 변경이 필요한 경우 최소 7일 전 통보하여야 한다. 
                  천재지변 등 불가항력적인 사유로 인한 일정 변경 시에는 상호 협의하여 새로운 일정을 정한다.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제5조 (저작권 및 초상권)</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>1. 촬영된 사진의 저작권은 &quot;갑&quot;에게 있으며, &quot;을&quot;은 개인적 용도로만 사용할 수 있다.</p>
                  <p>2. &quot;갑&quot;은 &quot;을&quot;의 동의 하에 촬영 사진을 포트폴리오 및 홍보 목적으로 사용할 수 있다.</p>
                  <p>3. &quot;을&quot;은 촬영 사진을 상업적 용도로 사용할 수 없다.</p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제6조 (취소 및 환불)</h2>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>1. 계약 체결 후 7일 이내 취소: 전액 환불</p>
                  <p>2. 촬영 30일 전 취소: 계약금 공제 후 환불</p>
                  <p>3. 촬영 14일 전 취소: 중도금까지 공제 후 환불</p>
                  <p>4. 촬영 7일 전 이후 취소: 환불 불가</p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제7조 (책임 사항)</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  &quot;갑&quot;은 전문적인 촬영 서비스 제공을 위해 최선을 다하며, &quot;을&quot;은 촬영에 필요한 정보를 
                  정확히 제공하고 촬영 당일 일정을 준수할 의무가 있다. 천재지변, 장비 고장 등 
                  불가항력적 사유로 인한 촬영 불가 시 양측은 상호 협의하여 해결한다.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-gray-900">제8조 (분쟁 해결)</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  본 계약과 관련하여 분쟁이 발생한 경우, 양 당사자는 우선 협의를 통해 해결하며, 
                  협의가 이루어지지 않을 경우 관할 법원의 판결에 따른다.
                </p>
              </section>
            </div>

            {/* Footer */}
            <div className="text-center py-6 border-t-2 border-gray-300">
              <p className="text-sm text-gray-600 mb-4">
                본 계약서는 2부를 작성하여 &quot;갑&quot;과 &quot;을&quot;이 각각 1부씩 보관한다.
              </p>
              <p className="text-xs text-gray-500">
                계약일자: {new Date().toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className="p-4 bg-gray-50 flex justify-end">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            PDF 다운로드
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

