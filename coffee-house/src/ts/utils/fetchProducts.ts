import { BASE_URL } from '../config/config.js';
import type { Product, ProductsResponse } from '../../types/product.js';

export const fetchProducts = async (favorites = false): Promise<Product[]> => {
  try {
    const res = await fetch(
      `${BASE_URL}/products${favorites ? '/favorites' : ''}`
    );

    if (!res.ok) {
      throw new Error('Something went wrong. Please, refresh the page');
    }

    const responseData: ProductsResponse = await res.json();

    return responseData.data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Something went wrong. Please, refresh the page:', message);
    throw new Error(message);
  }
};
