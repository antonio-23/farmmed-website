import { db } from "../connect.js";

export const all_drugs = (req, res) => {
    const q = "SELECT Identyfikator_Produktu_Leczniczego, Nazwa_Produktu_Leczniczego, Moc, Postać_farmaceutyczna, Podmiot_odpowiedzialny, Opakowanie, Substancja_czynna FROM farmmed.drugs WHERE Rodzaj_preparatu = 'Ludzki'";
    db.query(q, (err, data) =>{
        if (err) return res.status(500).send(err);
        else return res.status(200).send(data);
    })
}

export const search_drug = (req, res) => {
    const q = "SELECT Identyfikator_Produktu_Leczniczego, Nazwa_Produktu_Leczniczego, Moc, Postać_farmaceutyczna, Podmiot_odpowiedzialny, Opakowanie, Substancja_czynna, Ilosc FROM farmmed.drugs WHERE Rodzaj_preparatu = 'Ludzki' AND Nazwa_Produktu_Leczniczego LIKE ? LIMIT 1000;";
    db.query(q, [req.body.searchQuery + '%'], (err, data) =>{
        if (err) return res.status(500).send(err);
        else return res.status(200).send(data);
    });
};

export const edit_drugs = (req, res) => {
    const q = "Update farmmed.drugs ilość = ? WHERE Identyfikator_Produktu_Leczniczego = ?";
    db.query(q, [req.body.Ilosc, req.body.Identyfikator_Produktu_Leczniczego], (err,data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send("Zmieniono ilość!")
    })
}


/*UPDATE farmmed.drugs SET Ilosc =  
    CASE
        WHEN RAND() < 0.2 THEN 0
        WHEN RAND() < 0.01 THEN 15
        WHEN RAND() < 0.01 THEN 16
        WHEN RAND() < 0.01 THEN 17
        WHEN RAND() < 0.01 THEN 18
        WHEN RAND() < 0.01 THEN 19
        WHEN RAND() < 0.01 THEN 20
        ELSE FLOOR(RAND() * 13) + 1
    END;
*/