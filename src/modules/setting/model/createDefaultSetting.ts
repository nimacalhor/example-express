import type { Document, Types } from "mongoose";
import type { RawSetting } from "../types/setting.type";
import Setting from "./setting.model";
import {
  D_COMMENT_QUERY_KEYS,
  D_MEDIA_QUERY_KEYS,
  D_PROFILE_QUERY_KEYS,
} from "@src/modules/advanced-search/constants/querykeys.constant";

type RType = Document<unknown, {}, Setting> &
  Setting & {
    _id: Types.ObjectId;
  };

async function createDefaultSetting(): Promise<RType> {
  const defaultSetting: RawSetting = {
    requestCount: 100,
    minDelay: 1000,
    maxDelay: 3000,
    batchSize: 1,
    index: 1,
    totalIndex: 0,
    loopNumber: 10,
    queryKeys: {
      media: D_MEDIA_QUERY_KEYS,
      profile: D_PROFILE_QUERY_KEYS,
      comment: D_COMMENT_QUERY_KEYS,
    },
  };

  const setting = await Setting.create(defaultSetting);
  return setting;
}

export default createDefaultSetting;
