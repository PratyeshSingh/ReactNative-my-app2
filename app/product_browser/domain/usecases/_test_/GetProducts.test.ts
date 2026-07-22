import { Product } from '../../entities/Product';
import { GetProducts } from '../GetProducts';

describe('GetProducts use case', () => {
  it('returns product list from repository', async () => {
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

    const repository = {
      fetchProducts: jest.fn(async () => products),
      fetchProductById: jest.fn(),
      searchProducts: jest.fn(),
      fetchCategories: jest.fn(),
    };

    const getProducts = new GetProducts(repository as any);
    const result = await getProducts.execute();

    expect(result).toEqual(products);
    expect(repository.fetchProducts).toHaveBeenCalled();
  });
});
