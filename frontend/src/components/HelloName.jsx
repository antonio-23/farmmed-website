import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const HelloName = () => {
  const [name, setName] = useState('');
  useEffect (() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/user/name', { user: localStorage.getItem('user') }, { withCredentials: true });
        const data = response.data;
        setName(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  },[])
  return (
    <div className='pt-10 pl-10'>
      <h1 className='text-4xl font-bold'>Witaj, {name}</h1>
    </div>
  );
};
