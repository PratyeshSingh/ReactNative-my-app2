import { ProductApiClient } from '../data/api/ProductApi';
import { ProductRepositoryImpl } from '../data/repositories/ProductRepositoryImpl';
import { GetProductDetail } from '../domain/usecases/GetProductDetail';
import { GetProducts } from '../domain/usecases/GetProducts';
import { SearchProducts } from '../domain/usecases/SearchProducts';

const productApi = new ProductApiClient();
const productRepository = new ProductRepositoryImpl(productApi);

export const productContainer = {
  getProducts: new GetProducts(productRepository),
  searchProducts: new SearchProducts(productRepository),
  getProductDetail: new GetProductDetail(productRepository),
};
