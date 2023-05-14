import React from 'react';

export const ProfileData = ({ first_name, last_name, date, pesel, password }) => {
  return (
    <article className='grid grid-cols-2 justify-center items-center mx-28 bg-white rounded-xl p-2 my-4 border shadow-md shadow-gray-200 border-gray-300'>
      <div className='flex flex-col items-center py-6 gap-y-6 text-lg'>
        <span>Imię</span>
        <span>Nazwisko</span>
        <span>Data urodzenia</span>
        <span>Pesel</span>
        <span>Hasło</span>
      </div>
      <div className='flex flex-col items-center py-4 gap-y-6 text-lg'>
        <span>{first_name}</span>
        <span>{last_name}</span>
        <span>{date}</span>
        <span>{pesel}</span>
        <input type='password' name='password' id='password' defaultValue={password} className=' bg-transparent' disabled />
      </div>
    </article>
  );
};
