export interface Setting extends Document {
  requestCount: number;
  minDelay: number;
  maxDelay: number;
  batchSize: number;
  index: number;
  totalIndex: number;
  loopNumber: number;
  queryKeys: QueryKeys;
}
export interface RawSetting {
  requestCount: number;
  minDelay: number;
  maxDelay: number;
  batchSize: number;
  index: number;
  totalIndex: number;
  loopNumber: number;
  queryKeys: QueryKeys;
}

export interface QueryKeys {
  media: QueryKey[];
  profile: QueryKey[];
  comment: QueryKey[];
}

export interface QueryKey {
  key: string;
  allowedOperators: string[];
  allowedTypes: string[];
}
