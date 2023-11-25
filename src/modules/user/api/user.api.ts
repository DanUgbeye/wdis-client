"use client";
import { ApiService, ApiSuccessResponse, RequestOptions } from "@/modules/api";
import { USER_ROLES, UserRole, UserServerData } from "../user.type";
import { UserSignupData, UserLoginData } from ".";

export class UserAPIService {
  constructor(private service: ApiService) {}

  async login(type: UserRole, data: UserLoginData, options?: RequestOptions) {
    try {
      const path =
        type === USER_ROLES.USER ? "/auth/login" : "/auth/disposer/login";

      const res = await this.service.axios.post<
        ApiSuccessResponse<{
          user: UserServerData;
          auth: { token: string; expiresIn: number };
        }>
      >(path, data, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async signup(data: UserSignupData, options?: RequestOptions) {
    try {
      const path = "/auth/signup";

      const res = await this.service.axios.post<
        ApiSuccessResponse<{
          user: UserServerData;
          auth: { token: string; expiresIn: number };
        }>
      >(path, data, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async getProfile(options?: RequestOptions) {
    try {
      const path = "/user/profile";

      const res = await this.service.axios.get<
        ApiSuccessResponse<UserServerData>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
