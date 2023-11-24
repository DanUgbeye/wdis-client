import { AxiosRequestConfig } from "axios";

export type ApiSuccessResponse<T = any> = {
  status: number;
  message: string;
  result: T;
  data?: boolean;
};

export type ApiErrorResponse<T = any> = {
  status: number;
  message: string;
  result: T | null;
  data?: boolean;
};

export interface RequestOptions extends AxiosRequestConfig<any> {}

export type PaginatedData<T = any> = {
  data: T[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

export type FileUploadProgress = {
  percentage: number;
  totalSize: number;
  uploaded: number;
};
