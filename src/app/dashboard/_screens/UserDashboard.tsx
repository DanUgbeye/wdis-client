"use client";
import ErrorCard from "@/presentation/_shared/components/ErrorCard";
import Mapper from "@/presentation/_shared/components/Mapper";
import Spinner from "@/presentation/_shared/components/Spinner";
import BinCard from "@/presentation/features/bin/components/BinCard";
import useBins from "@/presentation/features/bin/hooks/useBins.hook";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import React from "react";

export default function UserDashboard() {
  const { binLoading, bins, error, loadBin } = useBins();
  const { user } = useUser();

  return user ? (
    <div className="  ">
      <div className="  ">
        <div className=" mb-3 text-3xl font-bold ">WELCOME {user.fullname}</div>
        <div className=" text-2xl ">Kindly report any full bin around you</div>
      </div>

      <div className=" my-12 ">
        <div className=" mb-8 text-3xl font-bold ">BINS</div>

        {binLoading && (
          <div className=" grid w-full place-items-center ">
            <Spinner className=" h-10 w-10 text-white " />{" "}
          </div>
        )}

        {!binLoading && !bins && error && <ErrorCard error={error} />}

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
  ) : null;
}
