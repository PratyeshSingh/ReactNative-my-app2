import { Product } from '../entities/Product';

export interface ProductRepository {
  fetchProducts(): Promise<Product[]>;
  fetchProductById(id: string): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;
  fetchCategories(): Promise<string[]>;
}
