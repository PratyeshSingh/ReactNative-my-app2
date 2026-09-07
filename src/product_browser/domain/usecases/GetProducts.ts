import { CancellationToken } from '../cancellation/CancellationToken';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class GetProducts {
  constructor(private repository: ProductRepository) {}

  execute(token?: CancellationToken): Promise<Product[]> {
    return this.repository.fetchProducts(token);
  }
}
