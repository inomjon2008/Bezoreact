import { useCallback, useEffect, useState } from 'react'

/**
 * A Set of ids saved in localStorage (e.g. completed lessons).
 * Falls back to in-memory state when storage is unavailable.
 * Swap for an API call once user accounts exist.
 */
export default function useStoredSet(key) {
  const [set, setSet] = useState(() => {
    try {
      return new Set(JSON.parse(localStorage.getItem(key) || '[]'))
    } catch {
      return new Set()
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify([...set]))
    } catch {
      /* storage blocked — keep in memory */
    }
  }, [key, set])

  const toggle = useCallback((id) => {
    setSet((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return [set, toggle]
}
