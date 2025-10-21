// Login validation
export function validateLogin(login: string): string | null {
  if (!login.trim()) return 'Login is required.';

  if (!/^[A-Za-z]+$/.test(login)) return 'Only English letters are allowed.';
  if (login.length < 3) return 'Login must be at least 3 characters long.';

  return null;
}

// Password validation
export function validatePassword(password: string): string | null {
  if (!password.trim()) return 'Password is required.';
  if (password.length < 6)
    return 'Password must be at least 6 characters long.';
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
    return 'Password must contain at least one special character.';
  return null;
}

// Confirm password validation
export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): string | null {
  if (!confirmPassword.trim()) return 'Please confirm your password.';
  if (password !== confirmPassword) return 'Passwords do not match.';
  return null;
}

// House number validation
export function validateHouseNumber(value: string): string | null {
  if (!value.trim()) return 'House number is required.';
  const number = Number(value);
  if (isNaN(number)) return 'House number must be a number.';
  if (number <= 1) return 'House number must be greater than 1.';
  return null;
}
