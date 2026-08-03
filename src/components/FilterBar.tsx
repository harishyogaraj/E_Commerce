import { Heart, RotateCcw, SlidersHorizontal } from 'lucide-react'
import type { FilterState, SortOption } from '../types/product'

interface FilterBarProps {
  filters: FilterState
  categories: string[]
  totalCount: number
  favoritesCount: number
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onReset: () => void
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name A–Z' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating-desc', label: 'Highest Rated' },
]

const RATING_OPTIONS = [
  { value: 0, label: 'Any rating' },
  { value: 3, label: '3+ stars' },
  { value: 4, label: '4+ stars' },
  { value: 4.5, label: '4.5+ stars' },
]

export function FilterBar({
  filters,
  categories,
  totalCount,
  favoritesCount,
  onUpdate,
  onReset,
}: FilterBarProps) {
  const selectClass =
    'w-full appearance-none rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]'

  return (
    <aside className="sticky top-4 space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-5 shadow-sm backdrop-blur-md lg:top-6">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-[var(--accent)]" />
          <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-[var(--ink)]">
            Filters
          </h2>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--accent)]"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </button>
      </div>

      <p className="text-sm text-[var(--ink-muted)]">
        Showing <span className="font-semibold text-[var(--ink)]">{totalCount}</span> products
      </p>

      <div className="space-y-2">
        <label htmlFor="category" className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
          Category
        </label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onUpdate('category', e.target.value)}
          className={selectClass}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="rating" className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
          Minimum rating
        </label>
        <select
          id="rating"
          value={filters.minRating}
          onChange={(e) => onUpdate('minRating', Number(e.target.value))}
          className={selectClass}
        >
          {RATING_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="sort" className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">
          Sort by
        </label>
        <select
          id="sort"
          value={filters.sortBy}
          onChange={(e) => onUpdate('sortBy', e.target.value as SortOption)}
          className={selectClass}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => onUpdate('showFavoritesOnly', !filters.showFavoritesOnly)}
        aria-pressed={filters.showFavoritesOnly}
        className={`flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
          filters.showFavoritesOnly
            ? 'bg-[var(--accent)] text-white'
            : 'border border-[var(--border)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--accent)]'
        }`}
      >
        <Heart className={`h-4 w-4 ${filters.showFavoritesOnly ? 'fill-current' : ''}`} />
        Favorites only
        {favoritesCount > 0 && (
          <span
            className={`rounded-full px-2 py-0.5 text-xs tabular-nums ${
              filters.showFavoritesOnly ? 'bg-white/20' : 'bg-[var(--surface-muted)]'
            }`}
          >
            {favoritesCount}
          </span>
        )}
      </button>
    </aside>
  )
}
