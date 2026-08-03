import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'vista-favorites'

function readFavorites(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number') : []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => readFavorites())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    )
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.includes(id),
    [favorites],
  )

  return { favorites, toggleFavorite, isFavorite, count: favorites.length }
}
