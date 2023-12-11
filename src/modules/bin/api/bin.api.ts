"use client";
import { ApiService, ApiSuccessResponse, RequestOptions } from "@/modules/api";
import { BinData, NewBin } from "../bin.types";
import { DisposalData } from "@/modules/disposal/disposal.types";

export class BinAPIService {
  constructor(private service: ApiService) {}

  async getBin(binId: string, options?: RequestOptions) {
    try {
      const path = `/bin/${binId}`;

      const res = await this.service.axios.get<ApiSuccessResponse<BinData>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

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

  async getAllDisposalsForBin(binId: string, options?: RequestOptions) {
    try {
      const path = `/bin/${binId}/disposal`;

      const res = await this.service.axios.get<
        ApiSuccessResponse<DisposalData[]>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async createBin(data: NewBin, options?: RequestOptions) {
    try {
      const path = "/bin";

      const res = await this.service.axios.post<ApiSuccessResponse<BinData>>(
        path,
        data,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async editBin(binId: string, data: NewBin, options?: RequestOptions) {
    try {
      const path = `/bin/${binId}`;

      const res = await this.service.axios.patch<ApiSuccessResponse<BinData>>(
        path,
        data,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async markBinAsEmpty(binId: string, options?: RequestOptions) {
    try {
      const path = `/bin/${binId}/status/empty`;

      const res = await this.service.axios.patch<ApiSuccessResponse<BinData>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async markBinAsInDisposal(binId: string, options?: RequestOptions) {
    try {
      const path = `/bin/${binId}/status/ongoing`;

      const res = await this.service.axios.patch<ApiSuccessResponse<BinData>>(
        path,
        options
      );

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }

  async deleteBin(binId: string, options?: RequestOptions) {
    try {
      const path = `/bin/${binId}`;

      const res = await this.service.axios.delete<
        ApiSuccessResponse<undefined>
      >(path, options);

      return res.data.data;
    } catch (err: any) {
      throw this.service.handleError(err);
    }
  }
}
