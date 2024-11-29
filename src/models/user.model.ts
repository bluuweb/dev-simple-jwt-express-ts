import { pool } from "../config/database";

const create = async (email: string, password: string) => {
  const query = {
    text: "INSERT INTO users(email, password) VALUES($1, $2) RETURNING *",
    values: [email, password],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: "SELECT * FROM users",
  };

  const { rows } = await pool.query(query);
  return rows;
};

const findById = async (id: string) => {
  const query = {
    text: "SELECT * FROM users WHERE id = $1",
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const findOneByEmail = async (email: string) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const update = async (id: string, email: string, password: string) => {
  const query = {
    text: "UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *",
    values: [email, password, id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const remove = async (id: string) => {
  const query = {
    text: "DELETE FROM users WHERE id = $1 RETURNING *",
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

export const User = {
  create,
  findAll,
  findById,
  findOneByEmail,
  update,
  remove,
};
