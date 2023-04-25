import React from 'react';
import { Sidebar } from '../../../components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Chemist = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Outlet />
    </div>
  );
};
