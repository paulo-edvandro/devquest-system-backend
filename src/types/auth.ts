export interface RegisterDto {
  email: string;
  displayName: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    displayName: string;
    xp: number;
    level: number;
  };
  token: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}