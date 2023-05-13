import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { HelloName } from '../../../components/HelloName';
import axios from 'axios';

export const Doctor = () => {
  const [status, setStatus] = useState(0);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        setStatus(response.status);
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  });

  return (
    <div className='flex w-full bg-ghostwithe font-Montserrat'>
      <Sidebar />
      <div className='w-full'>
        <HelloName />
        <Outlet />
      </div>
    </div>
  );
};
