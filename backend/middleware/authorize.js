import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const authorize = (req, res, next) => {
    let token = null;
    const id = req.body.user;
    if (id.length){
    const q = "SELECT token FROM farmmed.user WHERE id = ?";
    db.query(q, [id], (error, data) => {
      if (error) {
        return res.status(500).json(error);
      }
    if (data.length) {
      token = data[0].token;
    }
    if (!token) {
      // przekierowanie na stronę logowania z informacją, że trzeba się zalogować
      res.status(404).json("Nieprtawidłowy token");
    }
  
    try {
      // weryfikujemy token
      const decodedToken = jwt.verify(token, "secretKey");
      res.status(200).json({id_role: decodedToken.id_role});
      // dodajemy zdekodowany token do obiektu żądania
      req.user = decodedToken;
      
      // przechodzimy do następnej funkcji middleware
      next();
    } catch (error) {
      // przekierowanie na stronę logowania z informacją, że trzeba się zalogować
      res.status(404).json("Nieprtawidłowy token");
    }
  })
}}