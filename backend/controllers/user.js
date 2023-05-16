import { db } from '../connect.js';
import { decrypt } from '../middleware/hash.js';
import bcrypt from 'bcryptjs';

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

export const show_data2 = (req, res) =>{
  const id = decrypt(req.body.user);
  const q = "SELECT id AS user, first_name, last_name, email FROM farmmed.user WHERE id = ?";
  db.query(q, [id], (err, data) =>{
    if (err) return res.status(500).json(err);
    return res.json(data);
  })
}

export const edit_data = (req, res) =>{
  const id = decrypt(req.body.user);
  const checkUserQuery = "SELECT * FROM farmmed.user WHERE email = ? AND id != ?";
  db.query(checkUserQuery, [req.body.email,id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      const existingUser = data.find(user => user.email === req.body.email);
      if (existingUser) {
        return res.status(409).send("Użytkownik z podanym Email już istnieje");
      }

    }      
    const q1 = "UPDATE farmmed.user SET first_name = ?, last_name = ?, email = ? WHERE id = ?"
    db.query(q1, [req.body.first_name, req.body.last_name, req.body.email, id], (err, data)=>{
      if (err) return res.status(500).json(err);
      else return res.status(200).send("Zmieniono dane");
  })})
}

export const edit_password = (req, res) =>{
  const id = decrypt(req.body.user);
  console.log(id);
  const q = "SELECT password FROM farmmed.user WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json(err);
    console.log("1");
    console.log(data[0].password);
    bcrypt.compare(req.body.password, data[0].password, (err, isMatch) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log("2")
      if (isMatch) {
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.new_password, salt);
        const q1 = "UPDATE farmmed.user SET password = ? WHERE id = ?"
        db.query(q1, [hashedPassword , id], (err, data)=>{
        if (err) return res.status(500).json(err);
        else return res.status(200).send("Zmieniono dane");
    })
      } else {
        return res.status(400).send("Hasło niepoprawne");
      }
    }); 
  })
}