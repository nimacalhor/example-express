import { ObjectId } from "mongoose";

export interface ProfileDocument extends Document {
  isTargeted: boolean;
  target: ObjectId
}
