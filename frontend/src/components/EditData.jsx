import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const EditData = ({ link }) => {
  return (
    <>
      <div className='flex justify-center items-center px-4 pt-24 sm:px-6 lg:px-8'>
        <form action='' method='post' className='flex flex-col bg-ghostwithe bg-opacity-90 w-full max-w-md space-y-8 rounded-2xl'>
          <input id='first_name' name='first_name' autoComplete='name' type='name' placeholder='Imię' className={fixedInputClass} />
          <input name='last_name' type='name' autoComplete='last_name' placeholder='Nazwisko' className={fixedInputClass} />
          <input id='email' autoComplete='email' type='email' placeholder='Email' className={fixedInputClass} />
          <Button>Zapisz</Button>
        </form>
      </div>
      <Link to={link} className='flex justify-center py-8 text-violet-700'>
        Zmiana hasła
      </Link>
    </>
  );
};
