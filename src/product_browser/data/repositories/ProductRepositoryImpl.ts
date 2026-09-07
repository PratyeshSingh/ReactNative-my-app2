import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { ProductApiClient } from '../api/ProductApi';

export class ProductRepositoryImpl implements ProductRepository {
  constructor(private api: ProductApiClient) {}

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
    signal?: AbortSignal | undefined
  ): Promise<Product[]> {
    const response = await this.api.fetchProducts(signal);
    return response.products.map((dto) => this.mapDtoToProduct(dto));
  }

  async fetchProductById(id: string,
    signal?: AbortSignal | undefined
  ): Promise<Product> {
    const dto = await this.api.fetchProduct(id, signal);
    return this.mapDtoToProduct(dto);
  }

  async searchProducts(query: string,
    signal?: AbortSignal | undefined
  ): Promise<Product[]> {
    const response = await this.api.searchProducts(query, signal);
    return response.products.map((dto) => this.mapDtoToProduct(dto));
  }

  async fetchCategories(
    signal?: AbortSignal | undefined
  ): Promise<string[]> {
    return this.api.fetchCategories(signal);
  }
}
