export interface User {
  id: string;
  username: string;
  email: string;
  token: string;
  message: string;
  role: string;
}
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
export interface LoginCredentials {
  username: string;
  password: string;
}
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  phone_number: string;
}
export interface ApiErrors {
  message: string;
}
