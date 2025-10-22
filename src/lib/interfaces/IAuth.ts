export interface ApiResponse {
  success: boolean;
  message: string;
  data?: object;
  route?: string;
  errors?: string[];
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
  };
  route?: string;
  errors?: string[];
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  repeatedPassword: string;
  phone?: string;
}
