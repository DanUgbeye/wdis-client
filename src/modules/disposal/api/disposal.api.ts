"use client";
import { ApiService, ApiSuccessResponse, RequestOptions } from "@/modules/api";
import { DisposalData } from "../disposal.types";

export class DisposalAPIService {
  constructor(private service: ApiService) {}

  async getAllDisposals(options?: RequestOptions) {
    try {
      const path = `/disposal`;

      const res = await this.service.axios.get<
        ApiSuccessResponse<DisposalData[]>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async deleteDisposal(disposalId: string, options?: RequestOptions) {
    try {
      const path = `/disposal/${disposalId}`;

      const res = await this.service.axios.delete<
        ApiSuccessResponse<undefined>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
