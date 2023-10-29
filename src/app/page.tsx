"use client";

import userModel, {
  currentState,
} from "@/client/features/user/core/user.model";
import React from "react";

export function useHomePageController() {
  const modelData = React.useMemo(() => userModel, []);

  function handleUpdate(data: string) {
    modelData.update(data);
  }

  console.log("re rendering")
  return {
    modelData,
    handleUpdate,
  };
}

export default function HomePage() {
  const { modelData, handleUpdate } = useHomePageController();

  return (
    <main
      onClick={() => {
        currentState();
        console.log(modelData, "before");
        const rand = Math.random().toString();
        console.log(rand, "rand");
        handleUpdate(rand);
        console.log(modelData, "after");
        currentState();
        console.log(modelData, "after");
      }}
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 "
    >
      Hello world
    </main>
  );
}
