import type { UserData } from '../types/signIn';

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
