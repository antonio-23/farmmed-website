import axios from 'axios';
import React, { useState, useEffect } from 'react';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const AddUser = () => {
  const [adduser, setAdduser] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(adduser);
      const response = await axios.post('http://localhost:8800/api/users/adduser', adduser, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setAdduser({ ...adduser, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, []);

  return (
    <div className='flex  justify-center items-center px-4 pt-24 sm:px-6 lg:px-8'>
      <form action='' method='post' className='flex flex-col bg-ghostwithe bg-opacity-90 w-full max-w-md space-y-8 rounded-2xl'>
        <input onChange={handleChange} id='first_name' autoComplete='name' type='name' className={fixedInputClass} placeholder='Imię' />
        <input onChange={handleChange} id='last_name' type='name' autoComplete='last_name' className={fixedInputClass} placeholder='Nazwisko' />
        <input onChange={handleChange} id='email' autoComplete='email' type='email' className={fixedInputClass} placeholder='Email' />
        <input onChange={handleChange} type='password' id='password' className={fixedInputClass} placeholder='Hasło' />
        <input onChange={handleChange} id='id_spec' autoComplete='spec' type='name' className={fixedInputClass} placeholder='Specjalizacja' />
        <select id='role' onChange={handleChange} className={fixedInputClass}>
          <option value='Admin'>Admin</option>
          <option value='Doktor'>Doktor</option>
          <option value='Aptekarz'>Aptekarz</option>
        </select>
        <button onClick={handleSubmit} className='bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-700'>
          Dodaj
        </button>
      </form>
    </div>
  );
};
