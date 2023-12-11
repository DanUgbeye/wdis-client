import apiService from "@/modules/api/api";
import { AppAPIService, AppStats } from "@/modules/app/api";
import ErrorCard from "@/presentation/_shared/components/ErrorCard";
import Mapper from "@/presentation/_shared/components/Mapper";
import Spinner from "@/presentation/_shared/components/Spinner";
import StatsCard from "@/presentation/_shared/components/StatsCard";
import BinCard from "@/presentation/features/bin/components/BinCard";
import useBins from "@/presentation/features/bin/hooks/useBins.hook";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function DisposerDasboard() {
  const { user } = useUser();
  const { binLoading, bins, error, loadBin } = useBins();
  const appService = new AppAPIService(apiService);
  const QUERY_KEY = `APP_STATS`;

  const {
    isLoading: statsLoading,
    data: stats,
    error: statsError,
  } = useQuery<AppStats, Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => appService.getStats(),
    refetchInterval: 2000,
  });

  return (
    <div className=" w-full ">
      <div className=" w-full ">
        {statsLoading && (
          <div className=" grid w-full place-items-center ">
            <Spinner className=" h-10 w-10 text-white " />{" "}
          </div>
        )}

        {!statsLoading && statsError && <ErrorCard error={statsError} />}

        {!statsLoading && stats && (
          <div className=" grid w-full grid-cols-2 justify-between gap-y-8 py-12 md:grid-cols-4 ">
            <StatsCard name="Bins" figure={stats.numBins} />
            <StatsCard name="Disposals" figure={stats.disposal.total} />
            <StatsCard name="Completed" figure={stats.disposal.completed} />
            <StatsCard name="Ongoing" figure={stats.disposal.ongoing} />
          </div>
        )}
      </div>

      <div className=" my-12 ">
        <div className=" mb-8 text-3xl font-bold ">BINS</div>

        {binLoading && (
          <div className=" grid w-full place-items-center ">
            <Spinner className=" h-10 w-10 text-white " />{" "}
          </div>
        )}

        {!binLoading && error && <ErrorCard error={error} />}

        {!binLoading && bins && (
          <div className=" grid grid-cols-[repeat(auto-fill,minmax(23rem,1fr))] gap-8 ">
            <Mapper
              id="all-bins"
              list={bins}
              component={({ item }) => (
                <BinCard bin={item} onStatusChange={loadBin} />
              )}
            />
          </div>
        )}
      </div>
    </div>
  );
}
