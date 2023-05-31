import React, { useEffect, useState } from 'react';
import { SearchField } from '../../../components/SearchField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const OrderChemist = () => {
  return (
    <>
      <header className='flex justify-around py-4 font-bold text-xl'>
        <span>Do realizacji</span>
        <span>Do odbioru</span>
      </header>
      <main className='flex justify-around '>
        <section className='border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white p-2 mx-10'>
          <div className='grid grid-cols-4 items-center justify-center text-center grid-flow-cols gap-2 text-lg font-bold py-4 px-2'>
            <span>Id</span>
            <span>Imię i nazwisko</span>
            <span>Data</span>
          </div>
          <div className='grid grid-cols-4 items-center justify-center text-center py-2'>
            <span>1</span>
            <span>Jan Kowalski</span>
            <span>23-23-2330</span>
            <button className='text-violet-600'>Realizuj</button>
          </div>
        </section>
        <section className='border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white p-2 mx-10'>
          <div className='grid grid-cols-4 items-center justify-center text-center grid-flow-cols gap-2 text-lg font-bold py-4 px-2'>
            <span>Id</span>
            <span>Imię i nazwisko</span>
            <span>Data</span>
          </div>
          <div className='grid grid-cols-4 items-center justify-center text-center py-2'>
            <span>1</span>
            <span>Jan Kowalski</span>
            <span>23-23-2330</span>
            <button className='text-violet-600'>Realizuj</button>
          </div>
        </section>
      </main>
    </>
  );
};
