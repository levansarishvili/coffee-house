import type { OrderConfirmResponse, OrdersData } from '../../types/cart.js';
import { BASE_URL } from '../config/config.js';

export const confirmOrder = async (ordersData: OrdersData) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ordersData),
    });

    if (!res.ok) {
      throw new Error('Something went wrong. Please, try again');
    }

    const responseData: OrderConfirmResponse = await res.json();

    return responseData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message);
  }
};
