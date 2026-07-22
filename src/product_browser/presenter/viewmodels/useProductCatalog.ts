import { useEffect, useMemo, useState } from 'react';
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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const items = searchQuery
          ? await searchProducts.execute(searchQuery)
          : await getProducts.execute();

        setProducts(items);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [getProducts, searchProducts, searchQuery]);

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
