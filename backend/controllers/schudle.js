import { db } from '../connect.js';
import { decrypt, encrypt } from '../middleware/hash.js';

/*~~~~~~~~~~~~~~~~~~~~~~~~~~ Tworzenie harmonogramu przez admina ~~~~~~~~~~~~~~~~~~~~~~~~~~*/

export const create_schudle = (req, res) => {
  const { startDate, endDate, startTime, endTime, doctorId, daysOfWeek } = req.body;

  const [forYear, forMonth, forDay] = startDate.split('-').map(Number);
  const [toYear, toMonth, toDay] = endDate.split('-').map(Number);

  let currentDate = new Date(forYear, forMonth - 1, forDay);
  const end = new Date(toYear, toMonth - 1, toDay);

  const Dates = [];

  while (currentDate <= end) {
    if (currentDate.getDay() === daysOfWeek) {
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      Dates.push(`${year}${month}${day}`);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const [initialHour, initialMinutes] = startTime.split(':').map(Number);
  const [finalHour, finalMinutes] = endTime.split(':').map(Number);

  const hours = [];

  let currentHours = initialHour;
  let currentMinutes = initialMinutes;

  while (currentHours < finalHour || (currentHours === finalHour && currentMinutes < finalMinutes)) {
    const hour = currentHours.toString().padStart(2, '0');
    const minutes = currentMinutes.toString().padStart(2, '0');
    hours.push(`${hour}:${minutes}`);

    currentMinutes += 20;
    if (currentMinutes >= 60) {
      currentMinutes -= 60;
      currentHours++;
    }
  }

  const result = [];

  // Pobieranie danych asynchronicznie dla każdej daty
  const fetchData = async () => {
    try {
      for (let d = 0; d < Dates.length; d++) {
        const q = "SELECT * FROM farmmed.schudle WHERE date = ?";
        await new Promise((resolve, reject) => {
          db.query(q, Dates[d], (err, data) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              if (data.length === 0) {
                for (let t = 0; t < hours.length; t++) {
                  const value = [doctorId, Dates[d], hours[t]];
                  result.push(value);
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
    if (result.length === 0) {
      return res.status(200).send("Brak harmonogramu do dodania.");
    } else {
      const q = "INSERT INTO `farmmed`.`schudle` (`doctor_id`, `date`, `time`) VALUES ?";
      db.query(q, [result], (err, data) => {
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