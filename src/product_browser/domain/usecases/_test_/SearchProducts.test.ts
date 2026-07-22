import { describe, it, expect, jest } from '@jest/globals';
import { Product } from '../../entities/Product';
import { SearchProducts } from '../SearchProducts';

describe('SearchProducts use case', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      brand: 'Apple',
      price: 549,
      rating: 4.69,
      thumbnail: 'https://example.com/thumbnail.jpg',
      images: [],
      category: 'smartphones',
    },
  ];

  it('should return products that match the search query', async () => {
    const repository = {
      searchProducts: jest.fn(async (query: string) => mockProducts),
    };

    const searchProducts = new SearchProducts(repository as any);
    const result = await searchProducts.execute('iphone');

    expect(result).toEqual(mockProducts);
    expect(repository.searchProducts).toHaveBeenCalledWith('iphone');
    expect(repository.searchProducts).toHaveBeenCalledTimes(1);
  });

  it('should return an empty array if no products match the query', async () => {
    const repository = {
      searchProducts: jest.fn(async (query: string) => []),
    };

    const searchProducts = new SearchProducts(repository as any);
    const result = await searchProducts.execute('unknown-item');

    expect(result).toEqual([]);
    expect(repository.searchProducts).toHaveBeenCalledWith('unknown-item');
  });

  it('should handle empty search queries by calling the repository', async () => {
    const repository = {
      searchProducts: jest.fn(async (query: string) => []),
    };

    const searchProducts = new SearchProducts(repository as any);
    await searchProducts.execute('');

    expect(repository.searchProducts).toHaveBeenCalledWith('');
  });

  it('should propagate errors from the repository during search', async () => {
    const repository = {
      searchProducts: jest.fn(async () => {
        throw new Error('API Error');
      }),
    };

    const searchProducts = new SearchProducts(repository as any);

    await expect(searchProducts.execute('test')).rejects.toThrow('API Error');
  });
});
