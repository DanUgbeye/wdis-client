"use client";
import { DisposalData } from "@/modules/disposal/disposal.types";
import Mapper from "@/presentation/_shared/components/Mapper";
import React from "react";
import DisposalTableRow from "./DisposalTableRow";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import { USER_ROLES } from "@/modules/user/user.type";

export interface DisposalTableProps {
  disposals: DisposalData[];
  onDelete: (order: DisposalData) => Promise<any>;
}

export default function DisposalTable(props: DisposalTableProps) {
  const { disposals, onDelete } = props;
  const { user } = useUser();

  return (
    user && (
      <table className=" w-full min-w-[60rem] text-lg ">
        <thead className=" w-full">
          <tr className=" mx-12 h-20 w-full border-b-2 border-white text-lg font-bold ">
            <th className=" px-4 text-left ">Details</th>
            <th className=" px-4 text-left ">Time</th>
            <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">Status</th>
            {user.role === USER_ROLES.DISPOSER && (
              <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody className=" w-full px-12 ">
          <Mapper
            id="all-orders-data"
            list={disposals}
            component={({ item: disposal, index }) => (
              <DisposalTableRow disposal={disposal} onDelete={onDelete} />
            )}
          />
        </tbody>
      </table>
    )
  );
}
