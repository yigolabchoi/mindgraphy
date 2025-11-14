/**
 * Validation utility functions
 * 유효성 검증 관련 유틸리티 함수
 */

import { VALIDATION_RULES } from '../config/app.config'

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return VALIDATION_RULES.email.pattern.test(email)
}

/**
 * Validate Korean phone number
 */
export function isValidPhoneNumber(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '')
  return VALIDATION_RULES.phone.pattern.test(cleaned)
}

/**
 * Validate password strength
 */
export function isValidPassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []
  const rules = VALIDATION_RULES.password
  
  if (password.length < rules.minLength) {
    errors.push(`비밀번호는 최소 ${rules.minLength}자 이상이어야 합니다.`)
  }
  
  if (rules.requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('대문자를 포함해야 합니다.')
  }
  
  if (rules.requireLowercase && !/[a-z]/.test(password)) {
    errors.push('소문자를 포함해야 합니다.')
  }
  
  if (rules.requireNumbers && !/\d/.test(password)) {
    errors.push('숫자를 포함해야 합니다.')
  }
  
  if (rules.requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('특수문자를 포함해야 합니다.')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Validate file type
 */
export function isValidFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type)
}

/**
 * Validate file size
 */
export function isValidFileSize(file: File, maxSizeBytes: number): boolean {
  return file.size <= maxSizeBytes
}

/**
 * Validate Korean name
 */
export function isValidKoreanName(name: string): boolean {
  return /^[가-힣]{2,10}$/.test(name)
}

/**
 * Validate required field
 */
export function isRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/**
 * Validate min length
 */
export function minLength(value: string, min: number): boolean {
  return value.length >= min
}

/**
 * Validate max length
 */
export function maxLength(value: string, max: number): boolean {
  return value.length <= max
}

/**
 * Validate number range
 */
export function inRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function isValidDateFormat(dateString: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  
  const date = new Date(dateString)
  return !isNaN(date.getTime())
}

/**
 * Validate time format (HH:mm)
 */
export function isValidTimeFormat(timeString: string): boolean {
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
  return regex.test(timeString)
}

/**
 * Sanitize HTML input
 */
export function sanitizeHtml(html: string): string {
  const temp = document.createElement('div')
  temp.textContent = html
  return temp.innerHTML
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\D/g, '')
  
  if (cleaned.length < 13 || cleaned.length > 19) {
    return false
  }
  
  let sum = 0
  let isEven = false
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10)
    
    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

/**
 * Validate business registration number (Korean)
 */
export function isValidBusinessNumber(businessNumber: string): boolean {
  const cleaned = businessNumber.replace(/\D/g, '')
  
  if (cleaned.length !== 10) {
    return false
  }
  
  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5]
  let sum = 0
  
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i], 10) * weights[i]
  }
  
  sum += Math.floor((parseInt(cleaned[8], 10) * 5) / 10)
  const checkDigit = (10 - (sum % 10)) % 10
  
  return checkDigit === parseInt(cleaned[9], 10)
}

/**
 * Validate Korean resident registration number
 */
export function isValidResidentNumber(residentNumber: string): boolean {
  const cleaned = residentNumber.replace(/\D/g, '')
  
  if (cleaned.length !== 13) {
    return false
  }
  
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5]
  let sum = 0
  
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cleaned[i], 10) * weights[i]
  }
  
  const checkDigit = (11 - (sum % 11)) % 10
  
  return checkDigit === parseInt(cleaned[12], 10)
}

