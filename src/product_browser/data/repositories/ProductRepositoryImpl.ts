import { CancellationToken } from '../../domain/cancellation/CancellationToken';
import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductApiClient } from '../api/ProductApi';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private api: ProductApiClient) { }

  private mapDtoToProduct(dto: any): Product {
    return {
      id: dto.id,
      title: dto.title,
      description: dto.description,
      brand: dto.brand,
      price: dto.price,
      rating: dto.rating,
      thumbnail: dto.thumbnail,
      images: dto.images,
      category: dto.category,
    };
  }

  async fetchProducts(
    token?: CancellationToken
  ): Promise<Product[]> {
    const controller = new AbortController();
    // Register cancellation listener & handle cleanup to avoid memory leaks
    const unsubscribe = token?.onCancel(() => controller.abort());
    try {
      const response = await this.api.fetchProducts(controller.signal);
      return response.products.map((dto) => this.mapDtoToProduct(dto));
    } finally {
      unsubscribe?.(); // Unregister listener when request completes
    }
  }

  async fetchProductById(id: string,
    token?: CancellationToken
  ): Promise<Product> {
    const controller = new AbortController();
    const unsubscribe = token?.onCancel(() => controller.abort());
    try {
      const dto = await this.api.fetchProduct(id, controller.signal);
      return this.mapDtoToProduct(dto);
    } finally {
      unsubscribe?.();
    }
  }

  async searchProducts(query: string,
    token?: CancellationToken
  ): Promise<Product[]> {
    const controller = new AbortController();
    const unsubscribe = token?.onCancel(() => controller.abort());
    try {
      const response = await this.api.searchProducts(query, controller.signal);
      return response.products.map((dto) => this.mapDtoToProduct(dto));
    } finally {
      unsubscribe?.();
    }
  }

  async fetchCategories(
    token?: CancellationToken
  ): Promise<string[]> {
    const controller = new AbortController();
    const unsubscribe = token?.onCancel(() => controller.abort());
    try {
      return this.api.fetchCategories(controller.signal);
    } finally {
      unsubscribe?.();
    }
  }
}
