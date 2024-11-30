import { pool } from "../config/database";
import { User as IUser } from "../interfaces/user.interface";

const create = async (email: string, password: string) => {
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
    values: [email, password],
  };

  const { rows } = await pool.query(query);
  return rows[0] as IUser;
};

const findAll = async () => {
  const query = {
    text: "SELECT * FROM users",
  };

  const { rows } = await pool.query(query);
  return rows as IUser[];
};

const findById = async (id: string) => {
  const query = {
    text: "SELECT * FROM users WHERE id = $1",
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0] as IUser;
};

const findOneByEmail = async (email: string) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  const { rows } = await pool.query(query);
  return rows[0] as IUser;
};

const update = async (id: string, email: string, password: string) => {
  const query = {
    text: "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *",
    values: [email, password, id],
  };

  const { rows } = await pool.query(query);
  return rows[0] as IUser;
};

const remove = async (id: string) => {
  const query = {
    text: "DELETE FROM users WHERE id = $1 RETURNING *",
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0] as IUser;
};

export const User = {
  create,
  findAll,
  findById,
  findOneByEmail,
  update,
  remove,
};
