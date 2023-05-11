import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
import { RxDownload } from 'react-icons/rx';

export const PrescriptionUser = () => {
  const [prescriptionList, setPrescriptionList] = useState([{}]);
  const [showRow, setShowRow] = useState({});

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/allprescription', { user: localStorage.getItem('user') }, { withCredentials: true });
      const data = response.data;
      console.log(data);
      setPrescriptionList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
    fetchData();
  }, []);

  return (
    <div className='lg:h-[30rem] 2xl:h-[60rem] w-full overflow-auto'>
      <div className='text-center py-8 mx-10'>
        <div className='grid grid-cols-2 grid-flow-cols py-4 items-center text-lg font-bold'>
          <p>Data</p>
          <p>Doktor</p>
        </div>

        <div className='grid grid-cols-2 grid-flow-cols py-4 items-center border rounded-xl bg-white hover:bg-violet-100'>
          <p>2023-01-24</p>
          <p>Tomasz Skowronek</p>

          <div className='grid col-span-2 grid-cols-5 pt-4 justify-center items-center border-t-2 my-4'>
            <p className='border-r-2'>Nazwa Leku</p>
            <p className='border-r-2'>Moc</p>
            <p className='border-r-2'>Opakowanie</p>
            <p className='border-r-2'>Dakowanie</p>
            <p>Ulotka</p>
          </div>

          <div className='grid col-span-2 grid-cols-5 justify-center items-center border-b-2 pb-4'>
            <p className='border-r-2'>Rutinoscorbin</p>
            <p className='border-r-2'>25mg + 100mg</p>
            <p className='border-r-2'>20</p>
            <p className='border-r-2'>Jedna dziennie</p>
            <RxDownload size={20} className='w-full flex justify-center' />
          </div>

          <div className='grid col-span-2 justify-center py-4 gap-y-2'>
            <p className='text-xl font-bold'>Kod</p>
            <p className=' text-violet-700 text-xl font-bold '>2478</p>
          </div>

          <div className='grid col-span-2 justify-center py-2'>
            <MdOutlineKeyboardDoubleArrowDown size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
