import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const app = express();

app.listen(3000, () => {
    // inbuilt in later versions {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   }
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Mongo db is connected ");
    });
  console.log("server running on port 3000");
});