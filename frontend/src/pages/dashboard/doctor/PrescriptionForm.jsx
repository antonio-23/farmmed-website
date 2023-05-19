import React from 'react';
import { SearchField } from '../../../components/SearchField';
import { Button } from '../../../components/Button';

const fixedInputClass = 'rounded-md appearance-none px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mx-4';

export const PrescriptionForm = () => {
  return (
    <div className='text-center space-y-4 mx-40'>
      <div className='grid grid-cols-3 grid-flow-cols gap-x-4 pt-8  items-center text-lg font-bold border-b-2 border-violet-600'>
        <span>1234</span>
        <span>Jakub Ćwik</span>
        <span>69696969696</span>
      </div>
      <div className='grid grid-cols-3 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
        <span>Nazwa leku</span>
        <span>Dawkowanie</span>
        <span>Opakowanie</span>
      </div>
      <div className='bg-white rounded-lg mx-16 p-6 border-gray-300 shadow-md shadow-gray-200'>
        <form action='#' method='post'>
          <SearchField />
          <div className='flex flex-col p-4 gap-y-2 mx-24 border rounded-xl my-4'>
            <span className='hover:bg-violet-100 hover:rounded-xl'>Apap na noc</span>
            <span className='hover:bg-violet-100 hover:rounded-xl'>Apap na noc</span>
            <span className='hover:bg-violet-100 hover:rounded-xl'>Apap na noc</span>
            <span className='hover:bg-violet-100 hover:rounded-xl'>Apap na noc</span>
            <span className='hover:bg-violet-100 hover:rounded-xl'>Apap na noc</span>
          </div>
          <input placeholder='Dawkowanie' type='text' className={fixedInputClass} />
          <input placeholder='Opakowanie' type='text' className={fixedInputClass} />
          <div className='py-4'>
            <Button handleSubmit={'tu wywołasz funkcje'}>Dodaj</Button>
          </div>
        </form>
      </div>
      <Button>Zapisz</Button>
    </div>
  );
};
