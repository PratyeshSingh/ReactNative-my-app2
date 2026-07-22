import { describe, it, expect, jest } from '@jest/globals';
import { Product } from '../../entities/Product';
import { GetProductDetail } from '../GetProductDetail';

describe('GetProductDetail use case', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test product',
    description: 'A product used for test',
    brand: 'TestBrand',
    price: 10,
    rating: 4.7,
    thumbnail: 'https://example.com/test.png',
    images: ['https://example.com/test.png'],
    category: 'electronics',
  };

  it('should return product details for a valid ID', async () => {
    const repository = {
      fetchProductById: jest.fn(async (id: string) => mockProduct),
    };

    const getProductDetail = new GetProductDetail(repository as any);
    const result = await getProductDetail.execute('1');

    expect(result).toEqual(mockProduct);
    expect(repository.fetchProductById).toHaveBeenCalledWith('1');
    expect(repository.fetchProductById).toHaveBeenCalledTimes(1);
  });

  it('should propagate an error when the product is not found', async () => {
    const repository = {
      fetchProductById: jest.fn(async (id: string) => {
        throw new Error(`Product with ID ${id} not found`);
      }),
    };

    const getProductDetail = new GetProductDetail(repository as any);

    await expect(getProductDetail.execute('999')).rejects.toThrow('Product with ID 999 not found');
    expect(repository.fetchProductById).toHaveBeenCalledWith('999');
  });

  it('should propagate generic repository errors', async () => {
    const repository = {
      fetchProductById: jest.fn(async () => {
        throw new Error('Network Error');
      }),
    };

    const getProductDetail = new GetProductDetail(repository as any);

    await expect(getProductDetail.execute('1')).rejects.toThrow('Network Error');
  });
});
