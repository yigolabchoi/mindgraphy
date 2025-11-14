/**
 * Custom Hook for API calls
 * API 호출을 위한 Custom Hook
 */

import { useCallback } from 'react'
import { toast } from 'sonner'
import { useAsync, type UseAsyncOptions, type UseAsyncReturn } from './use-async'
import { ApiServiceError } from '../services/api.service'
import type { ApiResponse } from '../types/common'

export interface UseApiOptions<T> extends UseAsyncOptions<T> {
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string
  errorMessage?: string
}

/**
 * Hook for API calls with automatic error handling and toast notifications
 * 
 * @example
 * const { data, isLoading, execute } = useApi(
 *   async () => apiService.get('/projects'),
 *   { successMessage: '프로젝트를 불러왔습니다.' }
 * )
 */
export function useApi<T>(
  apiFunction: () => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): UseAsyncReturn<T> {
  const {
    showSuccessToast = false,
    showErrorToast = true,
    successMessage,
    errorMessage,
    onSuccess,
    onError,
    ...asyncOptions
  } = options
  
  const wrappedFunction = useCallback(async () => {
    try {
      const response = await apiFunction()
      
      if (response.success && response.data !== undefined) {
        if (showSuccessToast && successMessage) {
          toast.success(successMessage)
        }
        return response.data
      }
      
      throw new Error(response.error?.message || 'Unknown error')
    } catch (error) {
      if (showErrorToast) {
        const message = error instanceof ApiServiceError 
          ? error.message 
          : errorMessage || '요청 처리 중 오류가 발생했습니다.'
        toast.error(message)
      }
      throw error
    }
  }, [apiFunction, showSuccessToast, showErrorToast, successMessage, errorMessage])
  
  return useAsync(wrappedFunction, {
    ...asyncOptions,
    onSuccess,
    onError,
  })
}

/**
 * Hook for mutations (POST, PUT, PATCH, DELETE)
 * with automatic success/error toasts
 */
export function useMutation<T, Args extends any[] = any[]>(
  mutationFunction: (...args: Args) => Promise<ApiResponse<T>>,
  options: UseApiOptions<T> = {}
): UseAsyncReturn<T> {
  const {
    showSuccessToast = true, // Show toast by default for mutations
    showErrorToast = true,
    successMessage = '성공적으로 처리되었습니다.',
    errorMessage,
    onSuccess,
    onError,
    ...asyncOptions
  } = options
  
  const wrappedFunction = useCallback(
    async (...args: Args) => {
      try {
        const response = await mutationFunction(...args)
        
        if (response.success && response.data !== undefined) {
          if (showSuccessToast && successMessage) {
            toast.success(successMessage)
          }
          return response.data
        }
        
        throw new Error(response.error?.message || 'Unknown error')
      } catch (error) {
        if (showErrorToast) {
          const message = error instanceof ApiServiceError 
            ? error.message 
            : errorMessage || '요청 처리 중 오류가 발생했습니다.'
          toast.error(message)
        }
        throw error
      }
    },
    [mutationFunction, showSuccessToast, showErrorToast, successMessage, errorMessage]
  )
  
  return useAsync(wrappedFunction, {
    ...asyncOptions,
    onSuccess,
    onError,
  })
}

