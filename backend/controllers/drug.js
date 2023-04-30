import { db } from "../connect.js";

export const all_drugs = (req, res) => {
    const q = "SELECT Identyfikator_Produktu_Leczniczego, Nazwa_Produktu_Leczniczego, Moc, Postać_farmaceutyczna, Podmiot_odpowiedzialny, Opakowanie, Substancja_czynna FROM farmmed.drugs WHERE Rodzaj_preparatu = 'Ludzki' LIMIT 100";
    db.query(q, (err, data) =>{
        if (err) return res.status(500).send(err);
        else return res.status(200).send(data);
    })
}

export const search_drug = (req, res) => {
    const q = "SELECT Identyfikator_Produktu_Leczniczego, Nazwa_Produktu_Leczniczego, Moc, Postać_farmaceutyczna, Podmiot_odpowiedzialny, Opakowanie, Substancja_czynna FROM farmmed.drugs WHERE Rodzaj_preparatu = 'Ludzki' AND Nazwa_Produktu_Leczniczego LIKE ?";
    db.query(q, [req.body.name + '%'], (err, data) =>{
        if (err) return res.status(500).send(err);
        else return res.status(200).send(data);
    });
};
