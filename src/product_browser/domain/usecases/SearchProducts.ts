import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class SearchProducts {
  constructor(private repository: ProductRepository) {}

  execute(query: string): Promise<Product[]> {
    return this.repository.searchProducts(query);
  }
}
