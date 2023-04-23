import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authorize = (req, res, next) => {
    if (!config.token) {
      // przekierowanie na stronę logowania z informacją, że trzeba się zalogować
      res.status(404).json("Nieprtawidłowy token");
    }
  
    try {
      // weryfikujemy token
      const decodedToken = jwt.verify(config.token, "secretKey");
      res.status(200).json({id_role: decodedToken.id_role});
      // dodajemy zdekodowany token do obiektu żądania
      req.user = decodedToken;
      
      // przechodzimy do następnej funkcji middleware
      next();
    } catch (error) {
      // przekierowanie na stronę logowania z informacją, że trzeba się zalogować
      res.status(404).json("Nieprtawidłowy token");
    }
}