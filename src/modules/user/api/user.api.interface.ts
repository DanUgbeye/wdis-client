import { UserLoginData, UserSignupData } from ".";
import { UserServerData } from "../user.type";

export interface IUserAPIService {
  signup(data: UserSignupData): Promise<UserServerData>;
  login(data: UserLoginData): Promise<UserServerData>;
  getProfile(): Promise<UserServerData>;
  updateProfile(data: Partial<UserServerData>): Promise<UserServerData>;
  deleteProfile(): Promise<boolean>;
}
