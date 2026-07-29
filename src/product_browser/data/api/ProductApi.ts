
import { baseUrl, getCall } from '@/src/hooks/fetchJson';

export type ProductDto = {
  id: number;
  title: string;
  description: string;
  brand: string;
  price: number;
  rating: number;
  thumbnail: string;
  images: string[];
  category: string;
};

export type ProductListResponse = {
  products: ProductDto[];
  total: number;
  skip: number;
  limit: number;
};

export class ProductApiClient {

  async fetchProducts(): Promise<ProductListResponse> {
    return getCall<ProductListResponse>(`${baseUrl}/products?limit=100`);
  }

  async fetchProduct(id: string): Promise<ProductDto> {
    return getCall<ProductDto>(`${baseUrl}/products/${encodeURIComponent(id)}`);
  }

  async searchProducts(query: string): Promise<ProductListResponse> {
    return getCall<ProductListResponse>(`${baseUrl}/products/search?q=${encodeURIComponent(query)}`);
  }

  async fetchCategories(): Promise<string[]> {
    return getCall<string[]>(`${baseUrl}/products/categories`);
  }

  async fetchProductsByCategory(category: string): Promise<ProductListResponse> {
    return getCall<ProductListResponse>(
      `${baseUrl}/products/category/${encodeURIComponent(category)}?limit=100`
    );
  }
}
