"use client";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import React from "react";

function AllBinsPage() {
  return <div>AllBinsPage</div>;
}
export default WithOnProtectedRoute(
  WithPrimaryLayout(AllBinsPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
