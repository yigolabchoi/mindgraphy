/**
 * Date utility functions
 * 날짜 관련 유틸리티 함수
 */

import { format, parseISO, differenceInDays, isValid, startOfDay, endOfDay } from 'date-fns'
import { ko } from 'date-fns/locale'
import { DATE_CONFIG } from '../config/app.config'

/**
 * Parse date string or Date object to Date
 */
export function parseDate(date: Date | string): Date {
  if (date instanceof Date) {
    return date
  }
  return parseISO(date)
}

/**
 * Check if date is valid
 */
export function isValidDate(date: unknown): date is Date | string {
  if (date instanceof Date) {
    return isValid(date)
  }
  if (typeof date === 'string') {
    return isValid(parseISO(date))
  }
  return false
}

/**
 * Format date to Korean format
 * @example formatDate('2024-01-15') => '2024년 1월 15일'
 */
export function formatDate(date: Date | string): string {
  try {
    const d = parseDate(date)
    return format(d, DATE_CONFIG.displayFormat, { locale: ko })
  } catch (error) {
    console.error('Failed to format date:', error)
    return String(date)
  }
}

/**
 * Format date with weekday
 * @example formatDateWithWeekday('2024-01-15') => '2024년 1월 15일 (월)'
 */
export function formatDateWithWeekday(date: Date | string): string {
  try {
    const d = parseDate(date)
    return format(d, DATE_CONFIG.displayWithWeekdayFormat, { locale: ko })
  } catch (error) {
    console.error('Failed to format date with weekday:', error)
    return String(date)
  }
}

/**
 * Format date and time
 * @example formatDateTime('2024-01-15T14:30:00') => '2024년 1월 15일 14:30'
 */
export function formatDateTime(date: Date | string): string {
  try {
    const d = parseDate(date)
    return format(d, DATE_CONFIG.displayWithTimeFormat, { locale: ko })
  } catch (error) {
    console.error('Failed to format date time:', error)
    return String(date)
  }
}

/**
 * Format time only
 * @example formatTime('2024-01-15T14:30:00') => '14:30'
 */
export function formatTime(date: Date | string): string {
  try {
    const d = parseDate(date)
    return format(d, DATE_CONFIG.timeFormat)
  } catch (error) {
    console.error('Failed to format time:', error)
    return String(date)
  }
}

/**
 * Format date for API
 * @example formatApiDate(new Date('2024-01-15')) => '2024-01-15'
 */
export function formatApiDate(date: Date | string): string {
  try {
    const d = parseDate(date)
    return format(d, DATE_CONFIG.apiFormat)
  } catch (error) {
    console.error('Failed to format API date:', error)
    return String(date)
  }
}

/**
 * Calculate D-Day (days until target date)
 * @returns positive number for future dates, negative for past dates, 0 for today
 */
export function calculateDDay(targetDate: Date | string): number {
  try {
    const target = startOfDay(parseDate(targetDate))
    const today = startOfDay(new Date())
    return differenceInDays(target, today)
  } catch (error) {
    console.error('Failed to calculate D-Day:', error)
    return 0
  }
}

/**
 * Format D-Day for display
 * @example formatDDay(5) => 'D-5'
 * @example formatDDay(0) => 'D-Day'
 * @example formatDDay(-3) => 'D+3'
 */
export function formatDDay(dday: number): string {
  if (dday === 0) return 'D-Day'
  if (dday > 0) return `D-${dday}`
  return `D+${Math.abs(dday)}`
}

/**
 * Get relative time string
 * @example getRelativeTime(new Date()) => '방금 전'
 * @example getRelativeTime(new Date(Date.now() - 1000 * 60 * 5)) => '5분 전'
 */
export function getRelativeTime(date: Date | string): string {
  try {
    const d = parseDate(date)
    const now = new Date()
    const diffMs = now.getTime() - d.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMinutes < 1) return '방금 전'
    if (diffMinutes < 60) return `${diffMinutes}분 전`
    if (diffHours < 24) return `${diffHours}시간 전`
    if (diffDays < 7) return `${diffDays}일 전`
    
    return formatDate(d)
  } catch (error) {
    console.error('Failed to get relative time:', error)
    return String(date)
  }
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  try {
    const d = startOfDay(parseDate(date))
    const today = startOfDay(new Date())
    return d.getTime() === today.getTime()
  } catch (error) {
    return false
  }
}

/**
 * Check if date is in the past
 */
export function isPast(date: Date | string): boolean {
  try {
    const d = endOfDay(parseDate(date))
    const now = new Date()
    return d < now
  } catch (error) {
    return false
  }
}

/**
 * Check if date is in the future
 */
export function isFuture(date: Date | string): boolean {
  try {
    const d = startOfDay(parseDate(date))
    const today = startOfDay(new Date())
    return d > today
  } catch (error) {
    return false
  }
}

/**
 * Get date range string
 * @example getDateRangeString('2024-01-01', '2024-01-31') => '2024년 1월 1일 ~ 2024년 1월 31일'
 */
export function getDateRangeString(startDate: Date | string, endDate: Date | string): string {
  try {
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    return `${start} ~ ${end}`
  } catch (error) {
    return `${startDate} ~ ${endDate}`
  }
}

