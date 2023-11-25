"use client";
import React, { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "../Spinner";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button(props: ButtonProps) {
  const { children, loading, className, ...rest } = props;

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
      {loading ? <Spinner /> : children}
    </button>
  );
}
