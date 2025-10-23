export interface SignInFormData {
  login: string;
  password: string;
}

export type SignInResponse = {
  data: {
    access_token: string;
    user: {
      id: number;
      login: string;
      city: string;
      street: string;
      houseNumber: number;
      paymentMethod: string;
      createdAt: string;
    };
  };
  message: string;
  error?: string;
};
export type UserData = {
  access_token: string;
  user: {
    id: number;
    login: string;
    city: string;
    street: string;
    houseNumber: number;
    paymentMethod: string;
    createdAt: string;
  };
};
