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
  private baseUrl = 'https://dummyjson.com';

  private async fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network request failed: ${response.status}`);
    }
    return response.json();
  }

  async fetchProducts(): Promise<ProductListResponse> {
    return this.fetchJson<ProductListResponse>(`${this.baseUrl}/products?limit=100`);
  }

  async fetchProduct(id: string): Promise<ProductDto> {
    return this.fetchJson<ProductDto>(`${this.baseUrl}/products/${encodeURIComponent(id)}`);
  }

  async searchProducts(query: string): Promise<ProductListResponse> {
    return this.fetchJson<ProductListResponse>(`${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`);
  }

  async fetchCategories(): Promise<string[]> {
    return this.fetchJson<string[]>(`${this.baseUrl}/products/categories`);
  }

  async fetchProductsByCategory(category: string): Promise<ProductListResponse> {
    return this.fetchJson<ProductListResponse>(
      `${this.baseUrl}/products/category/${encodeURIComponent(category)}?limit=100`
    );
  }
}
