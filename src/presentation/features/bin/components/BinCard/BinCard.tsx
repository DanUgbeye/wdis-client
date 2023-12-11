"use client";
import { BIN_STATUS, BinData } from "@/modules/bin/bin.types";
import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import { USER_ROLES } from "@/modules/user/user.type";
import { twMerge } from "tailwind-merge";
import { BinAPIService } from "@/modules/bin/api";
import apiService from "@/modules/api/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Button from "@/presentation/_shared/components/Button";
import useReport from "@/presentation/features/report/hooks/useReport.hook";

export interface BinCardProps {
  bin: BinData;
  onStatusChange?: (bin: BinData) => void;
}

export default function BinCard(props: BinCardProps) {
  const binService = new BinAPIService(apiService);
  const reportService = useReport();
  const { bin, onStatusChange } = props;
  const { user } = useUser();
  const queryClient = useQueryClient();
  const QUERY_KEY = `BIN_${bin._id}`;

  const reportCount = reportService.getReportsForBin(bin._id);
  const [binStatusLoading, setBinStatusLoading] = React.useState(false);

  async function handleMarkBinAsEmpty(bin: BinData) {
    setBinStatusLoading(true);
    try {
      await binService.markBinAsEmpty(bin._id);
      reportService.markBinAsEmpty(bin._id);
    } catch (error: any) {
      setBinStatusLoading(false);
      return toast.error(error.message, {
        toastId: `empty-bin-${bin._id}`,
      });
    }
    onStatusChange && onStatusChange(bin);
    toast.success("bin status updated", { toastId: `empty-bin-${bin._id}` });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    setBinStatusLoading(false);
  }

  async function handleMarkBinAsInDisposal(bin: BinData) {
    setBinStatusLoading(true);
    try {
      await binService.markBinAsInDisposal(bin._id);
      reportService.markBinAsInDisposal(bin._id);
    } catch (error: any) {
      setBinStatusLoading(false);
      return toast.error(error.message, {
        toastId: `in-dispoasl-bin-${bin._id}`,
      });
    }
    onStatusChange && onStatusChange(bin);
    toast.success("bin status updated", {
      toastId: `in-dispoasl-bin-${bin._id}`,
    });
    queryClient.invalidateQueries({ queryKey: [QUERY_KEY] });
    setBinStatusLoading(false);
  }

  function handleReportBinASFull(bin: BinData) {
    setBinStatusLoading(true);
    const status = reportService.reportBin(bin._id);
    status ? toast.success("report sent") : toast.error("failed to send");
    setBinStatusLoading(false);
  }

  return (
    user && (
      <div className=" ">
        <div className=" group flex w-full flex-col gap-y-2 overflow-hidden rounded-lg ">
          <div className=" relative h-full w-full overflow-hidden rounded-lg ">
            <div className=" grid h-[18rem] w-full place-items-center ">
              <RiDeleteBin6Line
                className={twMerge(
                  " h-[10rem] w-[10rem] ",
                  bin.status === BIN_STATUS.EMPTY && " text-green-500 ",
                  bin.status === BIN_STATUS.IN_DISPOSAL && " text-amber-500 ",
                  (bin.status === BIN_STATUS.FULL || reportCount > 0) &&
                    " text-red-600 "
                )}
              />
            </div>

            <div
              className={twMerge(
                " items-between absolute inset-0 flex translate-y-0 flex-col bg-white/30 px-4 py-4 text-white "
              )}
            >
              {user.role === USER_ROLES.DISPOSER && (
                <div className="  ">
                  <Link
                    href={`/bins/${bin._id}/edit`}
                    className=" group/notes-btn ml-auto flex h-10 w-fit max-w-fit items-center gap-x-1 overflow-hidden rounded-lg bg-blue-600 px-2 py-1 transition-all duration-300 hover:w-[100%] hover:bg-blue-600 hover:duration-500 md:w-10 "
                  >
                    <span className=" max-w-fit origin-right text-sm transition-all duration-300 group-hover/notes-btn:w-[100%] group-hover/notes-btn:opacity-100 md:w-0 md:opacity-0 ">
                      Edit
                    </span>

                    <BiSolidEditAlt className=" ml-auto flex h-5 w-5 " />
                  </Link>
                </div>
              )}

              <div className=" relative flex w-full flex-1 flex-col justify-end gap-y-4 ">
                <div
                  className={twMerge(
                    " -mr-4 w-fit self-end rounded-l-2xl p-3 text-right ",
                    bin.status === BIN_STATUS.EMPTY && " bg-green-500 ",
                    bin.status === BIN_STATUS.IN_DISPOSAL && " bg-amber-500 ",
                    (bin.status === BIN_STATUS.FULL || reportCount > 0) &&
                      " bg-red-500 "
                  )}
                >
                  {reportCount > 0 ? `${reportCount} report` : bin.status}
                </div>

                <div className=" flex flex-col gap-1 ">
                  <div className=" flex items-center gap-1 text-lg font-extrabold md:text-xl ">
                    {bin.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex h-fit w-full gap-2 text-xs sm:text-sm ">
            {user.role === USER_ROLES.DISPOSER && (
              <>
                {bin.status === BIN_STATUS.IN_DISPOSAL && (
                  <Button
                    disabled={binStatusLoading}
                    loading={binStatusLoading}
                    type="button"
                    onClick={(e) => handleMarkBinAsEmpty(bin)}
                    className=" h-14 w-full rounded-lg bg-green-500 text-lg text-white transition-all duration-300 hover:bg-green-600 disabled:bg-green-700 disabled:text-white/60 disabled:hover:bg-green-700 "
                  >
                    FINISH
                  </Button>
                )}

                {(bin.status === BIN_STATUS.EMPTY ||
                  bin.status === BIN_STATUS.FULL) && (
                  <Button
                    disabled={
                      // no reports ||
                      binStatusLoading
                    }
                    loading={binStatusLoading}
                    type="button"
                    onClick={(e) => handleMarkBinAsInDisposal(bin)}
                    className=" h-14 w-full rounded-lg bg-green-500 text-lg text-white transition-all duration-300 hover:bg-green-600 disabled:bg-green-700 disabled:text-white/60 disabled:hover:bg-green-700 "
                  >
                    DISPOSE
                  </Button>
                )}

                <Link
                  href={`/bins/${bin._id}`}
                  className=" grid h-14 w-full place-items-center rounded-lg bg-blue-600 text-lg text-white transition-all duration-300 hover:bg-blue-700 "
                >
                  VIEW
                </Link>
              </>
            )}

            {user.role === USER_ROLES.USER && (
              <>
                <Button
                  disabled={bin.status !== BIN_STATUS.EMPTY}
                  loading={binStatusLoading}
                  type="button"
                  onClick={(e) => handleReportBinASFull(bin)}
                  className=" h-14 w-full rounded-lg bg-red-500 text-lg text-white transition-all duration-300 hover:bg-red-600 disabled:bg-red-800 disabled:text-white/40 disabled:hover:bg-red-800 "
                >
                  REPORT
                </Button>

                <Link
                  href={`/bins/${bin._id}`}
                  className=" grid h-14 w-full place-items-center rounded-lg bg-blue-600 text-lg text-white transition-all duration-300 hover:bg-blue-700 "
                >
                  VIEW
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}
