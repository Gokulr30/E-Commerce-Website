import mongoose from "mongoose";

export async function connectToDatabase(mongoUri) {
  if (!mongoUri) throw new Error("MONGO_URI is required");
  mongoose.set("strictQuery", true);
  await mongoose.connect(mongoUri);
}


