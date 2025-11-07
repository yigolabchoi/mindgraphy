'use client'

import { useRef, forwardRef, useImperativeHandle } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Eraser, Download } from 'lucide-react'

interface SignatureCanvasComponentProps {
  onSave?: (dataUrl: string) => void
}

export interface SignatureCanvasRef {
  clear: () => void
  isEmpty: () => boolean
  toDataURL: () => string
}

export const SignatureCanvasComponent = forwardRef<SignatureCanvasRef, SignatureCanvasComponentProps>(
  ({ onSave }, ref) => {
    const sigCanvas = useRef<SignatureCanvas>(null)

    useImperativeHandle(ref, () => ({
      clear: () => {
        sigCanvas.current?.clear()
      },
      isEmpty: () => {
        return sigCanvas.current?.isEmpty() ?? true
      },
      toDataURL: () => {
        return sigCanvas.current?.toDataURL() ?? ''
      }
    }))

    const handleClear = () => {
      sigCanvas.current?.clear()
    }

    const handleSave = () => {
      if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
        const dataUrl = sigCanvas.current.toDataURL()
        onSave?.(dataUrl)
      }
    }

    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">전자 서명</CardTitle>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                <Eraser className="mr-2 h-4 w-4" />
                지우기
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-2">
              <SignatureCanvas
                ref={sigCanvas}
                canvasProps={{
                  className: 'w-full h-48 rounded cursor-crosshair',
                  style: { touchAction: 'none' }
                }}
                backgroundColor="white"
                penColor="black"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              위 영역에 마우스나 손가락으로 서명해주세요
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }
)

SignatureCanvasComponent.displayName = 'SignatureCanvasComponent'

