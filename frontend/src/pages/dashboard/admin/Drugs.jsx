import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Drugs = () => {
  const navigate = useNavigate();
  const [drugsList, setDrugList] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };
    checkAuth();

    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/drug/alldrugs', { withCredentials: true });
        const data = response.data;
        console.log(data);
        setDrugList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po załadowaniu komponentu

  return (
    <div className='font-Montserrat'>
      <div className='p-10 flex flex-col items-center justify-center'>
        <input type='search' name='searchField' id='searchField' className='border rounded-lg w-[50%] focus:outline-0 p-4' placeholder='Wyszukaj' />
      </div>

      <div className='h-[30rem] 2xl:h-[60rem] overflow-auto'>
        <div className='text-center space-y-4 mx-20'>
          <div className='grid grid-cols-7 grid-flow-cols gap-x-7 py-2 items-center text-lg font-bold'>
            <p>Id</p>
            <p>Nazwa</p>
            <p>Moc</p>
            <p>Postać</p>
            <p>Podmiot</p>
            <p>Opakowanie</p>
          </div>
          {drugsList.map((value) => {
            return (
              <div key={value.Identyfikator_Produktu_Leczniczego} className='grid grid-cols-7 grid-flow-cols gap-x-7 py-4 items-center border rounded-xl hover:bg-violet-100'>
                <p>{value.Identyfikator_Produktu_Leczniczego}</p>
                <p>{value.Nazwa_Produktu_Leczniczego}</p>
                <p>{value.Moc}</p>
                <p>{value.Postać_farmaceutyczna}</p>
                <p>{value.Podmiot_odpowiedzialny}</p>
                <p>{value.Opakowanie}</p>
                <button id={value.id} className='text-violet-600'>
                  Edycja
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
