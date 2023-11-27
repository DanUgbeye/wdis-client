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
  loadBin: () => void;
}

export const BinContext = React.createContext<BinContextProps>({
  binLoading: false,
  bins: [],
  loadBin: () => {},
});

export interface BinContextProviderProps extends PropsWithChildren {}

export function BinContextProvider(props: BinContextProviderProps) {
  const { auth, loading: authLoading } = useAuth();
  const [bins, setBins] = React.useState<BinData[]>([]);
  const [binLoading, setLoading] = React.useState(true);

  const binApi = new BinAPIService(apiService);

  const { isLoading, data, error, refetch } = useQuery<BinData[], Error>({
    enabled: auth !== null && !authLoading,
    queryKey: ["GET_ALL_BINS", auth],
    queryFn: () => binApi.getAllBins(),
    refetchInterval: 60 * 1000,
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  /* delete any saved bin info once auth details is not available */
  React.useEffect(() => {
    if (!auth && !authLoading && bins.length > 0) {
      setBins([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading, bins]);

  return (
    <BinContext.Provider
      value={{
        binLoading,
        bins,
        loadBin,
      }}
    >
      {props.children}
    </BinContext.Provider>
  );
}
