export type UserType = 'admin' | 'member';

export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: UserType;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}