import React, { useEffect, useState } from 'react';
import { SearchField } from '../../../components/SearchField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const PrescriptionChemist = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [check, setCheck] = useState();
  const navigate = useNavigate();
  const [err, setErr] = useState();
  const [date, setDate] = useState();

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
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/findUsersPrescription', { searchQuery }, { withCredentials: true });
      const data = response.data;
      const dateString = response.data[0].Date;
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
      setDate(formattedDate);
      setPrescriptionList(data);
    } catch (error) {
      console.error(error);
    }
  };
 
  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = async (e) => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/checkPrescription', { id: e.target.id, key: check });
      const data = response.data;
      if (data !== null) {
        localStorage.setItem('id', e.target.id);
        navigate('/chemist/prescriptionChemist/prescriptionChemistForm');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setCheck(e.target.value);
  };

  return (
    <>
      <div className='p-8'>
        <SearchField max={'11'} value={searchQuery} onChange={handleSearchInputChange} />
      </div>
      <div className='text-center space-y-4 mx-20 py-2 h-screen'>
        <div className='grid grid-cols-6 grid-flow-cols gap-x-4 py-2 items-center text-lg font-bold'>
          <span>Id</span>
          <span>Imię i nazwisko</span>
          <span>PESEL</span>
          <span>Data</span>
          <span>Kod</span>
        </div>
      </div>
      <div className='lg:h-[26rem] 2xl:h-[40rem] overflow-auto'>
        <div className='text-center space-y-4 mx-20'>
          {prescriptionList.map((value) => {
            return (
              <div key={value.id} className='grid grid-cols-6 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
                <span>{value.id}</span>
                <span>{value.name}</span>
                <span>{value.PESEL}</span>
                <span>{date}</span>
                <input onChange={handleChange} className='mx-auto p-2 w-20 rounded-lg border text-center border-gray-300' type='text' maxLength='4' />
                <button id={value.id} onClick={handleClick} className='text-violet-600'>
                  Realizuj
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
