
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

  async fetchProducts(
    signal?: AbortSignal | undefined
  ): Promise<ProductListResponse> {
    return getCall<ProductListResponse>(`${baseUrl}/products?limit=100`, undefined, signal);
  }

  async fetchProduct(id: string, signal?: AbortSignal | undefined): Promise<ProductDto> {
    return getCall<ProductDto>(`${baseUrl}/products/${encodeURIComponent(id)}`, undefined, signal);
  }

  async searchProducts(query: string, signal?: AbortSignal | undefined): Promise<ProductListResponse> {
    return getCall<ProductListResponse>(`${baseUrl}/products/search?q=${encodeURIComponent(query)}`, undefined, signal);
  }

  async fetchCategories(signal?: AbortSignal | undefined): Promise<string[]> {
    return getCall<string[]>(`${baseUrl}/products/categories`, undefined, signal);
  }

  async fetchProductsByCategory(category: string, signal?: AbortSignal | undefined): Promise<ProductListResponse> {
    return getCall<ProductListResponse>(
      `${baseUrl}/products/category/${encodeURIComponent(category)}?limit=100`,
      undefined,
      signal
    );
  }
}
