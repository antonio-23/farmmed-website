// npm install csv-parser fs multer

import csv from 'csv-parser';
import fs from 'fs';
import { db } from '../connect.js';

export const convertCsvToSql = (filePath) => {
    const tableName = 'farmmed.drugs';
    // Usuwanie wszystkich wierszy z tabeli
    db.query(`DELETE FROM ${tableName}`, (error) => {
        if (error) {
            console.error('Błąd usuwania wierszy z tabeli:', error);
            db.end();
            return;
        }

        // Otwieranie pliku CSV
        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {

                const modifiedRow = {};
                for (const key in row) {
                    const value = row[key].replace(/"/g, ''); // Usunięcie niepotrzebnych znaków
                    modifiedRow[key] = value;
                }

                rows.push(modifiedRow);
            })
            .on('end', () => {
                // Wstawianie wierszy do tabeli
                const headers = [
                    'Identyfikator_Produktu_Leczniczego',
                    'Nazwa_Produktu_Leczniczego',
                    'Nazwa_powszechnie_stosowana',
                    'Rodzaj_preparatu',
                    'Nazwa_poprzednia_produktu',
                    'Gatunki_docelowe',
                    'Okres_karencji',
                    'Moc',
                    'Postać_farmaceutyczna',
                    'Typ_procedury',
                    'Numer_pozwolenia',
                    'Ważność_pozwolenia',
                    'Kod_ATC',
                    'Podmiot_odpowiedzialny',
                    'Opakowanie',
                    'Substancja_czynna',
                    'Nazwa_wytwórcy',
                    'Kraj_wytwórcy',
                    'Nazwa_importera',
                    'Kraj_importera',
                    'Podmiot_odpowiedzialny_w_kraju_eksportu',
                    'Kraj_eksportu',
                    'Ulotka',
                    'Charakterystyka'
                ];
                const values = rows
                    .map((row) => Object.values(row)[0].split(';'))
                    .filter((row) => row.length === headers.length)
                db.query(
                    `INSERT INTO ${tableName} (${headers.join(',')}) VALUES ?`,
                    [values],
                    (error) => {
                        if (error) {
                            console.error('Błąd wstawiania wierszy do tabeli:', error);
                            db.end();
                        } else {
                            console.log('Konwersja pliku CSV na SQL zakończona.');

                            // Aktualizowanie tabeli drugs_ilość
                            db.query(
                                `INSERT INTO drugs_ilosc (Identyfikator_Produktu_Leczniczego, Ilosc)
                                SELECT d.Identyfikator_Produktu_Leczniczego, 0
                                FROM ${tableName} d
                                LEFT JOIN drugs_ilosc di ON d.Identyfikator_Produktu_Leczniczego = di.Identyfikator_Produktu_Leczniczego
                                WHERE di.Identyfikator_Produktu_Leczniczego IS NULL`,
                                (error) => {
                                    if (error) {
                                        console.error('Błąd aktualizacji tabeli drugs_ilość:', error);
                                    } else {
                                        console.log('Aktualizacja tabeli drugs_ilość zakończona.');
                                    }
                  }
                );
              }
            }
          );
        });
        
    });
  };