import dateUtils from "@/global-utils/date-utils";
import {
  DISPOSAL_STATUS,
  DisposalData,
} from "@/modules/disposal/disposal.types";
import Button from "@/presentation/_shared/components/Button";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface DisposalTableRowProps {
  disposal: DisposalData;
  onDelete: (disposal: DisposalData) => Promise<any>;
}

export default function DisposalTableRow(props: DisposalTableRowProps) {
  const { disposal, onDelete } = props;

  const [deleteLoading, setDeleteLoading] = React.useState(false);

  async function handleDelete(disposal: DisposalData) {
    setDeleteLoading(true);
    await onDelete(disposal);
    setDeleteLoading(false);
  }

  return (
    <tr
      className={twMerge(" h-20 border-b-2 border-white text-lg font-medium ")}
    >
      <td className=" px-4 text-left ">
        {`Disposal on ${dateUtils.formatDate(new Date(disposal.disposedAt))}`}
      </td>

      <td className=" px-4 text-left ">
        {new Date(disposal.disposedAt).toLocaleTimeString()}
      </td>

      <td className=" px-4 text-left ">
        <Button
          type="button"
          disabled={true}
          className={twMerge(
            " border border-black ",
            disposal.status === DISPOSAL_STATUS.COMPLETED &&
              "bg-green-600 hover:bg-green-600  disabled:bg-green-600",
            disposal.status === DISPOSAL_STATUS.ONGOING &&
              " bg-amber-400 hover:bg-amber-500 disabled:bg-amber-400"
          )}
        >
          {disposal.status}
        </Button>
      </td>

      <td className=" px-4 text-left ">
        <Button
          type="button"
          disabled={deleteLoading}
          loading={deleteLoading}
          onClick={() => handleDelete(disposal)}
          className={twMerge(
            " border border-black  bg-red-600 hover:bg-red-700 "
          )}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}