// hooks/useCart.ts
import { useState, useCallback } from 'react';

export function useCart() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  const addItem = useCallback(
    async (productId: string, quantity: number) => {
      try {
        const response = await fetch('/api/cart/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId, quantity }),
        });
        if (!response.ok) throw new Error('Failed to add to cart');
        await fetchCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [fetchCart]
  );

  const updateItem = useCallback(
    async (itemId: string, quantity: number) => {
      try {
        const response = await fetch(`/api/cart/${itemId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity }),
        });
        if (!response.ok) throw new Error('Failed to update cart');
        await fetchCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [fetchCart]
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      try {
        const response = await fetch(`/api/cart/${itemId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to remove from cart');
        await fetchCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [fetchCart]
  );

  const saveForLater = useCallback(
    async (itemId: string) => {
      try {
        const response = await fetch('/api/cart/save-for-later', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId }),
        });
        if (!response.ok) throw new Error('Failed to save for later');
        await fetchCart();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      }
    },
    [fetchCart]
  );

  return { items, loading, error, fetchCart, addItem, updateItem, removeItem, saveForLater };
}
