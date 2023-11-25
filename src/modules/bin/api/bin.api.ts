"use client";
import { ApiService, ApiSuccessResponse, RequestOptions } from "@/modules/api";
import { BinData } from "../bin.types";

export class BinAPIService {
  constructor(private service: ApiService) {}

  async getAllBins(options?: RequestOptions) {
    try {
      const path = "/bin";

      const res = await this.service.axios.get<ApiSuccessResponse<BinData[]>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
