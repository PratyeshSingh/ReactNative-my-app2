import { CancellationToken } from '../cancellation/CancellationToken';
import { Product } from '../entities/Product';

export interface ProductRepository {
  fetchProducts(token?: CancellationToken): Promise<Product[]>;
  fetchProductById(id: string, token?: CancellationToken): Promise<Product>;
  searchProducts(query: string, token?: CancellationToken): Promise<Product[]>;
  fetchCategories(token?: CancellationToken): Promise<string[]>;
}
