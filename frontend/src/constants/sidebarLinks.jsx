const adminLinks = [
   { name: 'Zarządzanie kontami', path: 'accounts' },
   { name: 'Edycja harmonogramów', path: 'schedule' },
   { name: 'Baza leków', path: 'drugs' },
]
const chemistLinks = [
   { name: 'Podgląd danych', path: 'profileChemist'},
   { name: 'Złożne zamówienia', path: 'orderChemist'},
   { name: 'Baza leków', path: 'drugsChemist'},
   { name: 'Recepta pacjenta', path: 'prescriptionChemist'}
]
const doctorLinks = [
   { name: 'Podgląd danych', path: 'profileDoctor'},
   { name: 'Harmonogram przyjęć', path: 'scheduleDoctor'},
   { name: 'Edycja kartotek', path: 'figuresDoctor'},
   { name: 'Wystawienie recepty', path: 'prescriptionDoctor'},
]
const userLinksToClinic = [
   { name: 'Kartoteka', path: 'figuresUser'},
   { name: 'Recepty', path: 'prescriptionUser'},
   { name: 'Rejestracja na wizyte', path: 'visitUser'},
   { name: 'Dane pacjenta', path: 'profileUser'},
   { name: 'Przejdź do apteki',},
]
const userLinksToPharmacy = [
   { name: 'Zamówienia',  },
   { name: 'Składanie zamówień',  },
   { name: 'Koszyk',  },
   { name: 'Dane pacjenta',  },
   { name: 'Przejdź do apteki', },
]

export { adminLinks, chemistLinks, doctorLinks, userLinksToClinic, userLinksToPharmacy }