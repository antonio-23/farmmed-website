import { db } from "../connect.js"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"

export const login = (req, res) => {
  const q = "SELECT * FROM farmmed.user WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Nie znaleziono użytkownika");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Niepoprawny email lub hasło");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res
    .cookie("accessToken", token, {
      httpOnly: true,
    })
    .status(200)
    .json(others);
  });
};


export const register = (req, res) => {
    /*// Check if user already exists
    const q = "SELECT * FROM farmmed.user WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.json(err);
      if (data.length) {
        return res.status(409).json("Na podany email jest już utworzone konto");
      } else {
        // Create a new user
        // Hash the password
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
          return res.status(200).json("Konto zostało utworzone");
        });
      }
    });*/
      //CHECK USER IF EXISTS

  const q = "SELECT * FROM farmmed.user WHERE email = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");
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
      return res.status(200).json("User has been created.");
    });
  });
};


export const logout = (req, res)=>{
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).status(200).json("Wylogowano")
};