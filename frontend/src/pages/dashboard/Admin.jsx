import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Admin = () => {
  return (
    <div className='flex'>
      <Sidebar />

      <Outlet />
    </div>
  );
};
