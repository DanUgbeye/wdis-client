"use client";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route/WithProtectedRoute";
import React from "react";

function BinDetailsPage() {
  return <div>BinDetailsPage</div>;
}
export default WithOnProtectedRoute(
  WithPrimaryLayout(BinDetailsPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
