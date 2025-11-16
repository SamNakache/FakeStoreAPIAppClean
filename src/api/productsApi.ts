import {Product} from '../features/products/productsSlice';

const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  const data = await response.json();
  return data as Product[];
}