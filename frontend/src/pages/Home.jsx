import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import heroPicture from '../assets/hero-picture.png';
import { About } from './About';
import { OurLocation } from './OurLocation';
import { Contact } from './Contact';
import { Footer } from '../components/Footer';

export const Home = () => {
  const [properties, setProperties] = useState([
    { h1: '4k', p: 'Zadowolonych klientów' },
    { h1: '6k', p: 'Klientów miesięcznie' },
    { h1: '5', p: 'Miast' },
    { h1: '30+', p: 'Partnetów' },
  ]);

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div name='home' className='w-full h-full flex flex-col justify-between 2xl:py-52'>
        <div className='grid md:grid-cols-2 max-w-7xl m-auto'>
          <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
            <h1 className='text-5xl md:text-7xl font-bold'>Jedyne takie miejsce</h1>
            <p className='text-2xl py-4'>Apteka i przychodnia w jednym miejscu</p>
            <button className='py-2 px-4 sm:w-[40%] my-4 bg-violet-600 hover:bg-violet-700 text-white rounded-md'>
              <NavLink to='/register'>Dołącz do nas</NavLink>
            </button>
          </div>
          <div className='flex justify-center w-full'>
            <img className='lg:w-[75%] 2xl:w-[90%]' src={heroPicture} alt='hero picture' />
          </div>
          <div className='md:col-start-1 col-end-3 flex justify-evenly h-auto py-8 md:min-w-[760px] bg-white rounded-3xl items-center flex-col md:flex-row shadow-xl'>
            {properties.map((value, index) => (
              <div key={index} className='flex flex-col items-center'>
                <h1 key={value.h1} className='text-5xl text-violet-600 font-bold pb-2'>
                  {value.h1}
                </h1>
                <p key={value.p} className='text-lg'>
                  {value.p}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <About />
      <OurLocation />
      <Contact />
      <Footer />
    </>
  );
};
