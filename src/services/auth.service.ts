import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await User.findOneByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error("Password incorrect");
  }

  const token = jwt.sign({ email }, "secret", { expiresIn: "1h" });

  return token;
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await User.findOneByEmail(email);

  if (user) {
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create(email, hashedPassword);

  return newUser;
};

export const authService = {
  loginWithEmailAndPassword,
  createUserWithEmailAndPassword,
};
