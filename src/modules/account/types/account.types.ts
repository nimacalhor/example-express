import type { Document } from "mongoose";

export interface Account extends Document {
  accountId?: string;
  username: string;
  password: string;
  proxy: string;
  status?: string;
  requestCount?: number;
  session?: any;
  email?: string;
  phone?: string;
}
