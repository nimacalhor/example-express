import { Schema } from "mongoose";
import type { ProfileDocument } from "../types/profile.types";

const profileSchema = new Schema<ProfileDocument>(
  {
    isTargeted: { type: Boolean, default: false },
    target: {
      type: Schema.Types.ObjectId,
      ref: "Target"
    }
  },
  { strict: true }
);

export default profileSchema;
