import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import productsData from './data/products.json'
import type { Product } from './types/product'
import { useFavorites } from './hooks/useFavorites'
import { useProductFilters } from './hooks/useProductFilters'
import { FilterBar } from './components/FilterBar'
import { ProductGrid } from './components/ProductGrid'
import { Pagination } from './components/Pagination'

export default function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const { favorites, toggleFavorite, isFavorite, count: favoritesCount } = useFavorites()
  const {
    filters,
    categories,
    filtered,
    paginated,
    page,
    totalPages,
    setPage,
    updateFilter,
    resetFilters,
  } = useProductFilters(products, favorites)

  useEffect(() => {
    // Simulate fetch from JSON (asynchronous load)
    const load = async () => {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 200))
      setProducts(productsData as Product[])
      setLoading(false)
    }
    void load()
  }, [])

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-[var(--border)] pb-6 sm:mb-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="animate-brand font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-[0.08em] text-[var(--ink)] sm:text-5xl">
              VISTA
            </p>
            <p className="mt-2 max-w-md text-sm text-[var(--ink-muted)] sm:text-base">
              Curated essentials — filter, sort, and save your favorites.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm text-[var(--ink)]">
            <Heart
              className={`h-4 w-4 ${favoritesCount > 0 ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-[var(--ink-muted)]'}`}
            />
            <span className="font-medium tabular-nums">{favoritesCount}</span>
            <span className="text-[var(--ink-muted)]">saved</span>
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
        <FilterBar
          filters={filters}
          categories={categories}
          totalCount={filtered.length}
          favoritesCount={favoritesCount}
          onUpdate={updateFilter}
          onReset={resetFilters}
        />

        <main className="min-w-0 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]"
                >
                  <div className="aspect-square bg-[var(--surface-muted)]" />
                  <div className="space-y-3 p-4">
                    <div className="h-4 w-3/4 rounded bg-[var(--surface-muted)]" />
                    <div className="h-4 w-1/3 rounded bg-[var(--surface-muted)]" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <ProductGrid
                products={paginated}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
