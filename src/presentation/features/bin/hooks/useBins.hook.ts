import React from "react";
import { BinContext } from "../context";

export default function useBins() {
  const { binLoading, bins, error, loadBin } = React.useContext(BinContext);
  return { binLoading, bins, error, loadBin };
}
