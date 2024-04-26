import mediaSchema from "./media.schema";
import { PaginateModel, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

mediaSchema.plugin(paginate);

const Media = model<{}, PaginateModel<{}>>("Media", mediaSchema, "media");

export default Media;
