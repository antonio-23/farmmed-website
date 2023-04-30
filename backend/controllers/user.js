import { db } from '../connect.js';
import jwt from 'jsonwebtoken';

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = 'SELECT u.first_name, u.last_name, u.email, r.name FROM farmmed.user u INNER JOIN farmmed.roles r USING(id_role) WHERE id=?';
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
};

export const getName = (req, res) => {
  let token = null;
  const id = req.body.user;
  if (id !== null) {
    const q = 'SELECT token FROM farmmed.user WHERE id = ?';
    db.query(q, [id], (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }
      if (data.length) {
        token = data[0].token;
      }
      if (!token) {
        return res.status(401).json({ message: 'Authentication failed: no token provided' });
      }
      try {
        const q = 'SELECT first_name FROM farmmed.user WHERE id=?';
        db.query(q, [id], (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }
          if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
          return res.json(data[0].first_name);
        });
      } catch (err) {
        return res.status(401).json({ message: 'Authentication failed: invalid token' });
      }
    });
  }
};
