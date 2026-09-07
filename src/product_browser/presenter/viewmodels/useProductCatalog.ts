import { useDebounce } from '@/src/hooks/Debounce';
import { useEffect, useMemo, useState } from 'react';
import { CancellationTokenSource } from '../../domain/cancellation/CancellationToken';
import { Product } from '../../domain/entities/Product';
import { GetProducts } from '../../domain/usecases/GetProducts';
import { SearchProducts } from '../../domain/usecases/SearchProducts';

export function useProductCatalog(
  getProducts: GetProducts,
  searchProducts: SearchProducts,
  initialCategory?: string
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? 'All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Debounce the searchQuery value by 500ms
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    let isMounted = true;
    const cts = new CancellationTokenSource();

    const load = async () => {
      setLoading(true);
      try {
        const items = debouncedSearchQuery.trim()
          ? await searchProducts.execute(debouncedSearchQuery, cts)
          : await getProducts.execute(cts);

        if (isMounted) setProducts(items);
      } catch (e) {
        const isAbort = e instanceof Error && e.name === 'AbortError';
        if (isMounted && !isAbort && !cts.token.isCancelled) {
          setError(e instanceof Error ? e.message : 'Failed');
        }
      } finally {
        if (isMounted && !cts.token.isCancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      isMounted = false;
      cts.cancel();
    };
  }, [getProducts, searchProducts, debouncedSearchQuery]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map((product) => product.category)));
    return ['All', ...uniqueCategories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  return {
    products: filteredProducts,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
  };
}
