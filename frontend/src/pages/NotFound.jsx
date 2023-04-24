import React from 'react';
import notFoundPicture from '../assets/notFoundPicture.png';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='flex items-center flex-col font-Montserrat'>
      <div className='lg:w-[450px] 2xl:w-[750px]'>
        <img src={notFoundPicture}  alt='not found Picture' />
      </div>
      <div className='flex flex-col items-center'>
          <h1 className='text-8xl text-blue-400 font-bold p-2'>404</h1>
          <p className='text-4xl text-blue-400 2xl:text-5xl p-2'>Ups! Doktora nie ma w pobliżu</p>
          <p className='text-lg 2xl:text-xl p-2'>Próbowaliśmy znaleźć stronę którą szukasz ale niestety jej nie ma</p>
          <p className='text-lg 2xl:text-xl p-2'>Przejdź do <Link to='/' className='text-blue-500'>strony głównej</Link></p>
      </div>
    </div>
  );
};
