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

  async fetchProducts(): Promise<Product[]> {
    const response = await this.api.fetchProducts();
    return response.products.map((dto) => this.mapDtoToProduct(dto));
  }

  async fetchProductById(id: string): Promise<Product> {
    const dto = await this.api.fetchProduct(id);
    return this.mapDtoToProduct(dto);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await this.api.searchProducts(query);
    return response.products.map((dto) => this.mapDtoToProduct(dto));
  }

  async fetchCategories(): Promise<string[]> {
    return this.api.fetchCategories();
  }
}
