import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config({path:"./.env"});

const MONGODB_URL:string=process.env.MONGODB_URL||'';

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Database Connected");
  } catch (error) {
    console.error(error);
  }
};
