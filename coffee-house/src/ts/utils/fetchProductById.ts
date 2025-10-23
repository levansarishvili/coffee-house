import { BASE_URL } from '../config/config.js';
import type {
  ProductDetails,
  ProductDetailsResponse,
} from '../../types/product.js';

export const fetchProductById = async (
  id: string | undefined
): Promise<ProductDetails> => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);

    if (!res.ok) {
      throw new Error('Something went wrong. Please, refresh the page');
    }

    const responseData: ProductDetailsResponse = await res.json();

    return responseData.data;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Something went wrong. Please, refresh the page:', message);
    throw new Error(message);
  }
};
