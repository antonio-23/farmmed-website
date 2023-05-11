import { db } from '../connect.js';
import { decrypt } from '../middleware/hash.js';

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = 'SELECT u.first_name, u.last_name, u.email, r.name FROM farmmed.user u INNER JOIN farmmed.roles r USING(id_role) WHERE id=?';
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data[0]);
  });
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ NAZWA UŻYTKOWNIKA ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const getName = (req, res) => {
  let token = null;
  const id = decrypt(req.body.user);
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
        const q = 'SELECT first_name FROM farmmed.user WHERE id= ?';
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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ EDYCJA DANYCH USERA ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const show_data = (req, res) =>{
  const id = decrypt(req.body.user);
  const q = "SELECT first_name, last_name, date_of_birth, PESEL, email, password FROM farmmed.user WHERE id = ?";
  db.query(q, [id], (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.json(data);
  })
}

export const edit_data = (req, res) =>{
  const id = decrypt(req.body.user);
  const q = "SELECT password FROM farmmed.user WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
  const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
    if (!checkPassword) {
      return res.status(404).json("Niepoprawny email lub hasło");
    }
    const checkUserQuery = "SELECT * FROM farmmed.user WHERE email = ? AND id != ?";

  db.query(checkUserQuery, [req.body.email,id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      const existingUser = data.find(user => user.email === req.body.email);
      if (existingUser) {
        return res.status(409).send("Użytkownik z podanym Email już istnieje");
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.new_password, salt);
      const q1 = "UPDATE farmmed.user SET first_name = ?, last_name = ?, email = ?, password = ? WHERE id = ?"
      db.query(q1, [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, id], (err, data)=>{
        if (err) return res.status(500).json(err);
        else return res.status(200).send("Zmieniono dane");
    })
  }})
  })
}