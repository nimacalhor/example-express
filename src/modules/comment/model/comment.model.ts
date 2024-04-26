import commentSchema from "./comment.schema";
import { PaginateModel, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

commentSchema.plugin(paginate);

const Comment = model<{}, PaginateModel<{}>>(
  "Comment",
  commentSchema,
  "comments"
);

export default Comment;
