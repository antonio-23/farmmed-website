import React, { useState } from 'react';
import { Button } from './Button';
import axios from 'axios';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const EditPassword = () => {
  const [editState, setEditState] = useState([]);
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setEditState({ ...editState, [e.target.id]: e.target.value });
    console.log(editState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedState = { ...editState, user: localStorage.getItem('user') };
    try {
      const res = await axios.post('http://localhost:8800/api/user/editpassword', updatedState, {
        withCredentials: true,
      });
      setErr(res.data);
      window.location.reload(false);
    } catch (err) {
      setErr('Dane niepoprawne');
    }
  };

  return (
    <div className='flex justify-center items-center px-4 pt-24 sm:px-6 lg:px-8'>
      <form action='#' method='post' className='flex flex-col bg-ghostwithe bg-opacity-90 w-full max-w-md space-y-8 rounded-2xl'>
        <input onChange={handleChange} id='password' type='password' placeholder='Aktualne hasło' className={fixedInputClass} />
        <input onChange={handleChange} id='new_password' type='password' placeholder='Nowe hasło' className={fixedInputClass} />
        {err && <p className='text-red-500'>{err}</p>}
        <Button onClick={handleSubmit}>Zapisz</Button>
      </form>
    </div>
  );
};
