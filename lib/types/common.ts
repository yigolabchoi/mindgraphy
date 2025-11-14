/**
 * Common types used across the application
 * 공통 타입 정의
 */

/** 
 * API Response wrapper type 
 * 모든 API 응답은 이 형태를 따름
 */
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ResponseMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
}

export interface ResponseMeta {
  timestamp: string
  requestId?: string
}

/** 
 * Pagination types 
 */
export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  pagination: PaginationInfo
}

export interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

/** 
 * Filter and search types 
 */
export interface FilterParams {
  search?: string
  startDate?: string
  endDate?: string
  status?: string[]
  [key: string]: unknown
}

/** 
 * Common entity status 
 */
export type EntityStatus = 'active' | 'inactive' | 'deleted'

/** 
 * Timestamp fields 
 */
export interface Timestamps {
  createdAt: string
  updatedAt: string
  deletedAt?: string
}

/** 
 * Base entity with common fields 
 */
export interface BaseEntity extends Timestamps {
  id: string
}

/** 
 * ID types for type safety 
 */
export type UserId = string
export type ProjectId = string
export type CustomerId = string
export type ContractId = string
export type PaymentId = string
export type PhotoId = string
export type AlbumId = string
export type ScheduleId = string

/** 
 * File upload types 
 */
export interface FileUpload {
  file: File
  progress: number
  status: 'pending' | 'uploading' | 'completed' | 'failed'
  error?: string
}

export interface UploadedFile {
  id: string
  fileName: string
  filePath: string
  fileSize: number
  mimeType: string
  url: string
  thumbnailUrl?: string
}

/** 
 * Address type 
 */
export interface Address {
  address: string
  addressDetail?: string
  postalCode?: string
  city?: string
  state?: string
  country?: string
}

/** 
 * Contact information 
 */
export interface ContactInfo {
  name: string
  phone: string
  email?: string
}

/** 
 * Date range 
 */
export interface DateRange {
  startDate: string
  endDate: string
}

/** 
 * Loading states 
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface LoadingStatus {
  state: LoadingState
  error?: Error | null
}

