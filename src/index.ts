import express from "express";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.listen(port, () => {
  console.log("Servidor andando en el puerto: " + port);
});
