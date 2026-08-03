export interface Product {
  id: number
  name: string
  price: number
  category: string
  rating: number
  image: string
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc'

export interface FilterState {
  category: string
  minRating: number
  sortBy: SortOption
  showFavoritesOnly: boolean
}
