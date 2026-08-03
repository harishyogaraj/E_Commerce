import type { Product } from '../types/product'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (id: number) => void
}

export function ProductGrid({ products, isFavorite, onToggleFavorite }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 px-6 py-16 text-center">
        <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)]">
          No products found
        </p>
        <p className="mt-2 max-w-sm text-sm text-[var(--ink-muted)]">
          Try adjusting your filters or clear the favorites-only view to see more items.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="animate-fade-up"
          style={{ animationDelay: `${Math.min(index, 7) * 40}ms` }}
        >
          <ProductCard
            product={product}
            isFavorite={isFavorite(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  )
}
