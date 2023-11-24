"use client";
import { Container } from "@/presentation/_shared/components/Container";
import Link from "next/link";
import React from "react";

export default function HomePage() {
  return (
    <main className=" block min-h-screen bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ">
      <Container className="  ">
        <div className=" mb-12 flex flex-col gap-y-2 py-12 text-center font-bold uppercase leading-relaxed text-white ">
          <h1 className=" text-2xl ">University of Calabar</h1>
          <h2 className=" text-4xl ">Waste Disposal Application</h2>
        </div>

        <div className=" mx-auto w-full max-w-sm rounded-lg bg-white px-6 py-16 sm:px-12 ">
          <div className=" flex w-full flex-col gap-y-8 ">
            <Link
              href={"/login"}
              className=" grid h-14 place-items-center rounded-md border-2 border-violet-700 px-3 text-violet-700 hover:border-violet-700 hover:bg-violet-700 hover:text-white "
            >
              Login as User
            </Link>

            <Link
              href={"/disposer/login"}
              className=" grid h-14 place-items-center rounded-md border-2 border-violet-700 px-3 text-violet-700 hover:border-violet-700 hover:bg-violet-700 hover:text-white "
            >
              Login as Disposer
            </Link>
          </div>
        </div>

        <div className=" mt-12 ">
          <Link
            href={"/signup"}
            className=" h-14 text-white hover:underline hover:underline-offset-4 "
          >
            signup ?
          </Link>
        </div>
      </Container>
    </main>
  );
}
