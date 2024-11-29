import { User } from "../models/user.model";

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const getUserById = async (id: string) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await User.findOneByEmail(email);
  if (!user) throw new Error("User not found");
  return user;
};

const deleteUserById = async (id: string) => {
  const user = await User.remove(id);
  if (!user) throw new Error("User not found");
  return user;
};

const updateUserById = async (id: string, email: string, password: string) => {
  const user = await User.update(id, email, password);
  if (!user) throw new Error("User not found");
  return user;
};

export const userService = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  deleteUserById,
  updateUserById,
};
