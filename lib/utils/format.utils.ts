/**
 * Format utility functions
 * 포맷팅 관련 유틸리티 함수
 */

/**
 * Format currency to Korean Won
 * @example formatCurrency(1000000) => '₩1,000,000'
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

/**
 * Format currency to 만원 unit
 * @example formatCurrencyToManwon(1000000) => '100만원'
 */
export function formatCurrencyToManwon(amount: number): string {
  const manwon = amount / 10000
  if (manwon >= 10000) {
    // 1억 이상
    const uk = Math.floor(manwon / 10000)
    const remainder = manwon % 10000
    if (remainder === 0) {
      return `${uk}억원`
    }
    return `${uk}억 ${Math.floor(remainder)}만원`
  }
  return `${Math.floor(manwon)}만원`
}

/**
 * Format number with thousand separators
 * @example formatNumber(1000000) => '1,000,000'
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('ko-KR').format(num)
}

/**
 * Format phone number
 * @example formatPhoneNumber('01012345678') => '010-1234-5678'
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }
  
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }
  
  return phone
}

/**
 * Format file size
 * @example formatFileSize(1024) => '1 KB'
 * @example formatFileSize(1048576) => '1 MB'
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

/**
 * Format percentage
 * @example formatPercentage(0.856) => '85.6%'
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`
}

/**
 * Truncate text with ellipsis
 * @example truncateText('Hello World', 5) => 'Hello...'
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength)}...`
}

/**
 * Format name (last name + first name)
 * @example formatFullName('김', '철수') => '김철수'
 */
export function formatFullName(lastName: string, firstName: string): string {
  return `${lastName}${firstName}`
}

/**
 * Format initials
 * @example getInitials('김철수') => '김'
 * @example getInitials('John Doe') => 'JD'
 */
export function getInitials(name: string): string {
  if (!name) return ''
  
  // For Korean names, return first character
  if (/[가-힣]/.test(name)) {
    return name.charAt(0)
  }
  
  // For English names, return first letter of each word
  const words = name.split(' ').filter(Boolean)
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  return words
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

/**
 * Mask sensitive data
 * @example maskEmail('test@example.com') => 't**t@example.com'
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@')
  if (username.length <= 2) {
    return `${username[0]}**@${domain}`
  }
  const masked = username[0] + '*'.repeat(username.length - 2) + username[username.length - 1]
  return `${masked}@${domain}`
}

/**
 * Mask phone number
 * @example maskPhoneNumber('010-1234-5678') => '010-****-5678'
 */
export function maskPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-****-$3')
  }
  
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-***-$3')
}

/**
 * Pluralize word based on count
 * @example pluralize(1, 'item') => '1 item'
 * @example pluralize(2, 'item') => '2 items'
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  const word = count === 1 ? singular : (plural || `${singular}s`)
  return `${count} ${word}`
}

/**
 * Format project number
 * @example formatProjectNumber('PRJ', 2024, 1) => 'PRJ-2024-001'
 */
export function formatProjectNumber(prefix: string, year: number, sequence: number): string {
  return `${prefix}-${year}-${String(sequence).padStart(3, '0')}`
}

/**
 * Format duration in minutes to hours and minutes
 * @example formatDuration(90) => '1시간 30분'
 */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  
  if (hours === 0) {
    return `${mins}분`
  }
  
  if (mins === 0) {
    return `${hours}시간`
  }
  
  return `${hours}시간 ${mins}분`
}

