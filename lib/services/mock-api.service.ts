/**
 * Mock API Service
 * 현재는 mock 데이터를 반환하며, 백엔드 연동 시 실제 API로 교체
 * Use in development until backend is ready
 */

import type { ApiResponse } from '../types/common'
import type { User } from '../types'
import type { Project, Customer, Contract, Payment } from '../types'
import type { MySchedule } from '../mock/me'

// Mock delay to simulate network request
const MOCK_DELAY = 300 // ms

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
}

function createErrorResponse(code: string, message: string): ApiResponse<never> {
  return {
    success: false,
    error: {
      code,
      message,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
}

/**
 * Mock API Service class
 * 백엔드 연동 전까지 사용할 Mock API
 */
export class MockApiService {
  private static instance: MockApiService
  
  private constructor() {}
  
  static getInstance(): MockApiService {
    if (!MockApiService.instance) {
      MockApiService.instance = new MockApiService()
    }
    return MockApiService.instance
  }
  
  /**
   * Auth API
   */
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    await delay(MOCK_DELAY)
    
    // Mock user data
    const mockUsers: Record<string, { user: User; password: string }> = {
      'admin@mindgraphy.com': {
        user: {
          id: 'admin-1',
          email: 'admin@mindgraphy.com',
          role: 'admin',
          firstName: '관리자',
          lastName: '김',
          status: 'active',
        },
        password: 'admin123',
      },
      'photographer@mindgraphy.com': {
        user: {
          id: 'photo-1',
          email: 'photographer@mindgraphy.com',
          role: 'photographer',
          firstName: '작가',
          lastName: '박',
          status: 'active',
        },
        password: 'photo123',
      },
    }
    
    const userData = mockUsers[email]
    
    if (!userData || userData.password !== password) {
      return createErrorResponse('AUTH_FAILED', '이메일 또는 비밀번호가 올바르지 않습니다.')
    }
    
    return createSuccessResponse({
      user: userData.user,
      token: 'mock-jwt-token-' + Date.now(),
    })
  }
  
  async logout(): Promise<ApiResponse<void>> {
    await delay(MOCK_DELAY)
    return createSuccessResponse(undefined)
  }
  
  async getCurrentUser(): Promise<ApiResponse<User>> {
    await delay(MOCK_DELAY)
    
    // Mock current user
    const mockUser: User = {
      id: 'admin-1',
      email: 'admin@mindgraphy.com',
      role: 'admin',
      firstName: '관리자',
      lastName: '김',
      status: 'active',
    }
    
    return createSuccessResponse(mockUser)
  }
  
  /**
   * Project API
   */
  async getProjects(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<ApiResponse<{ items: Project[]; total: number }>> {
    await delay(MOCK_DELAY)
    
    // Import mock data dynamically
    const { mockProjects } = await import('../mock-data')
    
    let filteredProjects = [...mockProjects]
    
    if (params?.status) {
      filteredProjects = filteredProjects.filter(p => p.projectStatus === params.status)
    }
    
    if (params?.search) {
      const search = params.search.toLowerCase()
      filteredProjects = filteredProjects.filter(p => 
        p.projectNumber.toLowerCase().includes(search) ||
        p.customer?.groomName.toLowerCase().includes(search) ||
        p.customer?.brideName.toLowerCase().includes(search)
      )
    }
    
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    
    return createSuccessResponse({
      items: filteredProjects.slice(start, end),
      total: filteredProjects.length,
    })
  }
  
  async getProject(id: string): Promise<ApiResponse<Project>> {
    await delay(MOCK_DELAY)
    
    const { mockProjects } = await import('../mock-data')
    const project = mockProjects.find(p => p.id === id)
    
    if (!project) {
      return createErrorResponse('NOT_FOUND', '프로젝트를 찾을 수 없습니다.')
    }
    
    return createSuccessResponse(project)
  }
  
  /**
   * Customer API
   */
  async getCustomers(params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<ApiResponse<{ items: Customer[]; total: number }>> {
    await delay(MOCK_DELAY)
    
    const { mockCustomers } = await import('../mock-data')
    
    let filteredCustomers = [...mockCustomers]
    
    if (params?.search) {
      const search = params.search.toLowerCase()
      filteredCustomers = filteredCustomers.filter(c => 
        c.groomName.toLowerCase().includes(search) ||
        c.brideName.toLowerCase().includes(search) ||
        c.email.toLowerCase().includes(search)
      )
    }
    
    const page = params?.page || 1
    const limit = params?.limit || 10
    const start = (page - 1) * limit
    const end = start + limit
    
    return createSuccessResponse({
      items: filteredCustomers.slice(start, end),
      total: filteredCustomers.length,
    })
  }
  
  /**
   * Schedule API
   */
  async getMySchedule(photographerId: string, date?: string): Promise<ApiResponse<MySchedule[]>> {
    await delay(MOCK_DELAY)
    
    const { getTodaySchedule, getAllUpcomingSchedule } = await import('../mock/me')
    
    if (date) {
      // Filter by specific date
      const allSchedules = getAllUpcomingSchedule()
      const filtered = allSchedules.filter(s => s.date === date)
      return createSuccessResponse(filtered)
    }
    
    // Return today's schedule
    return createSuccessResponse(getTodaySchedule())
  }
  
  async getAllUpcomingSchedule(photographerId: string): Promise<ApiResponse<MySchedule[]>> {
    await delay(MOCK_DELAY)
    
    const { getAllUpcomingSchedule } = await import('../mock/me')
    return createSuccessResponse(getAllUpcomingSchedule())
  }
  
  /**
   * Contract API
   */
  async getContracts(): Promise<ApiResponse<Contract[]>> {
    await delay(MOCK_DELAY)
    
    const { mockContracts } = await import('../mock-data')
    return createSuccessResponse(mockContracts)
  }
  
  /**
   * Payment API
   */
  async getPayments(): Promise<ApiResponse<Payment[]>> {
    await delay(MOCK_DELAY)
    
    const { mockPayments } = await import('../mock-data')
    return createSuccessResponse(mockPayments)
  }
}

// Export singleton instance
export const mockApiService = MockApiService.getInstance()

/**
 * Feature flag to switch between mock and real API
 * 백엔드 연동 시 이 값을 false로 변경
 */
export const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API !== 'false'

