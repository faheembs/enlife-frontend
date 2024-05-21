export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  message: string;
  accessToken?: string;
}

export interface SocialUser {
  displayName: string;
  email: string;
  accessToken?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  accessToken?: string;
}

export interface SocialCredentials {
  firstName: string;
  lastName: string;
  email: string;
  accessToken?: string;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accessToken?: string;
}

export interface ApiError {
  message: string;
}
