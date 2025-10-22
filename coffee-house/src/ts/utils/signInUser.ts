import type { SignInFormData, SignInResponse } from '../../types/signIn.js';
import { BASE_URL } from '../config/config.js';

export const signInUser = async (formData: SignInFormData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const responseData: SignInResponse = await res.json();

    if (!res.ok) {
      const backendError =
        responseData?.error ||
        responseData?.message ||
        'Incorrect login or password.';
      throw new Error(backendError);
    }

    return responseData;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(message);
  }
};
