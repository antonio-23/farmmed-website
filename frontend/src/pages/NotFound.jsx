import React, { useEffect } from 'react';
// import notFoundPicture from '../assets/notFoundPicture.png';
import doctor from '../assets/doctor.svg';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  useEffect(()=>{
    localStorage.clear();
  }, []);
  return (
    <div className='flex items-center flex-col font-Montserrat'>
      <div className='lg:w-[450px] 2xl:w-[750px] 2xl:pt-32 pt-20'>
        <img src={doctor}  alt='not found Picture' />
      </div>
      <div className='flex flex-col items-center'>
          <h1 className='text-8xl text-violet-600 font-bold p-2'>404</h1>
          <p className='text-4xl text-violet-500 2xl:text-5xl p-2'>Ups! Doktora nie ma w pobliżu</p>
          <p className='text-lg 2xl:text-xl p-2'>Próbowaliśmy znaleźć stronę, którą szukasz, ale niestety jej nie ma</p>
          <p className='text-lg 2xl:text-xl p-2'>Przejdź do <Link to='/' className='text-violet-500'>strony głównej</Link></p>
      </div>
    </div>
  );
};
