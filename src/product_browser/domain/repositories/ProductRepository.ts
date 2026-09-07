import { Product } from '../entities/Product';

export interface ProductRepository {
  fetchProducts(signal?: AbortSignal | undefined): Promise<Product[]>;
  fetchProductById(id: string, signal?: AbortSignal | undefined): Promise<Product>;
  searchProducts(query: string, signal?: AbortSignal | undefined): Promise<Product[]>;
  fetchCategories(signal?: AbortSignal | undefined): Promise<string[]>;
}
