"use client";
import React, { PropsWithChildren } from "react";
import { BinData } from "@/modules/bin/bin.types";
import { useQuery } from "@tanstack/react-query";
import { BinAPIService } from "@/modules/bin/api";
import apiService from "@/modules/api/api";
import useAuth from "../../user/hooks/useAuth.hook";

export interface BinContextProps {
  binLoading: boolean;
  bins: BinData[];
  error: Error | null;
  loadBin: () => void;
}

export const BinContext = React.createContext<BinContextProps>({
  binLoading: false,
  bins: [],
  error: null,
  loadBin: () => {},
});

export interface BinContextProviderProps extends PropsWithChildren {}

export function BinContextProvider(props: BinContextProviderProps) {
  const { auth, loading: authLoading } = useAuth();
  const [bins, setBins] = React.useState<BinData[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [binLoading, setLoading] = React.useState(true);

  const binService = new BinAPIService(apiService);

  const {
    isLoading,
    data,
    error: binsError,
    refetch,
  } = useQuery<BinData[], Error>({
    enabled: auth !== null && !authLoading,
    queryKey: ["ALL_BINS", auth],
    queryFn: () => binService.getAllBins(),
    refetchInterval: 3000,
  });

  /** fetch bin data from API */
  const loadBin = React.useCallback(async () => {
    if (!authLoading && !auth) {
      return;
    }

    setLoading(true);

    const { data, error } = await refetch();
    if (data) {
      setBins(data);
      setError(null);
    } else if (error) {
      setError(error);
    }

    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading]);

  /* handle loading state change */
  React.useEffect(() => {
    setLoading(isLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  /* handle bin state change */
  React.useEffect(() => {
    if (data) {
      setBins(data);
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* handle bin state change */
  React.useEffect(() => {
    if (binsError) {
      setError(binsError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [binsError]);

  /* delete any saved bin info once auth details is not available */
  React.useEffect(() => {
    if (!auth && !authLoading) {
      setBins([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading]);

  return (
    <BinContext.Provider
      value={{
        binLoading,
        bins,
        error,
        loadBin,
      }}
    >
      {props.children}
    </BinContext.Provider>
  );
}
