import { db } from "../connect.js";
import { decrypt, encrypt } from "../middleware/hash.js";

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ KARTOTEKA ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const all_file = (req, res) => {
    const user = decrypt(req.body.user);
    const q =`SELECT 
                m.id, 
                DATE_FORMAT(m.Date, "%Y-%m-%d") AS data_wizyty, 
                m.cel_wizyty, 
                CONVERT(AES_DECRYPT(m.objawy, "medical_file") USING utf8mb4) AS objawy, 
                CONVERT(AES_DECRYPT(m.wynik_badania, "medical_file") USING utf8mb4) AS wynik_badania, 
                CONVERT(AES_DECRYPT(m.Zalecenia, "medical_file") USING utf8mb4) AS Zalecenia, 
                m.Termin_kolejnej_wizyty, 
                (SELECT CONCAT(u1.first_name, " ", u1.last_name) FROM farmmed.user u1 INNER JOIN farmmed.medical_file m1 ON u1.id = m1.id_doctor WHERE m1.id = m.id) AS doctor_name 
            FROM farmmed.medical_file m 
            INNER JOIN farmmed.user u ON m.id_user = u.id 
            WHERE u.id = ? 
            ORDER BY m.id DESC`;
    db.query(q, [user], (err, data) =>{
        if(err) return res.status(500).send(err);
        else {
            return res.status(200).send(data);}
    })
}

export const add_file = (req, res) => {
    const user = decrypt(req.body.user);
    const q = 'INSERT INTO farmmed.medical_file (id_user, id_doctor, cel_wizyty, objawy, wynik_badania, Zalecenia, Termin_kolejnej_wizyty) Value (?,?,?, AES_ENCRYPT(?, "medical_file"), AES_ENCRYPT(?, "medical_file"), AES_ENCRYPT(?, "medical_file"),?)';
    db.query(q, [user, req.body.doctor, req.body.cel, req.body.objawy, req.body.wynik, req.body.zalecenia, req.body.termin], (err, data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send("Dodano wpis do kartoteki");
    })
}

export const edit_file = (req, res) => {
    const q = '';
    db.query(q, [], (err, data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send("Zmieniono wpis z kartoteki")
    })
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ RECEPTY ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const all_prescription = (req, res) => {
    const user = decrypt(req.body.user);
     const q = `SELECT r.id, r.key, DATE_FORMAT(r.Date, "%Y-%m-%d") AS data_wystawienia, CONCAT(u.first_name, " ", u.last_name) AS user_name, (SELECT CONCAT(u1.first_name, " ", u1.last_name) FROM farmmed.user u1 INNER JOIN farmmed.recepty r1 ON u1.id = r1.id_doctor WHERE r1.id = r.id) AS doctor_name, DATE_FORMAT(r.validity_date, "%Y-%m-%d") AS ważnosc_recepty, d.Nazwa_Produktu_Leczniczego AS nazwa_leku, d.moc AS moc, rl.opakowanie AS opakowanie, rl.dawkowanie AS dawkowanie, d.ulotka AS ulotka
     FROM farmmed.recepty r
     INNER JOIN farmmed.user u ON r.id_user = u.id
     INNER JOIN farmmed.recepta_leki rl ON r.id = rl.id_recepty
     INNER JOIN farmmed.drugs d ON rl.id_leku = d.Identyfikator_Produktu_Leczniczego
     WHERE u.id = ? AND (r.validity_date > (SELECT CURDATE()))
     ORDER BY r.id DESC`;
    db.query(q, [user], (err, data) =>{
        if(err) return res.status(500).send(err);
        else {
            const transformedResult = [];
            const resultMap = new Map();

            data.forEach((row) => {
            const {
                id,
                key,
                data_wystawienia,
                user_name,
                doctor_name,
                ważnosc_recepty,
                id_leku,
                nazwa_leku,
                moc,
                opakowanie,
                dawkowanie,
                ulotka
            } = row;

            if (!resultMap.has(id)) {
                resultMap.set(id, {
                id,
                key,
                data_wystawienia,
                user_name,
                doctor_name,
                ważnosc_recepty,
                leki: []
                });
            }

            resultMap.get(id).leki.push({
                id_leku,
                nazwa_leku,
                moc,
                opakowanie,
                dawkowanie,
                ulotka
            });
            });

            transformedResult.push(...resultMap.values());

            const recepty = JSON.stringify(transformedResult, null, 2);
            return res.status(200).send(recepty);}
    })
}

export const add_prescription = (req, res) => {
    const user = decrypt(req.body.user);
    const q = 'INSERT INTO farmmed.recepty (id_user, id_doctor) VALUES (?, ?)';
    db.query(q, [req.body.pacjent, user], (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      const insertedId = data.insertId;
      return res.status(200).send({ id: insertedId });
    });
  };
  