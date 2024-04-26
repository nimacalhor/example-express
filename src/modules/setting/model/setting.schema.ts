import { Schema } from "mongoose";
import type { QueryKey, QueryKeys, Setting } from "../types/setting.type";
import {
  D_COMMENT_QUERY_KEYS,
  D_MEDIA_QUERY_KEYS,
  D_PROFILE_QUERY_KEYS,
} from "@src/modules/advanced-search/constants/querykeys.constant";

const QueryKeySchema = new Schema<QueryKey>({
  key: { type: String, required: true },
  allowedOperators: { type: [String] },
  allowedTypes: { type: [String] },
});

const QueryKeysSchema = new Schema<QueryKeys>({
  media: {
    type: [QueryKeySchema],
    default: D_MEDIA_QUERY_KEYS,
  },
  profile: {
    type: [QueryKeySchema],
    default: D_PROFILE_QUERY_KEYS,
  },
  comment: {
    type: [QueryKeySchema],
    default: D_COMMENT_QUERY_KEYS,
  },
});

const settingSchema = new Schema<Setting>({
  requestCount: { type: Number, required: true, default: 100 },
  minDelay: {
    type: Number,
    required: true,
    default: 1000,
  },
  maxDelay: { type: Number, required: true, default: 3000 },
  batchSize: { type: Number, required: true, default: 1 },
  index: { type: Number, required: true, default: 1 },
  totalIndex: { type: Number, required: true, default: 0 },
  loopNumber: { type: Number, required: true, default: 10 },
  queryKeys: { type: QueryKeysSchema },
});

settingSchema.pre("validate", function (this: Setting, next) {
  if (this.minDelay >= this.maxDelay) {
    (this as any).invalidate(
      "minDelay",
      "minDelay should be less than maxDelay"
    );
  }
  next();
});

export default settingSchema;
