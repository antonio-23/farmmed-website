import express from 'express';
import { all_drugs, search_drug, edit_drugs, add_to_prescription, search_5_drug, selection_of_drugs } from "../controllers/drug.js";
import { convertCsvToSql } from "../conventer/csv_to_sql.js"
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router()

router.post("/alldrugs", all_drugs);
router.post("/searchdrugs", search_drug);
router.post("/editdrugs", edit_drugs);
router.post('/update', upload.single('file'), (req, res) => {
       const file = req.file;
       const filePath = file.path; // Pobranie ścieżki do pliku
       // Wywołanie funkcji convertCsvToSql z przekazaną ścieżką pliku
       convertCsvToSql(filePath);

       // Zwrócenie odpowiedzi na zakończenie żądania
       res.send('Przesłany plik CSV jest przetwarzany.');
    });
router.post("/add", add_to_prescription);
router.post("/search", search_5_drug);
router.post("/selection", selection_of_drugs);

export default router;