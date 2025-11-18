import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
  items: T[]
  itemsPerPage?: number
}

interface UsePaginationReturn<T> {
  currentPage: number
  totalPages: number
  currentItems: T[]
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  canGoNext: boolean
  canGoPrev: boolean
}

/**
 * Hook for managing paginated data
 * @param items - Array of items to paginate
 * @param itemsPerPage - Number of items per page (default: 10)
 * @returns Pagination utilities and current page items
 */
export function usePagination<T>({
  items,
  itemsPerPage = 10,
}: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }, [items, currentPage, itemsPerPage])

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const goToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages))
    setCurrentPage(pageNumber)
  }

  const canGoNext = currentPage < totalPages
  const canGoPrev = currentPage > 1

  return {
    currentPage,
    totalPages,
    currentItems,
    nextPage,
    prevPage,
    goToPage,
    canGoNext,
    canGoPrev,
  }
}

