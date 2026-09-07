import { CancellationToken } from '../cancellation/CancellationToken';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class SearchProducts {
  constructor(private repository: ProductRepository) { }

  execute(query: string, token?: CancellationToken): Promise<Product[]> {
    return this.repository.searchProducts(query, token);
  }
}
