export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends UserProfile {
  token: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}
