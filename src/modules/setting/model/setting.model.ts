import settingSchema from "./setting.schema";
import { model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Setting } from "../types/setting.type";

settingSchema.plugin(paginate);

const Setting = model<Setting, PaginateModel<Setting>>(
  "Setting",
  settingSchema,
  "settings"
);

export default Setting;
