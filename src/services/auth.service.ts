import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userService } from "./user.service";

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Password incorrect");
  }

  const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

  return token;
};

export const authService = {
  loginWithEmailAndPassword,
};
