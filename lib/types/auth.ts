export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string | null;
  role: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}