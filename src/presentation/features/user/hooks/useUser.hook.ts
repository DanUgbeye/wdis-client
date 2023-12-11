"use client";
import React from "react";
import { UserContext } from "../context";

export default function useUser() {
  const { loading, saveUser, user } = React.useContext(UserContext);
  return { loading, saveUser, user };
}
