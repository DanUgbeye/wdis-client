export type BinStatus = (typeof BIN_STATUS)[keyof typeof BIN_STATUS];

export const BIN_STATUS = {
  FULL: "full",
  EMPTY: "empty",
  IN_DISPOSAL: "in-disposal",
} as const;

export type BinData = {
  _id: string;
  name: string;
  location: string;
  status: BinStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type NewBin = {
  name: string;
  location: string;
};
