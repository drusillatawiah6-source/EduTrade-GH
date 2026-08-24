// hooks/useWishlist.ts
import { useState, useCallback } from 'react';

export function useWishlist() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/wishlist');
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (productId: string) => {
      try {
        const response = await fetch('/api/wishlist/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (!response.ok) throw new Error('Failed to add to wishlist');
        await fetchWishlist();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [fetchWishlist]
  );

  const removeItem = useCallback(
    async (productId: string) => {
      try {
        const response = await fetch('/api/wishlist/remove', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });
        if (!response.ok) throw new Error('Failed to remove from wishlist');
        await fetchWishlist();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [fetchWishlist]
  );

  return { items, loading, error, fetchWishlist, addItem, removeItem };
}
