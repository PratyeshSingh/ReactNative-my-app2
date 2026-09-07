import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class GetProducts {
  constructor(private repository: ProductRepository) {}

  execute(signal?: AbortSignal | undefined): Promise<Product[]> {
    return this.repository.fetchProducts(signal);
  }
}
