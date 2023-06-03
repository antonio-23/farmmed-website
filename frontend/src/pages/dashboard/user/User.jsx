import React, { useEffect, useState } from 'react';
import { Sidebar } from '../../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { HelloName } from '../../../components/HelloName';

export const User = () => {
  const [name, setName] = useState('');
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
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/user/name', { user: localStorage.getItem('user') }, { withCredentials: true });
        const data = response.data;
        setName(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='flex h-screen bg-ghostwithe font-Montserrat'>
      <Sidebar />
      <div className='w-full'>
        <HelloName name={name} />
        <Outlet />
      </div>
    </div>
  );
};
