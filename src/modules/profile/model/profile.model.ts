import paginate from "mongoose-paginate-v2";
import profileSchema from "./profile.schema";
import { PaginateModel, model } from "mongoose";
import type { ProfileDocument } from "../types/profile.types";

profileSchema.plugin(paginate);

const Profile = model<ProfileDocument, PaginateModel<ProfileDocument>>(
  "Profile",
  profileSchema,
  "profiles"
);

export default Profile;
