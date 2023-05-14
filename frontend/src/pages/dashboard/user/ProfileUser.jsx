import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import axios from 'axios';
import { ProfileData } from '../../../components/ProfileData';
import { Link } from 'react-router-dom';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const ProfileUser = () => {
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
  }, []);

  return (
    <main>
      <span className='flex justify-center pt-8 pb-4 text-2xl font-semibold'>Twoje dane</span>
      <ProfileData first_name={userData[0].first_name} last_name={userData[0].last_name} date={userData[0].date_of_birth} pesel={userData[0].PESEL} password={userData[0].password} />
      <Link className='grid col-span-2 justify-center mx-36' to='/user/editDataUser'>
        <Button>Edycja</Button>
      </Link>
    </main>
  );
};
