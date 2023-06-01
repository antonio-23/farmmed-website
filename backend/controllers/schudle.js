import { db } from '../connect.js';
import { decrypt, encrypt } from '../middleware/hash.js';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ Tworzenie harmonogramu przez admina ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const create_schudle = (req, res) => {
  const { startDate, endDate, startTime, endTime, doctorId, daysOfWeek } = req.body;

  const [odRoku, odMiesiaca, odDnia] = startDate.split('-').map(Number);
  const [doRoku, doMiesiaca, doDnia] = endDate.split('-').map(Number);

  let aktualnaData = new Date(odRoku, odMiesiaca - 1, odDnia);
  const koncowaData = new Date(doRoku, doMiesiaca - 1, doDnia);

  const Daty = [];

  while (aktualnaData <= koncowaData) {
    if (aktualnaData.getDay() === daysOfWeek) {
      const rok = aktualnaData.getFullYear();
      const miesiac = (aktualnaData.getMonth() + 1).toString().padStart(2, '0');
      const dzien = aktualnaData.getDate().toString().padStart(2, '0');
      Daty.push(`${rok}${miesiac}${dzien}`);
    }
    aktualnaData.setDate(aktualnaData.getDate() + 1);
  }

  const [poczatkowaGodzina, poczatkoweMinuty] = startTime.split(':').map(Number);
  const [koncowaGodzina, koncoweMinuty] = endTime.split(':').map(Number);

  const godziny = [];

  let aktualnaGodzina = poczatkowaGodzina;
  let aktualneMinuty = poczatkoweMinuty;

  while (aktualnaGodzina < koncowaGodzina || (aktualnaGodzina === koncowaGodzina && aktualneMinuty < koncoweMinuty)) {
    const godzina = aktualnaGodzina.toString().padStart(2, '0');
    const minuty = aktualneMinuty.toString().padStart(2, '0');
    godziny.push(`${godzina}:${minuty}`);

    aktualneMinuty += 20;
    if (aktualneMinuty >= 60) {
      aktualneMinuty -= 60;
      aktualnaGodzina++;
    }
  }

  const wyniki = [];

  // Pobieranie danych asynchronicznie dla każdej daty
  const fetchData = async () => {
    try {
      for (let d = 0; d < Daty.length; d++) {
        const q = "SELECT * FROM farmmed.schudle WHERE date = ?";
        await new Promise((resolve, reject) => {
          db.query(q, Daty[d], (err, data) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              if (data.length === 0) {
                for (let t = 0; t < godziny.length; t++) {
                  const value = [doctorId, Daty[d], godziny[t]];
                  wyniki.push(value);
                }
              }
              resolve();
            }
          });
        });
      }
      await fetchData2();
    } catch (error) {
      return res.status(500).send(error);
    }
  };

  const fetchData2 = async () => {
    if (wyniki.length === 0) {
      return res.status(200).send("Brak harmonogramu do dodania.");
    } else {
      const q = "INSERT INTO `farmmed`.`schudle` (`doctor_id`, `date`, `time`) VALUES ?";
      db.query(q, [wyniki], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        return res.status(200).send("Dodano harmonogram.");
      });
    }
  };

  fetchData();
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ wyświetlanie wolnych terminów ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const view_these_dates = (req, res) =>{
  const q = "SELECT id, date, time FROM farmmed.schudle WHERE doctor_id = ? AND user_id IS NULL;"
  db.query(q, [req.body.id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(res.data);
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ wyświetlanie pacjentów do przyjęcia ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const displaying_patients_for_admission = (req, res) =>{
  const id = decrypt(req.body.user);
  const q = `SELECT CONCAT(u.first_name, ' ', u.last_name) AS name, s.time
  FROM farmmed.schudle s
  INNER JOIN farmmed.user u ON s.user_id = u.id
  WHERE doctor_id = ? AND user_id IS NOT NULL AND s.date = CURDATE();`
  db.query(q, [user], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).send(res.data);
  });
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ rejestracja na wizytę ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const registration_for_a_medical_visit = (req,res) =>{
  const id = decrypt(req.body.user);
  const q = `UPDATE farmmed.schudle SET user_id = ? WHERE (id = ?);`
  db.query(q, [id, req.body.id], (err,data) =>{
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    return res.status(200).send("Zarezerwowano wizytę");
  });
}