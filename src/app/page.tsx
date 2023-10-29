"use client";
import React from "react";

export function useHomePageController() {
  function handleUpdate(data: string) {}

  return {
    handleUpdate,
  };
}

export default function HomePage() {
  const { handleUpdate } = useHomePageController();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ">
      Hello world
    </main>
  );
}
