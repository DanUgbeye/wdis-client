import React from "react";
import { BinContext } from "../context";

export default function useBins() {
  const { binLoading, bins, loadBin } = React.useContext(BinContext);
  return { binLoading, bins, loadBin };
}
