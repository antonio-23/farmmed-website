import React from 'react';
import { Sidebar } from '../../components/Sidebar';
import { MainPage } from './MainPage';

export const Admin = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <MainPage />
    </div>
  );
};
