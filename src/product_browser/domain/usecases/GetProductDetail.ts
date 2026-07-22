import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/ProductRepository';

export class GetProductDetail {
  constructor(private repository: ProductRepository) {}

  execute(id: string): Promise<Product> {
    return this.repository.fetchProductById(id);
  }
}
