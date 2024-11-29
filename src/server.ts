import "dotenv/config";
import express from "express";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
