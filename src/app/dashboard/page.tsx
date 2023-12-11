"use client";
import { USER_ROLES } from "@/modules/user/user.type";
import { Container } from "@/presentation/_shared/components/Container";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import WithPrimaryLayout from "@/presentation/layouts/primary-layout/WithPrimaryLayout";
import WithOnProtectedRoute from "@/presentation/layouts/protected-route";
import React from "react";
import DisposerDasboard from "./_screens/DisposerDasboard";
import UserDashboard from "./_screens/UserDashboard";

function DashboardPage() {
  const { user } = useUser();

  return user ? (
    <main className="h-full min-h-full text-white ">
      <Container>
        {user.role === USER_ROLES.DISPOSER && <DisposerDasboard />}

        {user.role === USER_ROLES.USER && <UserDashboard />}
      </Container>
    </main>
  ) : null;
}

export default WithOnProtectedRoute(
  WithPrimaryLayout(DashboardPage, {
    className:
      " bg-gradient-to-br from-fuchsia-800 via-purple-800 to-violet-800 ",
  })
);
