import { DisposalData } from "@/modules/disposal/disposal.types";
import Mapper from "@/presentation/_shared/components/Mapper";
import React from "react";
import DisposalTableRow from "./DisposalTableRow";

export interface DisposalTableProps {
  disposals: DisposalData[];
  onDelete: (order: DisposalData) => Promise<any>;
}

export default function DisposalTable(props: DisposalTableProps) {
  const { disposals, onDelete } = props;

  return (
    <table className=" w-full text-lg ">
      <thead className=" mx-12 h-20 w-full border-y-2 border-white text-lg font-bold ">
        <th className=" px-4 text-left ">Details</th>
        <th className=" px-4 text-left ">Time</th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">Status</th>
        <th className=" w-[10rem] max-w-[10rem] px-4 text-left ">Action</th>
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
  );
}
