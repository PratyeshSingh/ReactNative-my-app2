import { describe, it, expect, jest } from '@jest/globals';
import { Product } from '../../entities/Product';
import { GetProducts } from '../GetProducts';

describe('GetProducts use case', () => {
  const products: Product[] = [
    {
      id: 1,
      title: 'Test product',
      description: 'A product used for test',
      brand: 'TestBrand',
      price: 10,
      rating: 4.7,
      thumbnail: 'https://example.com/test.png',
      images: ['https://example.com/test.png'],
      category: 'electronics',
    },
  ];

  it('should return a list of products when repository succeeds', async () => {
    const repository = {
      fetchProducts: jest.fn(async () => products),
    };

    const getProducts = new GetProducts(repository as any);
    const result = await getProducts.execute();

    expect(result).toEqual(products);
    expect(result.length).toBe(1);
    expect(repository.fetchProducts).toHaveBeenCalledTimes(1);
  });

  it('should return an empty list when repository returns no products', async () => {
    const repository = {
      fetchProducts: jest.fn(async () => []),
    };

    const getProducts = new GetProducts(repository as any);
    const result = await getProducts.execute();

    expect(result).toEqual([]);
    expect(result.length).toBe(0);
    expect(repository.fetchProducts).toHaveBeenCalledTimes(1);
  });

  it('should propagate errors from the repository', async () => {
    const errorMessage = 'Repository failure';
    const repository = {
      fetchProducts: jest.fn(async () => {
        throw new Error(errorMessage);
      }),
    };

    const getProducts = new GetProducts(repository as any);

    await expect(getProducts.execute()).rejects.toThrow(errorMessage);
  });
});
