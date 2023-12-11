"use client";
import React, { useContext } from "react";
import { ReportContext } from "../context/report.context";

function useReport() {
  const {
    connected,
    getReportsForBin,
    reportBin,
    markBinAsEmpty,
    markBinAsInDisposal,
    reports,
  } = useContext(ReportContext);
  return {
    connected,
    getReportsForBin,
    reportBin,
    markBinAsEmpty,
    markBinAsInDisposal,
    reports,
  };
}

export default useReport;
