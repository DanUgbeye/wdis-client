"use client";
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { text, loading, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={twMerge(
        rest.disabled || loading
          ? " bg-violet-900 "
          : " bg-violet-700 hover:bg-violet-800 ",
        " flex h-14 w-full items-center justify-center rounded-md font-medium text-white transition-all duration-300 ",
        className
      )}
    >
      {loading ? <Spinner /> : text}
    </button>
  );
}
