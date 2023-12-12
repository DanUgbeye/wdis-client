"use client";
import { USER_ROLES } from "@/modules/user/user.type";
import { Container } from "@/presentation/_shared/components/Container";
import ErrorCard from "@/presentation/_shared/components/ErrorCard";
import Mapper from "@/presentation/_shared/components/Mapper";
import Spinner from "@/presentation/_shared/components/Spinner";
import BinCard from "@/presentation/features/bin/components/BinCard";
import useBins from "@/presentation/features/bin/hooks/useBins.hook";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import Link from "next/link";
import React from "react";

function AllBinsPage() {
  const { user } = useUser();
  const { binLoading, bins, error, loadBin } = useBins();

  return (
    user && (
      <Container>
        <section className=" mb-20 text-white">
          <div className=" flex w-full items-center px-12 py-6 ">
            <h2 className=" w-full py-4 text-3xl font-bold ">ALL BINS</h2>

            {user.role === USER_ROLES.DISPOSER && (
              <Link
                className=" grid h-12 w-fit min-w-fit place-items-center rounded-md bg-blue-600 px-3 transition-all duration-300 hover:bg-blue-800 "
                href={"/bins/create"}
              >
                ADD NEW BIN
              </Link>
            )}
          </div>

          {binLoading && (
            <div className=" grid w-full place-items-center py-12 ">
              <Spinner />
            </div>
          )}

          {!binLoading && !bins && error && <ErrorCard error={error} />}

          {!binLoading && bins && bins.length > 0 && (
            <div className=" grid grid-cols-[repeat(auto-fill,minmax(23rem,1fr))] gap-8 pb-20 ">
              <Mapper
                list={bins}
                id={"all-bins"}
                component={({ item: bin, index }) => (
                  <BinCard bin={bin} onStatusChange={loadBin} />
                )}
              />
            </div>
          )}
        </section>
      </Container>
    )
  );
}
export default WithOnProtectedRoute(
  WithPrimaryLayout(AllBinsPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
