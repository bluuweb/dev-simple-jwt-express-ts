import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { UserModel } from "../models/user.model";

const getAllUsers = async () => {
  const users = await UserModel.readUsers();
  return users;
};

const getUserById = async (id: string) => {
  const users = await getAllUsers();
  const user = users.find((item) => item.id === id);
  if (!user) throw new Error("User not found");
  return user;
};

const getUserByEmail = async (email: string) => {
  const users = await getAllUsers();
  const user = users.find((item) => item.email === email);
  if (!user) throw new Error("User not found");
  return user;
};

const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const users = await getAllUsers();
  const user = users.find((item) => item.email === email);
  if (user) throw new Error("User already exists");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = {
    id: nanoid(),
    email,
    password: hashedPassword,
  };

  users.push(newUser);
  await UserModel.writeUsers(users);
  return newUser;
};

export const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUserWithEmailAndPassword,
};
