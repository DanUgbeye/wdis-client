import React from "react";

export interface ErrorCardProps {
  error: Error;
}

export default function ErrorCard(props: ErrorCardProps) {
  const { error } = props;

  return (
    <div className=" mx-auto flex h-[10rem] w-full max-w-sm flex-col items-center justify-center gap-y-6 rounded-lg bg-white py-12 text-red-500 ">
      <span className=" font-semibold uppercase ">An Error Occured</span>

      <span className=" text-4xl font-medium ">{error.message}</span>
    </div>
  );
}
