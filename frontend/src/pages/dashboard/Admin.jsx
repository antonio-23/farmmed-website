import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { MainPage } from '../dashboard/MainPage';

export const Admin = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <MainPage />
      <Outlet />
    </div>
  );
};
