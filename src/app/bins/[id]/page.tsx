"use client";
import apiService from "@/modules/api/api";
import { BinAPIService } from "@/modules/bin/api";
import { BinData } from "@/modules/bin/bin.types";
import { DisposalAPIService } from "@/modules/disposal/api/disposal.api";
import {
  DISPOSAL_STATUS,
  DisposalData,
} from "@/modules/disposal/disposal.types";
import { USER_ROLES } from "@/modules/user/user.type";
import Button from "@/presentation/_shared/components/Button";
import { Container } from "@/presentation/_shared/components/Container";
import ErrorCard from "@/presentation/_shared/components/ErrorCard";
import Spinner from "@/presentation/_shared/components/Spinner";
import StatsCard from "@/presentation/_shared/components/StatsCard";
import DisposalTable from "@/presentation/features/disposal/components/DisposalTable";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function BinDetailsPage() {
  const binService = new BinAPIService(apiService);
  const disposalService = new DisposalAPIService(apiService);
  const { user } = useUser();
  const params = useParams();
  const binId = params.id as string;
  const router = useRouter();
  const queryClient = useQueryClient();
  const QUERY_KEY = `BIN_${binId}`;
  const QUERY_KEY_2 = `BIN_${binId}-disposals`;

  const [binDeleteLoading, setBinDeleteLoading] = React.useState(false);

  async function handleDeleteBin(bin: BinData) {
    setBinDeleteLoading(true);

    try {
      await binService.deleteBin(bin._id);
    } catch (error: any) {
      setBinDeleteLoading(false);
      toast.error(error.message, {
        toastId: `delete-bin-${bin._id}`,
      });
      return;
    }

    setBinDeleteLoading(false);
    toast.success("bin deleted", { toastId: `delete-bin-${bin._id}` });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  async function handleDeleteDisposal(disposal: DisposalData) {
    try {
      await disposalService.deleteDisposal(disposal._id);
    } catch (error: any) {
      setBinDeleteLoading(false);
      toast.error(error.message, {
        toastId: `delete-disposal-${disposal._id}`,
      });
      return;
    }

    toast.success("disposal deleted", {
      toastId: `delete-disposal-${disposal._id}`,
    });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY_2] });
  }

  const {
    isLoading: binLoading,
    data,
    error,
  } = useQuery<BinData, Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => binService.getBin(binId),
  });

  const {
    isLoading: binDisposalLoading,
    data: binDisposals,
    error: binDisposalsError,
  } = useQuery<DisposalData[], Error>({
    enabled: user !== null && data !== undefined,
    queryKey: [QUERY_KEY_2, user],
    queryFn: () => binService.getAllDisposalsForBin(binId),
  });

  const binDisposalStats = React.useMemo(() => {
    let stats = {
      disposals: 0,
      ongoing: 0,
      completed: 0,
    };

    if (binDisposals) {
      stats.disposals = binDisposals.length;
      stats.ongoing = binDisposals.filter(
        (bin) => bin.status !== DISPOSAL_STATUS.COMPLETED
      ).length;

      stats.completed = stats.disposals - stats.ongoing;
    }

    return stats;
  }, [binDisposals]);

  return (
    user && (
      <Container>
        <section className=" mb-20 text-white">
          <div className=" mb-6 flex w-full items-center px-12 py-6 ">
            <h2 className=" w-full py-4 text-3xl font-bold ">BINS DETAILS </h2>

            {user.role === USER_ROLES.DISPOSER && data && (
              <Button
                className=" grid h-12 w-fit min-w-fit place-items-center rounded-md bg-red-600 px-3 transition-all duration-300 hover:bg-red-800 "
                type="button"
                loading={binDeleteLoading}
                disabled={binDeleteLoading}
                onClick={(e) => handleDeleteBin(data)}
              >
                DELETE BIN
              </Button>
            )}
          </div>

          {binLoading && (
            <div className=" grid w-full place-items-center py-12 ">
              <Spinner className=" h-8 w-8 text-white " />
            </div>
          )}

          {!binLoading && error && <ErrorCard error={error} />}

          {!binLoading && data && (
            <div className=" flex flex-col gap-y-20 pb-20 ">
              <div className=" flex w-full flex-wrap items-center justify-center gap-x-20 gap-y-14 ">
                <div className=" text-5xl font-medium ">{data.location}</div>

                <div className=" w-full max-w-2xl text-2xl font-medium ">
                  {binDisposalLoading && (
                    <div className=" grid w-full place-items-center py-12 ">
                      <Spinner className=" h-8 w-8 text-white " />
                    </div>
                  )}

                  {!binDisposalLoading && binDisposals && (
                    <div className=" grid w-full grid-cols-3 items-center gap-x-4 ">
                      <StatsCard
                        name="Disposals"
                        figure={binDisposalStats.disposals}
                      />
                      <StatsCard
                        name="Completed"
                        figure={binDisposalStats.completed}
                      />
                      <StatsCard
                        name="Ongoing"
                        figure={binDisposalStats.ongoing}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className=" w-full  ">
                <h3 className=" mb-4 border-b-2 border-white py-4 text-left text-3xl">
                  Disposals
                </h3>

                {binDisposalLoading && (
                  <div className=" grid w-full place-items-center py-12 ">
                    <Spinner className=" h-8 w-8 text-white " />
                  </div>
                )}

                {!binDisposalLoading && binDisposalsError && (
                  <ErrorCard error={binDisposalsError} />
                )}

                {!binDisposalLoading && !binDisposalsError && binDisposals && (
                  <>
                    {binDisposals.length < 1 ? (
                      <div className=" grid h-16 place-items-center text-xl ">
                        No dIsposals for this bin
                      </div>
                    ) : (
                      <div className=" w-full overflow-x-auto ">
                        <DisposalTable
                          disposals={binDisposals}
                          onDelete={handleDeleteDisposal}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </section>
      </Container>
    )
  );
}
export default WithOnProtectedRoute(
  WithPrimaryLayout(BinDetailsPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
