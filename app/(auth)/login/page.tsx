'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { mockLogin } from '@/lib/mock/users'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Camera, Loader2, AlertCircle, LogIn } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
  const router = useRouter()
  const login = useAuthStore((state) => state.login)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const user = await mockLogin(email, password)
      
      if (!user) {
        setError('이메일 또는 비밀번호가 올바르지 않습니다.')
        setIsLoading(false)
        return
      }

      login(user)
      
      // 권한에 따라 리다이렉트
      if (user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/admin/my')
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  // 원클릭 로그인 핸들러
  const handleQuickLogin = async (testEmail: string, testPassword: string) => {
    setError('')
    setIsLoading(true)

    try {
      const user = await mockLogin(testEmail, testPassword)
      
      if (!user) {
        setError('로그인에 실패했습니다.')
        setIsLoading(false)
        return
      }

      login(user)
      
      // 권한에 따라 리다이렉트
      if (user.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/admin/my')
      }
    } catch (err) {
      setError('로그인 중 오류가 발생했습니다.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 bg-zinc-900 rounded-lg flex items-center justify-center">
              <Camera className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold">mindgraphy</h1>
          </div>
          <p className="text-muted-foreground">내부 업무 시스템</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>로그인</CardTitle>
            <CardDescription>
              계정 정보를 입력하여 시스템에 접속하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete="current-password"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  '로그인'
                )}
              </Button>
            </form>

            {/* Demo Accounts */}
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm font-semibold mb-3 text-center">테스트 계정</p>
              <div className="space-y-3">
                {/* 관리자 계정 */}
                <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 mb-1">관리자 (대표)</p>
                      <p className="text-xs text-blue-700">admin@mindgraphy.com</p>
                      <p className="text-xs text-blue-700">비밀번호: admin123</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleQuickLogin('admin@mindgraphy.com', 'admin123')}
                      disabled={isLoading}
                    >
                      <LogIn className="mr-1 h-3 w-3" />
                      로그인
                    </Button>
                  </div>
                  <p className="text-xs text-blue-600">→ 모든 기능 접근 가능</p>
                </div>

                {/* 작가 계정 */}
                <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-1">작가 (박작가)</p>
                      <p className="text-xs text-green-700">photographer1@mindgraphy.com</p>
                      <p className="text-xs text-green-700">비밀번호: photo123</p>
                    </div>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleQuickLogin('photographer1@mindgraphy.com', 'photo123')}
                      disabled={isLoading}
                    >
                      <LogIn className="mr-1 h-3 w-3" />
                      로그인
                    </Button>
                  </div>
                  <p className="text-xs text-green-600">→ 내 일정, 배정된 프로젝트만</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Button variant="link" onClick={() => router.push('/')}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
}

