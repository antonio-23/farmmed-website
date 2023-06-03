import React from 'react';
import { Button } from '../../../components/Button';

export const VisitUser = () => {
  return (
    <>
      <div className='grid grid-cols-3 grid-flow-col m-10 mt-20 gap-4'>
        <div className='w-full flex flex-col px-4 py-8 items-center justify-center  border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
          <label className='text-xl font-bold pb-4'>Wybierz doktora</label>
          <select name='' id='' className=' outline-none p-2 rounded-lg'>
            <option value=''>Doktor 1</option>
            <option value=''>Doktor 2</option>
            <option value=''>Doktor 3</option>
          </select>
        </div>
        <div className='w-full flex flex-col px-4 py-8 items-center justify-center  border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
          <label className='text-xl font-bold pb-4'>Wybierz datę</label>
          <select name='' id='' className=' outline-none p-2 rounded-lg'>
            <option value=''>Data 1</option>
            <option value=''>Data 2</option>
            <option value=''>Data 3</option>
          </select>
        </div>
        <div className='w-full flex flex-col px-4 py-8 items-center justify-center  border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
          <label className='text-xl font-bold pb-4'>Wybierz godzinę</label>
          <select name='' id='' className=' outline-none p-2 rounded-lg'>
            <option value=''>Godzina 1</option>
            <option value=''>Godzina 2</option>
            <option value=''>Godzina 3</option>
          </select>
        </div>
      </div>
      <div className='grid col-span-3 items-center justify-center'>
        <Button>Zarejestruj się</Button>
      </div>
    </>
  );
};
