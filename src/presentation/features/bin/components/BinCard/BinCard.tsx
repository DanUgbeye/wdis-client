import { BIN_STATUS, BinData } from "@/modules/bin/bin.types";
import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import { USER_ROLES } from "@/modules/user/user.type";
import { twMerge } from "tailwind-merge";

export interface BinCardProps {
  bin: BinData;
}

export default function BinCard(props: BinCardProps) {
  const { bin } = props;
  const { user } = useUser();

  return (
    <div className=" ">
      <div className=" group flex w-full flex-col gap-y-2 overflow-hidden rounded-lg ">
        <div className=" relative h-full w-full overflow-hidden rounded-lg ">
          <div className=" grid h-[18rem] w-full place-items-center ">
            <RiDeleteBin6Line
              className={twMerge(
                " h-[10rem] w-[10rem] ",
                bin.status === BIN_STATUS.EMPTY && " text-green-500 ",
                bin.status === BIN_STATUS.FULL && " text-red-500 ",
                bin.status === BIN_STATUS.IN_DISPOSAL && " text-blue-500 "
              )}
            />
          </div>

          <div
            className={twMerge(
              " items-between absolute inset-0 flex translate-y-0 flex-col bg-white/30 px-4 py-4 text-white "
            )}
          >
            {user && user.role === USER_ROLES.DISPOSER && (
              <div className="  ">
                <Link
                  href={`/bins/${bin._id}/edit`}
                  className=" group/notes-btn ml-auto flex h-10 w-fit max-w-fit items-center gap-x-1 overflow-hidden rounded-lg bg-blue-600 px-2 py-1 transition-all duration-300 hover:w-[100%] hover:bg-blue-600 hover:duration-500 md:w-10 "
                >
                  <span className=" max-w-fit origin-right text-sm transition-all duration-300 group-hover/notes-btn:w-[100%] group-hover/notes-btn:opacity-100 md:w-0 md:opacity-0 ">
                    Any
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
                  bin.status === BIN_STATUS.FULL && " bg-red-500 ",
                  bin.status === BIN_STATUS.IN_DISPOSAL && " bg-blue-500 "
                )}
              >
                {bin.status}
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
          <button
            disabled={bin.status === BIN_STATUS.EMPTY}
            type="button"
            onClick={(e) => {}}
            className=" h-12 w-full rounded-lg bg-red-500 text-white transition-all duration-300 hover:bg-red-600 disabled:bg-red-800 disabled:text-white/40 disabled:hover:bg-red-800 "
          >
            REPORT
          </button>

          <Link
            href={`/bins/${bin._id}`}
            className=" grid h-12 w-full place-items-center rounded-lg bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700 "
          >
            VIEW
          </Link>
        </div>
      </div>
    </div>
  );
}
