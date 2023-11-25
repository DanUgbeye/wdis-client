export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  DISPOSER: "disposer",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];

export interface UserServerData {
  email: string;
  fullname: string;
  password?: string;
  googleId?: string;
  sex: string;
  phoneNumber?: string;
  profileImage?: string;
  disabled: boolean;
  verified: boolean;
  setupComplete: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface AuthServerData {
  role: UserRole;
  token: string;
  expiresIn: number;
}
