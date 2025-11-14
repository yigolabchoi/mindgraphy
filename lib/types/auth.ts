// 권한 및 인증 관련 타입

export type UserRole = 'admin' | 'photographer'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  phone?: string
  assignedProjects?: string[] // 작가의 경우 배정된 프로젝트 ID들
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

