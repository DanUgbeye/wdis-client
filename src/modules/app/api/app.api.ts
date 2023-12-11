"use client";
import { ApiService, ApiSuccessResponse, RequestOptions } from "@/modules/api";
import { AppStats } from "../app.types";

export class AppAPIService {
  constructor(private service: ApiService) {}

  async getStats(options?: RequestOptions) {
    try {
      const path = "/app/stats";

      const res = await this.service.axios.get<ApiSuccessResponse<AppStats>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
