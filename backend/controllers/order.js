import { db } from '../connect.js';
import { decrypt, encrypt } from '../middleware/hash.js';

// status zamówień:
// 0 - oczekuje na realizację
// 1 - gotowe do odbioru
// 2 - odrzucone
// 3 - odebrane

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ Wyświetlanie zamówień ~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const show_order_chemist = (req, res) => {
    const q =`SELECT
                o.id,
                CONCAT(u.first_name, " ", u.last_name) AS name,
                u.PESEL,
                o.data_zamowienia
                FROM farmmed.order o 
                INNER JOIN farmmed.user u ON u.id = o.id_user
                WHERE o.status = 0
                ORDER BY o.id ASC`;
    db.query(q, [], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      return res.status(200).send(data);
    });
  };

export const show_drugs_in_order_chemist = (req, res) => {
    const q =`SELECT
                o.id_drug,
                d.Nazwa_Produktu_Leczniczego,
                d.Moc,
                (SELECT di.Ilosc FROM farmmed.drugs_ilosc di WHERE di.Identyfikator_Produktu_Leczniczego = o.id_drug) AS Ilosc
                FROM farmmed.order_drug o
                INNER JOIN farmmed.drugs d ON o.id_drug = d.Identyfikator_Produktu_Leczniczego
                WHERE o.id_order = ?`;
    db.query(q, [req.body.id], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      return res.status(200).send(data);
    });
};

  export const show_order_user = (req, res) => {
    const user = decrypt(req.body.user);
    const q = `SELECT 
                o.id_user, 
                o.id, 
                o.data_zamowienia, 
                (SELECT status FROM farmmed.status WHERE id = o.status) AS status, 
                od.id AS id_order_drug, 
                od.id_drug, 
                (SELECT Nazwa_Produktu_Leczniczego FROM farmmed.drugs WHERE Identyfikator_Produktu_Leczniczego = od.id_drug) AS nazwa,
                (SELECT Moc FROM farmmed.drugs WHERE Identyfikator_Produktu_Leczniczego = od.id_drug) AS moc
                FROM farmmed.order o
                INNER JOIN farmmed.order_drug od ON o.id = od.id_order
                ORDER BY o.id DESC`;
    db.query(q, [user], (err, data) => {
      if (err) return res.status(500).send(err);
      else {
        const transformedResult = [];
        const resultMap = new Map();

        data.forEach((row) => {
          const { id_user, id, data_zamowienia, status, id_order_drug, id_drug, nazwa, moc} = row;    
        
          if (!resultMap.has(id_user)) {
            resultMap.set(id_user, {
              id_user,
              id,
              data_zamowienia,
              status,
              orders: [],
            });
          }
          
          resultMap.get(id_user).orders.push({
            id_order_drug,
            id_drug,
            nazwa,
            moc,
          });          
        });
  
        transformedResult.push(...resultMap.values());
  
        const zamowienia = JSON.stringify(transformedResult, null, 2);
        return res.status(200).send(zamowienia);
      }
    });
  };

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ Realizacja zamówień ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const order_confirmation = (req, res) => {
  const q =`UPDATE farmmed.order SET status = 3 WHERE (id = ?);`;
  db.query(q, [req.body.id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).send("Odebrane");
  });
};

export const order_rejection = (req, res) => {
  const q =`UPDATE farmmed.order SET status = 2 WHERE (id = ?);`;
  db.query(q, [req.body.id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).send("Zamówienie odrzucone");
  });
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ Wydawanie zamówień ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const issuing_the_order = (req, res) => {
  const q =`UPDATE farmmed.order SET status = 1 WHERE (id = ?);`;
  db.query(q, [req.body.id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).send("Zamówienie odebrane");
  });
};