import React, { useEffect, useState } from 'react';
import { ProfileData } from '../../../components/ProfileData';
import axios from 'axios';
import { Button } from '../../../components/Button';

export const ProfileDoctor = () => {
  const [userData, setUserData] = useState([{}]);

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/user/show', { user: localStorage.getItem('user') }, { withCredentials: true });
      setUserData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
    fetchData();
  });

  return (
    <div>
      <span className='flex justify-center pt-8 pb-4 text-2xl font-semibold'>Twoje dane</span>
      <div className='flex justify-center'>
        <div className='grid grid-cols-2 justify-center items-center'>
          <div className='flex flex-col items-center py-6 gap-y-6 text-lg'>
            <span>Imię</span>
            <span>Nazwisko</span>
            <span>Data urodzenia</span>
          </div>
          <div className='flex flex-col items-center py-6 gap-y-6 text-lg'>
            <ProfileData first_name={userData[0].first_name} last_name={userData[0].last_name} date={userData[0].date_of_birth} />
          </div>
          <Button customClass='grid col-span-2 justify-center mx-36'>Edycja</Button>
        </div>
      </div>
    </div>
  );
};
