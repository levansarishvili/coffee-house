import { AuthEvent } from '../types/enums';
import type { UserData } from '../types/signIn';
import { clearCart } from './cartStore';

let user: UserData | null = null;

const savedUser = localStorage.getItem('user');
if (savedUser) {
  user = JSON.parse(savedUser);
}

// --- Core functions ---
export function getUser(): UserData | null {
  return user;
}

export function isLoggedIn(): boolean {
  return !!user;
}

// --- Auth state management ---
export function signIn(newUser: UserData) {
  user = newUser;
  localStorage.setItem('user', JSON.stringify(user));
  notifyAuthUpdate();
}

export function logout() {
  // Clear cart
  clearCart();
  user = null;
  localStorage.removeItem('user');
  notifyAuthUpdate();
}

// Notify other parts of the app
export function notifyAuthUpdate() {
  document.dispatchEvent(new CustomEvent(AuthEvent.Updated, { detail: user }));
}
