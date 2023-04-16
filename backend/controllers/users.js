import { db } from "../connect.js";

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
  const q = "SELECT first_name FROM farmmed.user WHERE id=?";
  console.log(req.body.userId);
  db.query(q, [req.body.userId], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    // Zwracamy wartość name z bazy danych w formacie JSON
    console.log(data[0].first_name);
    return res.json(data[0].first_name);
  });
};

