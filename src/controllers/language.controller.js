import { getConnection } from "./../database/database";

const getLanguages = async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, name, programmers FROM language"
    );
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const getOneLanguage = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, name, programmers FROM language WHERE id = ?",
      id
    );
    res.json(result);
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const addLanguage = async (req, res) => {
  try {
    const { name, programmers } = req.body;
    if (name === undefined || programmers === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all fields" });
    }

    const language = { name, programmers };
    const connection = await getConnection();

    const result = await connection.query(
      "INSERT INTO language SET ?",
      language
    );

    res.status(201).json({ message: "language successfully added" });
  } catch (err) {
    res.status(500);
    res.send(err.message);
  }
};

const updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, programmers } = req.body;

    if (id === undefined || name === undefined || programmers === undefined) {
      res.status(400).json({ message: "Bad Request. Please fill all fields" });
    }

    const language = { name, programmers };

    const connection = await getConnection();
    const result = await connection.query(
      "UPDATE language SET ? WHERE id = ?",
      [language, id]
    );
    res.status(201).json({ message: "Update successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;

    const connection = await getConnection();
    const result = await connection.query(
      "DELETE FROM language WHERE id = ?",
      id
    );
    res.status(201).json({ message: "Delete successfully" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const methods = {
  getLanguages,
  getOneLanguage,
  addLanguage,
  updateLanguage,
  deleteLanguage,
};
