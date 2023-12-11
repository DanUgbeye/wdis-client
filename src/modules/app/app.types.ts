export interface AppStats {
  numBins: number;
  disposal: DisposalStats;
}

export interface DisposalStats {
  total: number;
  completed: number;
  ongoing: number;
}
