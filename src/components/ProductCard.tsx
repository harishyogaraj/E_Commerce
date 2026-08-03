import { Heart, Star } from 'lucide-react'
import type { Product } from '../types/product'

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function ProductCard({ product, isFavorite, onToggleFavorite }: ProductCardProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border bg-[var(--surface)] transition-all duration-300 ${
        isFavorite
          ? 'border-[var(--accent)] shadow-[0_0_0_1px_var(--accent)]'
          : 'border-[var(--border)] hover:border-[var(--ink-muted)]'
      }`}
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--surface-muted)]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite
              ? 'bg-[var(--accent)] text-white'
              : 'bg-white/90 text-[var(--ink-muted)] hover:text-[var(--accent)]'
          }`}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} strokeWidth={2} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-md bg-[var(--ink)]/80 px-2.5 py-1 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-[family-name:var(--font-body)] text-[0.95rem] font-medium leading-snug text-[var(--ink)]">
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <p className="text-lg font-semibold tracking-tight text-[var(--ink)]">
            ${product.price.toFixed(2)}
          </p>
          <div className="flex items-center gap-1 text-sm text-[var(--ink-muted)]">
            <Star className="h-3.5 w-3.5 fill-[var(--star)] text-[var(--star)]" />
            <span className="font-medium tabular-nums">{product.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
