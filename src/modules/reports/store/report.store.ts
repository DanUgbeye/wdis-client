import { makeAutoObservable } from "mobx";

export class ReportStore {
  constructor() {
    makeAutoObservable(this);
  }

  reports: Record<string, number> = {};

  set(reports: Record<string, number>) {
    this.reports = reports;
  }

  setReportsForBin(binId: string, numReports: number) {
    this.reports[binId] = numReports;
  }

  getReportsForBin(binId: string) {
    return this.reports[binId] || 0;
  }

  get() {
    return this.reports;
  }
}

const reportStore = new ReportStore();
export default reportStore;
