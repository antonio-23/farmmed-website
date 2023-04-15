import { db } from "../connect.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const login = (req, res) => {
  const q = "SELECT * FROM farmmed.user WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(404).json("Niepoprawny email lub hasło");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
  });
};

export const register = (req, res) => {
  //CHECK USER IF EXISTS
  const q = "SELECT * FROM farmmed.user WHERE email = ? OR PESEL = ?";

  db.query(q, [req.body.email, req.body.PESEL], (err, data) => {
    if (err) return res.status(500).send(err);
    if (data.length) {
      const existingUser = data.find(user => user.email === req.body.email);
      if (existingUser) {
        return res.status(409).send("Użytkownik z podanym Email już istnieje");
      }
      const existingPESELUser = data.find(user => user.PESEL === req.body.PESEL);
      if (existingPESELUser) {
        return res.status(409).send("Użytkownik z podanym numerem PESEL już istnieje");
      }
  }
  
  //VERIFY PESEL
  if (!validatePESEL(req.body.PESEL)) {
    return res.status(400).send("Nieprawidłowy numer PESEL");
  }

  //VERIFY PASSWORD
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).send("Hasło musi mieć co najmniej 8 znaków, jedną małą i jedną dużą literę, cyfrę oraz znak specjalny ! @ # $ % ^ & * ( ) _ + - = { } [ ] | \ : ; \" < > , . ? /");
  }

    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
        "INSERT INTO farmmed.user (`first_name`, `last_name`, `date_of_birth`, `PESEL`, `email`, `password`) VALUE (?)";
    const values = [
      req.body.first_name,
      req.body.last_name,
      req.body.date_of_birth,
      req.body.PESEL,
      req.body.email,
      hashedPassword,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Utworzono konto");
    });
  });
};

export const logout = (req, res)=>{
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).send("Wylogowano")
};

export const forgot = (req, res)=>{
  const q = "SELECT * FROM farmmed.user WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    console.log(data);
    if (err) return res.status(400).json("Nieprawidłowy email");
    if (!data.length) return res.status(404).json("Użytkownik o podanym adresie email nie istnieje");
    return res.status(200).json("Poprawny email");
  });
};

function validatePESEL(pesel) {
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  const length = pesel.length;

  if (length !== 11) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < length - 1; i++) {
    sum += parseInt(pesel.charAt(i)) * weights[i];
  }

  const checksum = (10 - (sum % 10)) % 10;

  return checksum === parseInt(pesel.charAt(length - 1));
}
