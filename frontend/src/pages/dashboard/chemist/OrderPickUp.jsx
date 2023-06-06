import React from 'react';
import { Button } from '../../../components/Button';

export const OrderPickUp = () => {
  return (
    <div>
      <div className='grid grid-cols-4 items-center justify-center text-center mx-10 grid-flow-cols gap-x-4 text-lg font-bold py-6 px-2'>
        <span>Nazwa leku</span>
        <span>Dawkowanie</span>
        <span>Opakowanie</span>
        <span>Ilość</span>
      </div>
      <div className='grid grid-cols-4 my-4 items-center justify-center text-center mx-18 grid-flow-cols gap-x-4 py-4 px-2 mx-10 border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
        <span>Nazwa leku</span>
        <span>Dawkowanie</span>
        <span>Opakowanie</span>
        <span>Ilość</span>
      </div>

      <div className='flex justify-center gap-x-10 py-4'>
        <Button>Anuluj</Button>
        <Button>Zapisz</Button>
      </div>
    </div>
  );
};
