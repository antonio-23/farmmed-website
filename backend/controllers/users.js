import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import { config } from '../config.js';

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM user WHERE id=?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const getName = (req, res) => {
  if (!config.token) {
  return res.status(401).json({ message: "Authentication failed: no token provided" });
  }
  try {
    const decodedToken = jwt.verify(config.token, "secretKey");
    const id = decodedToken.id;
    const q = "SELECT first_name FROM farmmed.user WHERE id=?";
    db.query(q, [id], (err, data) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (data.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(data[0].first_name );
    });
  } catch (err) {
    
    return res.status(401).json({ message: "Authentication failed: invalid token" });
  }
};