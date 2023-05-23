import React from 'react';
import { Button } from './Button';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const EditPassword = () => {
  return (
    <div className='flex justify-center items-center px-4 pt-24 sm:px-6 lg:px-8'>
      <form action='#' method='post' className='flex flex-col bg-ghostwithe bg-opacity-90 w-full max-w-md space-y-8 rounded-2xl'>
        <input id='password' type='password' placeholder='Hasło' className={fixedInputClass} />
        <input id='password' type='password' placeholder='Powtórz hasło' className={fixedInputClass} />
        <Button>Zapisz</Button>
      </form>
    </div>
  );
};
