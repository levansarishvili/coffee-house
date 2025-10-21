export type RegistrationResponse = {
  data: {
    access_token: string;
    user: {
      login: string;
      city: string;
      street: string;
      houseNumber: number;
      paymentMethod: string;
      id: number;
      createdAt: string;
    };
  };
  message: string;
  error?: string;
};

export interface RegistrationFormData {
  login: string;
  password: string;
  confirmPassword: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
}
