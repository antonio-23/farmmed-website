import React from 'react';
import { Button } from '../../../components/Button';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const ProfileUser = () => {
  return (
    <div className=''>
      <div className='flex justify-center items-center mt-24'>
        <form action='' className='flex flex-col bg-opacity-90 w-full max-w-md space-y-6 rounded-2xl'>
          <input type='name' labelText='Name' labelFor='name' id='first_name' name='first_name' autoComplete='name' placeholder='Imię' className={fixedInputClass} />
          <input type='name' labelText='Last_name' labelFor='last_name' id='last_name' name='last_name' autoComplete='last_name' placeholder='Nazwisko' className={fixedInputClass} />
          <input type='email' labelText='Email' labelFor='email-addres' id='email' name='email' autoComplete='email' placeholder='Email' className={fixedInputClass} />
          <input type='password' labelText='Password' labelFor='password' id='password' name='password' placeholder='Hasło' className={fixedInputClass} />
          <Button>Zapisz</Button>
        </form>
      </div>
    </div>
  );
};
