import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config();
const app = express();
app.use(express.json());

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

app.use("/api/user",userRoutes)
//use "use" when using router package  

app.use("/api/auth",authRoutes);