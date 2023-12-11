"use client";
import React from "react";
import { AuthContext } from "../context";

export default function useAuth() {
  const { auth, authExpired, loading, logout, saveAuth } =
    React.useContext(AuthContext);

  return { auth, authExpired, loading, logout, saveAuth };
}
