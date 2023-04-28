import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Drugs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };
    checkAuth();
  }); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po załadowaniu komponentu
  return (
    <div className='relative right-12 rounded-l-[2.5rem] bg-white font-Montserrat'>
      <div className='p-10'>Drugs</div>
    </div>
  );
};
