import { addDays, subDays, format } from 'date-fns'

export interface DownloadFile {
  id: string
  name: string
  type: 'final' | 'original' | 'album'
  description: string
  size: string
  sizeBytes: number
  format: string
  expiresAt: string
  isExpired: boolean
  requiresPassword: boolean
  password?: string // For demo purposes only
  downloadCount: number
  maxDownloads?: number
}

const today = new Date()

// Mock download files
export const mockDownloadFiles: DownloadFile[] = [
  {
    id: 'file-1',
    name: '최종 보정 사진 (고해상도)',
    type: 'final',
    description: '선택하신 50장의 최종 보정 사진입니다',
    size: '2.4 GB',
    sizeBytes: 2400000000,
    format: 'ZIP (JPEG)',
    expiresAt: format(addDays(today, 30), 'yyyy-MM-dd'),
    isExpired: false,
    requiresPassword: true,
    password: '1234', // Demo password
    downloadCount: 1,
    maxDownloads: 5
  },
  {
    id: 'file-2',
    name: '원본 사진 (전체)',
    type: 'original',
    description: '촬영된 모든 원본 사진 (450장)',
    size: '8.7 GB',
    sizeBytes: 8700000000,
    format: 'ZIP (RAW + JPEG)',
    expiresAt: format(addDays(today, 60), 'yyyy-MM-dd'),
    isExpired: false,
    requiresPassword: false,
    downloadCount: 0,
    maxDownloads: 3
  },
  {
    id: 'file-3',
    name: '디지털 앨범 PDF',
    type: 'album',
    description: '디자인 편집된 앨범 파일',
    size: '156 MB',
    sizeBytes: 156000000,
    format: 'PDF',
    expiresAt: format(addDays(today, 90), 'yyyy-MM-dd'),
    isExpired: false,
    requiresPassword: false,
    downloadCount: 2,
    maxDownloads: 10
  }
]

// Mock expired file for testing
export const mockExpiredFile: DownloadFile = {
  id: 'file-expired',
  name: '스냅 사진 (이전 버전)',
  type: 'original',
  description: '이전에 제공되었던 스냅 사진',
  size: '1.2 GB',
  sizeBytes: 1200000000,
  format: 'ZIP (JPEG)',
  expiresAt: format(subDays(today, 5), 'yyyy-MM-dd'),
  isExpired: true,
  requiresPassword: false,
  downloadCount: 3,
  maxDownloads: 5
}

// Helper: Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Helper: Get file type label
export const getFileTypeLabel = (type: DownloadFile['type']): string => {
  const labels = {
    final: '최종 보정본',
    original: '원본 파일',
    album: '앨범'
  }
  return labels[type]
}

// Helper: Get file type color
export const getFileTypeColor = (type: DownloadFile['type']): string => {
  const colors = {
    final: 'bg-green-100 text-green-800',
    original: 'bg-blue-100 text-blue-800',
    album: 'bg-purple-100 text-purple-800'
  }
  return colors[type]
}

// Helper: Check if download is available
export const isDownloadAvailable = (file: DownloadFile): boolean => {
  if (file.isExpired) return false
  if (file.maxDownloads && file.downloadCount >= file.maxDownloads) return false
  return true
}

// Helper: Get download status message
export const getDownloadStatusMessage = (file: DownloadFile): string => {
  if (file.isExpired) {
    return '만료됨'
  }
  if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
    return '다운로드 횟수 초과'
  }
  return `${file.downloadCount} / ${file.maxDownloads || '∞'} 다운로드`
}

// Helper: Calculate days until expiry
export const getDaysUntilExpiry = (expiresAt: string): number => {
  const expiryDate = new Date(expiresAt)
  const diffTime = expiryDate.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

// Mock download attempt (logs to console)
export const mockDownloadFile = (file: DownloadFile, password?: string): {
  success: boolean
  message: string
  downloadUrl?: string
} => {
  console.log('=== Download Attempt ===')
  console.log('File:', file.name)
  console.log('Type:', file.type)
  console.log('Size:', file.size)
  console.log('Format:', file.format)
  console.log('Requires Password:', file.requiresPassword)
  
  if (file.isExpired) {
    console.log('Status: FAILED - File expired')
    console.log('Expired on:', file.expiresAt)
    return {
      success: false,
      message: '파일이 만료되었습니다'
    }
  }
  
  if (file.maxDownloads && file.downloadCount >= file.maxDownloads) {
    console.log('Status: FAILED - Max downloads exceeded')
    console.log(`Download count: ${file.downloadCount} / ${file.maxDownloads}`)
    return {
      success: false,
      message: '다운로드 횟수를 초과했습니다'
    }
  }
  
  if (file.requiresPassword) {
    console.log('Password required:', true)
    console.log('Entered password:', password || '(none)')
    console.log('Expected password:', file.password || '(not set)')
    
    if (!password) {
      console.log('Status: FAILED - No password provided')
      return {
        success: false,
        message: '비밀번호를 입력해주세요'
      }
    }
    
    if (password !== file.password) {
      console.log('Status: FAILED - Incorrect password')
      return {
        success: false,
        message: '비밀번호가 올바르지 않습니다'
      }
    }
  }
  
  console.log('Status: SUCCESS')
  console.log('Download URL: (mock) https://download.mindgraphy.com/files/' + file.id)
  console.log('========================')
  
  return {
    success: true,
    message: '다운로드를 시작합니다',
    downloadUrl: `https://download.mindgraphy.com/files/${file.id}`
  }
}

