import axios from 'axios';
import { useState, useEffect } from 'react';


export const MainPage = () => {
  const [name, setName] = useState('');
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.post('http://127.0.0.1:8800/api/users/name', { userId: userId })
      .then(res => setName(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='relative right-12 rounded-l-[2.5rem] bg-white font-Montserrat'>
      <div className='p-10'>
        <h1 className='text-4xl font-bold'>Witaj, {name} </h1>
      </div>
    </div>
  );
};
