import mongoose from "mongoose";
import { isDev } from "@global/helpers/general.helper";

const MONGODB_URI = isDev() ? process.env.DB_URL_DEV : process.env.DB_URL_PROD;

async function connectToMongoDB() {
  try {
    const mongooseClient = await mongoose.connect(MONGODB_URI as string);
    console.log("Connected to MongoDB");
    return mongooseClient
  } catch (error) {
    console.error("Error connecting to MongoDB:", {error});
    throw error;
  }
}

export default connectToMongoDB