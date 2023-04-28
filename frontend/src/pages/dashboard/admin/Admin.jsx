import React, { useEffect } from 'react';
import { Sidebar } from '../../../components/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { MainPage } from './MainPage';
import axios from 'axios';

export const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
        return true;
      } catch (error) {
        console.error(error);
        navigate('/');
        return false;
      }
    };
    checkAuth();
  }); // [] oznacza, że useEffect zostanie uruchomiony tylko raz po załadowaniu komponentu
  return (
    <div className='flex'>
      <Sidebar />
      <MainPage />
      <Outlet />
    </div>
  );
};
