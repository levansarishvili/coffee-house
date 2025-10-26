import type {
  RegistrationFormData,
  RegistrationResponse,
} from '../../types/register.js';
import { BASE_URL } from '../config/config.js';

export const registerUser = async (formData: RegistrationFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData: RegistrationResponse = await res.json();

    if (!res.ok) {
      const backendError =
        responseData?.error ||
        responseData?.message ||
        'Registration failed. Please, try again.';
      throw new Error(backendError);
    }

    return responseData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message);
  }
};
