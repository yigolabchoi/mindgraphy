import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { EmptyState } from '@/components/common/empty-state'
import { FileQuestion, Home } from 'lucide-react'
import { ROUTES } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
                <FileQuestion className="h-10 w-10 text-zinc-400" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold mb-2">404</h1>
              <h2 className="text-xl font-semibold mb-2">페이지를 찾을 수 없습니다</h2>
              <p className="text-muted-foreground">
                요청하신 페이지가 존재하지 않거나 이동되었습니다.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Link href={ROUTES.HOME}>
                <Button className="w-full">
                  <Home className="mr-2 h-4 w-4" />
                  홈으로 돌아가기
                </Button>
              </Link>
              <Link href={ROUTES.ADMIN_DASHBOARD}>
                <Button variant="outline" className="w-full">
                  관리자 대시보드
                </Button>
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              문제가 지속되면 관리자에게 문의해주세요.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

