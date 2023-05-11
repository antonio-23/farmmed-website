import { db } from '../connect.js';
import bcrypt from 'bcryptjs';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ ZARZĄDZANIE UŻYTKOWNIKAMI ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const user = (req, res) => {
  const q = `SELECT u.first_name, u.last_name, u.email, r.name role, s.name spec 
  FROM farmmed.user u 
  JOIN farmmed.roles r USING(id_role) 
  JOIN farmmed.specjalizacja s ON s.id_spec = u.id_spec 
  WHERE id = ?`;
  db.query(q,[req.body.id], (err, data) => {
    if (err) return res.status(500).send(err);
    else {
    return res.status(200).send(data);
    }
  });
};

export const search_user = (req, res) => {
  const q = "SELECT u.id, CONCAT(u.first_name, ' ', u.last_name) name, r.name role, u.first_name, u.last_name, u.email FROM farmmed.user u INNER JOIN farmmed.roles r USING(id_role) WHERE CONCAT(u.first_name, ' ', u.last_name) LIKE ? ORDER BY u.id ASC LIMIT 100";
  db.query(q, [req.body.searchQuery + '%'], (err, data) => {
    if (err) return res.status(500).send(err);
    else return res.status(200).send(data);
  });
};

export const add_user = (req, res) => {
  const checkUserQuery = 'SELECT * FROM farmmed.user WHERE email = ?';
  db.query(checkUserQuery, [req.body.email], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      const existingUser = data.find((user) => user.email === req.body.email);
      if (existingUser) {
        return res.status(200).send('Użytkownik z podanym Email już istnieje');
      }
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(req.body.password)) {
      return res.status(400).send('Hasło musi mieć co najmniej 8 znaków, jedną małą i jedną dużą literę, cyfrę oraz znak specjalny ! @ # $ % ^ & * ( ) _ + - = { } [ ] |  : ; " < > , . ? /');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q = 'INSERT INTO farmmed.user (`first_name`, `last_name`, `email`, `password`, `id_role`, `id_spec`) SELECT ?, ?, ?, ?, (SELECT `id_role` FROM farmmed.roles WHERE `name` = ?), (SELECT `id_spec` FROM farmmed.specjalizacja WHERE `name` = ?)';
    const values = [req.body.first_name, req.body.last_name, req.body.email, hashedPassword, req.body.role, req.body.id_spec];
    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('Utworzono konto');
    });
  });
};

export const delete_user = (req, res) => {
  const q = 'SELECT * FROM farmmed.user WHERE id = ?';
  db.query(q, [req.body.id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      const q = 'DELETE FROM farmmed.user WHERE `id` = ?';
      db.query(q, [req.body.id], (err, data) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send('Konto usunięte');
      });
    }
  });
};

export const edit_user = (req, res) => {
  const q = 'SELECT * FROM farmmed.user WHERE email = ? AND id != ?';
  db.query(q, [req.body.email, req.body.id], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      return res.status(409).send('Użytkownik z podanym Email już istnieje');
    } else {
      const q = 'UPDATE farmmed.user SET first_name = ?, last_name = ?, email = ?, id_role = (SELECT id_role FROM farmmed.roles WHERE name = ?), id_spec = (SELECT id_spec FROM farmmed.specjalizacja WHERE name = ?) WHERE id = ?';
      const values = [req.body.first_name, req.body.last_name, req.body.email, req.body.role, req.body.id_spec, req.body.id];
      db.query(q, values, (err, data1) => {
        if (err) return res.status(500).send(err);
        else return res.status(200).send('zmieniono dane');
      });
    }
  });
};
