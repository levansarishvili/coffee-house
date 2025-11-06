// Base Product Interface
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discount_price: number | null;
  category: string;
  image_url: string;
  rating: number;
  created_at: string;
}

// Size Option Interface
export interface SizeOption {
  id: number;
  product_id: number;
  size_key: string;
  size_label: string;
  price: number;
  discount_price: number | null;
  created_at: string;
}

// Additive Interface
export interface Additive {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
}

// Product Sizes Interface
export interface ProductSizes {
  s?: SizeOption;
  m?: SizeOption;
  l?: SizeOption;
  xl?: SizeOption;
  xxl?: SizeOption;
}

// Extended Product Details Interface
export interface ProductDetails extends Product {
  product_sizes: SizeOption[];
  product_additives: Additive[];
}

// Login form data
export interface LoginFormData {
  email: string;
  password: string;
}
// Register form data
export interface RegisterFormData {
  avatar: FileList | null;
  full_name: string;
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  city: string;
  street: string;
  house_number: string;
}
// Update user profile
export interface UpdateProfileData {
  avatar: FileList | null;
  full_name: string;
  username: string;
  email: string;
  city: string;
  street: string;
  house_number: string;
}

// Cities
export interface City {
  city: string;
  streets: string[];
}

// User profile type
export type UserProfile = {
  user_id: string;
  created_at: string;
  full_name: string;
  username: string;
  email: string;
  city?: string;
  street?: string;
  house_number?: string;
  avatar_url?: string;
} | null;

// Auth user type
export type AuthUser = {
  id: string;
  email?: string;
  app_metadata?: {
    provider: string;
  };
  user_metadata?: {
    avatar_url?: string;
  };
} | null;

// AuthContextType
export interface AuthContextType {
  user: AuthUser;
  userProfile: UserProfile;
  loading: boolean;
  signOutLoading: boolean;
  error: string | null;
  refreshUser: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

export interface CartItemType {
  id?: number;
  product_id: number;
  price: number;
  name: string;
  discount_price: number;
  size: string;
  additives: string[];
  image_url: string;
  quantity: number;
}
