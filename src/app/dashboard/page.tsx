"use client";
import { USER_ROLES } from "@/modules/user/user.type";
import { Container } from "@/presentation/_shared/components/Container";
import Mapper from "@/presentation/_shared/components/Mapper";
import Spinner from "@/presentation/_shared/components/Spinner";
import StatsCard from "@/presentation/_shared/components/StatsCard";
import BinCard from "@/presentation/features/bin/components/BinCard";
import useBins from "@/presentation/features/bin/hooks/useBins.hook";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route";
import React from "react";

function DashboardPage() {
  const { user } = useUser();
  const { binLoading, bins } = useBins();

  return user ? (
    <main className="h-full min-h-full text-white ">
      <Container>
        {user.role === USER_ROLES.DISPOSER && (
          <>
            {binLoading && (
              <div className=" grid w-full place-items-center ">
                <Spinner className=" h-10 w-10 text-white " />{" "}
              </div>
            )}

            {!binLoading && (
              <div className=" w-full ">
                <div className=" grid w-full grid-cols-2 gap-y-8 md:grid-cols-4 justify-between py-12 ">
                  <StatsCard name="Bins" figure={4} />
                  <StatsCard name="Disposals" figure={14} />
                  <StatsCard name="Completed" figure={10} />
                  <StatsCard name="Ongoing" figure={4} />
                </div>

                <div className=" my-12 ">
                  <div className=" text-3xl mb-8 ">BINS</div>

                  <div className=" grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-8 ">
                    <Mapper
                      id="all-bins"
                      list={bins}
                      component={({ item }) => <BinCard bin={item} />}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {user.role === USER_ROLES.USER && <></>}
      </Container>
    </main>
  ) : null;
}

export default WithOnProtectedRoute(
  WithPrimaryLayout(DashboardPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
