import React from 'react';
import { NavLink } from 'react-router-dom';

const navigation = [
  { name: 'Zarządzanie kontami', path: '/accounts' },
  { name: 'Edycja harmonogramów', path: '/schedule' },
  { name: 'Baza leków', path: '/drugs' },
];

export const Sidebar = () => {
  return (
    <div className='font-Montserrat w-[350px] bg-gradient-to-b from-indigo-500  to-violet-500 h-screen '>
      <div className='pt-10'>
        <h1 className='w-md text-2xl text-white pl-24'>FarMMed</h1>
        <hr className='w-48 h-1 mx-14 my-5 bg-gray-100 rounded md:my-10' />
      </div>
      <div className='flex'>
        <ul>
          {navigation.map((item) => (
            <li className='text-center w-full p-4 m-4  rounded-xl hover:shadow-xl text-white font-bold' key={item.name}>
              <NavLink to={item.path} className={({ isActive }) => (isActive ? 'bg-white rounded-xl' : undefined)}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className='absolute bottom-14 left-0 pl-20'>
        <button className='border rounded-xl border-white hover:shadow-xl p-4 text-white font-bold text-'>Wyloguj się</button>
      </div>
    </div>
  );
};