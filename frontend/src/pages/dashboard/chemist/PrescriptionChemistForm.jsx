import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import axios from 'axios';

export const PrescriptionChemistForm = () => {
  const [drugsList, setDrugList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/viewDrugs', { id_recepty: localStorage.getItem('id') }, { withCredentials: true });
      setDrugList(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
    fetchData();
  }, []);

  const handleSave = () => {};

  const handleCancel = () => {};

  const handleDisableClick = async (id) => {
    const checkbox = document.getElementById(id);
    checkbox.disabled = true;
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/implementation', { id: id });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='h-screen'>
      <div className='grid grid-cols-5 items-center justify-center text-center mx-10 grid-flow-cols gap-x-4 text-lg font-bold py-6 px-2'>
        <span>Nazwa leku</span>
        <span>Dawkowanie</span>
        <span>Opakowanie</span>
        <span>Ilość</span>
        <span>Realizacja</span>
      </div>
      {drugsList.map((drug) => {
        return (
          <div
            key={drug.id}
            className='grid grid-cols-5 my-4 items-center justify-center text-center mx-18 grid-flow-cols gap-x-4 py-4 px-2 mx-10 border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'
          >
            <span>{drug.nazwa}</span>
            <span>{drug.dawkowanie}</span>
            <span>{drug.opakowanie}</span>
            <span>{drug.ilosc}</span>
            <input type='checkbox' id={drug.id} onClick={() => handleDisableClick(drug.id)} />
          </div>
        );
      })}
      <div className='flex justify-center gap-x-10 py-4'>
        <Button onClick={handleCancel}>Anuluj</Button>
        <Button onClick={handleSave}>Zapisz</Button>
      </div>
    </div>
  );
};
