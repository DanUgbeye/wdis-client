export type DisposalStatus =
  (typeof DISPOSAL_STATUS)[keyof typeof DISPOSAL_STATUS];

export const DISPOSAL_STATUS = {
  ONGOING: "ongoing",
  COMPLETED: "completed",
} as const;

export interface DisposalData {
  _id: string;
  binId: string;
  status: DisposalStatus;
  disposedAt: Date;
}
