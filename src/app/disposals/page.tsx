"use client";
import apiService from "@/modules/api/api";
import { DisposalAPIService } from "@/modules/disposal/api/disposal.api";
import { DisposalData } from "@/modules/disposal/disposal.types";
import { Container } from "@/presentation/_shared/components/Container";
import ErrorCard from "@/presentation/_shared/components/ErrorCard";
import Spinner from "@/presentation/_shared/components/Spinner";
import DisposalTable from "@/presentation/features/disposal/components/DisposalTable";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

function AllDisposalsPage() {
  const disposalService = new DisposalAPIService(apiService);
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const QUERY_KEY = `ALL_DISPOSALS`;

  const [binDeleteLoading, setBinDeleteLoading] = React.useState(false);

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
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
  }

  const {
    isLoading: disposalsLoading,
    data,
    error,
  } = useQuery<DisposalData[], Error>({
    enabled: user !== null,
    queryKey: [QUERY_KEY, user],
    queryFn: () => disposalService.getAllDisposals(),
  });

  return (
    <Container>
      <section className=" mb-20 text-white">
        <div className=" mb-6 flex w-full items-center px-12 py-6 ">
          <h2 className=" w-full py-4 text-3xl font-bold ">ALL DISPOSALS </h2>
        </div>

        {disposalsLoading && (
          <div className=" grid w-full place-items-center py-12 ">
            <Spinner className=" h-8 w-8 text-white " />
          </div>
        )}

        {!disposalsLoading && error && <ErrorCard error={error} />}

        {!disposalsLoading && data && (
          <DisposalTable disposals={data} onDelete={handleDeleteDisposal} />
        )}
      </section>
    </Container>
  );
}

export default WithOnProtectedRoute(
  WithPrimaryLayout(AllDisposalsPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
