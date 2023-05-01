import { db } from "../connect.js";

export const all_file = (req, res) => {
    const q ='';
    db.query(q, [req.body.user], (err, data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send(data);
    })
}

export const add_file = (req, res) => {
    const q = '';
    db.query(q, [], (err, data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send("Dodano wpis do kartoteki");
    })
}

export const delete_file = (req, res) => {
    const q = '';
    db.query(q, [], (err, data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send("Usunięto wpis z kartoteki")
    })
}

export const edit_file = (req, res) => {
    const q = '';
    db.query(q, [], (err, data) =>{
        if(err) return res.status(500).send(err);
        else return res.status(200).send("Zmieniono wpis z kartoteki")
    })
}