/**
 * API Service - Core HTTP client
 * 모든 API 호출의 기본이 되는 서비스
 * 백엔드 연동 시 이 파일만 수정하면 됨
 */

import type { ApiResponse, ApiError } from '../types/common'

// API 설정
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
}

// 인증 토큰 관리
export class TokenManager {
  private static TOKEN_KEY = 'auth_token'
  
  static getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }
  
  static setToken(token: string): void {
    if (typeof window === 'undefined') return
    localStorage.setItem(this.TOKEN_KEY, token)
  }
  
  static removeToken(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem(this.TOKEN_KEY)
  }
}

// Custom error class
export class ApiServiceError extends Error {
  constructor(
    public code: string,
    message: string,
    public status?: number,
    public details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiServiceError'
  }
}

/**
 * API Service class
 * Singleton pattern for HTTP client
 */
export class ApiService {
  private static instance: ApiService
  
  private constructor() {}
  
  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }
  
  /**
   * Build full URL
   */
  private buildUrl(endpoint: string): string {
    const baseURL = API_CONFIG.baseURL.replace(/\/$/, '')
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    return `${baseURL}${path}`
  }
  
  /**
   * Get request headers
   */
  private getHeaders(customHeaders?: Record<string, string>): HeadersInit {
    const headers: Record<string, string> = {
      ...API_CONFIG.headers,
      ...customHeaders,
    }
    
    const token = TokenManager.getToken()
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
  }
  
  /**
   * Handle API response
   */
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    let data: ApiResponse<T>
    
    try {
      data = await response.json()
    } catch (error) {
      throw new ApiServiceError(
        'PARSE_ERROR',
        'Failed to parse response',
        response.status
      )
    }
    
    if (!response.ok) {
      const error: ApiError = data.error || {
        code: 'UNKNOWN_ERROR',
        message: `HTTP ${response.status}: ${response.statusText}`,
      }
      
      throw new ApiServiceError(
        error.code,
        error.message,
        response.status,
        error.details
      )
    }
    
    return data
  }
  
  /**
   * GET request
   */
  async get<T>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = new URL(this.buildUrl(endpoint))
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }
    
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: this.getHeaders(customHeaders),
      })
      
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error
      }
      throw new ApiServiceError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network request failed'
      )
    }
  }
  
  /**
   * POST request
   */
  async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'POST',
        headers: this.getHeaders(customHeaders),
        body: data ? JSON.stringify(data) : undefined,
      })
      
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error
      }
      throw new ApiServiceError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network request failed'
      )
    }
  }
  
  /**
   * PUT request
   */
  async put<T, D = unknown>(
    endpoint: string,
    data?: D,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'PUT',
        headers: this.getHeaders(customHeaders),
        body: data ? JSON.stringify(data) : undefined,
      })
      
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error
      }
      throw new ApiServiceError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network request failed'
      )
    }
  }
  
  /**
   * PATCH request
   */
  async patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'PATCH',
        headers: this.getHeaders(customHeaders),
        body: data ? JSON.stringify(data) : undefined,
      })
      
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error
      }
      throw new ApiServiceError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network request failed'
      )
    }
  }
  
  /**
   * DELETE request
   */
  async delete<T>(
    endpoint: string,
    customHeaders?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.buildUrl(endpoint), {
        method: 'DELETE',
        headers: this.getHeaders(customHeaders),
      })
      
      return this.handleResponse<T>(response)
    } catch (error) {
      if (error instanceof ApiServiceError) {
        throw error
      }
      throw new ApiServiceError(
        'NETWORK_ERROR',
        error instanceof Error ? error.message : 'Network request failed'
      )
    }
  }
  
  /**
   * File upload
   */
  async upload<T>(
    endpoint: string,
    file: File,
    additionalData?: Record<string, string>,
    onProgress?: (progress: number) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value)
      })
    }
    
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      
      // Progress tracking
      if (onProgress) {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100
            onProgress(progress)
          }
        })
      }
      
      // Response handling
      xhr.addEventListener('load', async () => {
        try {
          const response = JSON.parse(xhr.responseText)
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(response)
          } else {
            reject(new ApiServiceError(
              response.error?.code || 'UPLOAD_ERROR',
              response.error?.message || 'File upload failed',
              xhr.status
            ))
          }
        } catch (error) {
          reject(new ApiServiceError(
            'PARSE_ERROR',
            'Failed to parse upload response',
            xhr.status
          ))
        }
      })
      
      // Error handling
      xhr.addEventListener('error', () => {
        reject(new ApiServiceError(
          'NETWORK_ERROR',
          'File upload failed'
        ))
      })
      
      // Timeout handling
      xhr.addEventListener('timeout', () => {
        reject(new ApiServiceError(
          'TIMEOUT_ERROR',
          'File upload timed out'
        ))
      })
      
      // Setup and send
      xhr.open('POST', this.buildUrl(endpoint))
      
      const token = TokenManager.getToken()
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      }
      
      xhr.timeout = API_CONFIG.timeout
      xhr.send(formData)
    })
  }
}

// Export singleton instance
export const apiService = ApiService.getInstance()

