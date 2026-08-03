import { useMemo, useState } from 'react'
import type { FilterState, Product, SortOption } from '../types/product'

const PAGE_SIZE = 8

const initialFilters: FilterState = {
  category: 'All',
  minRating: 0,
  sortBy: 'name-asc',
  showFavoritesOnly: false,
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products]
  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'rating-desc':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name-asc':
    default:
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
  }
}

export function useProductFilters(products: Product[], favorites: number[]) {
  const [filters, setFilters] = useState<FilterState>(initialFilters)
  const [page, setPage] = useState(1)

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))].sort()
    return ['All', ...unique]
  }, [products])

  const filtered = useMemo(() => {
    let result = products

    if (filters.category !== 'All') {
      result = result.filter((p) => p.category === filters.category)
    }

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating)
    }

    if (filters.showFavoritesOnly) {
      result = result.filter((p) => favorites.includes(p.id))
    }

    return sortProducts(result, filters.sortBy)
  }, [products, filters, favorites])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filtered.slice(start, start + PAGE_SIZE)
  }, [filtered, currentPage])

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setPage(1)
  }

  const resetFilters = () => {
    setFilters(initialFilters)
    setPage(1)
  }

  return {
    filters,
    categories,
    filtered,
    paginated,
    page: currentPage,
    totalPages,
    pageSize: PAGE_SIZE,
    setPage,
    updateFilter,
    resetFilters,
  }
}
