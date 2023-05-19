import React from 'react';
import { SearchField } from '../../../components/SearchField';
import { Link } from 'react-router-dom';

export const PrescriptionDoctor = () => {
  return (
    <div className=''>
      <div className='p-8'>
        <SearchField />
      </div>
      <div className='lg:h-[26rem] 2xl:h-[40rem] overflow-auto'>
        <div className='text-center space-y-4 mx-40'>
          <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-2 items-center text-lg font-bold'>
            <p>Id</p>
            <p>Imię i nazwisko</p>
            <p>PESEL</p>
          </div>
          {/* tutaj trzeba dac map() i niech wyswietla uzytkownikow i wkleic ponizsze div'y */}
          <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
            <p>Id</p>
            <p>Imię i nazwisko</p>
            <p>PESEL</p>
            <button className='text-violet-600'>
              <Link to='/doctor/prescriptionDoctor/prescriptionForm'>Wystaw receptę</Link>
            </button>
          </div>
          <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
            <p>Id</p>
            <p>Imię i nazwisko</p>
            <p>PESEL</p>
            <button className='text-violet-600'>
              <Link to='/doctor/prescriptionDoctor/prescriptionForm'>Wystaw receptę</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
