import React, { useEffect, useState } from 'react';
import { ProfileData } from '../../../components/ProfileData';
import axios from 'axios';
import { Button } from '../../../components/Button';
import { Link } from 'react-router-dom';

export const ProfileDoctor = () => {
  const [userData, setUserData] = useState([{}]);
  const [date, setDate] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/user/show', { user: localStorage.getItem('user') }, { withCredentials: true });
      setUserData(response.data);
      const dateString = response.data[0].date_of_birth;
      const date = new Date(dateString);
      const day = date.getUTCDate();
      const month = date.getUTCMonth() + 1;
      const year = date.getUTCFullYear();
      const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
      setDate(formattedDate);
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
    <main className='h-screen'>
      <span className='flex justify-center pt-8 pb-4 text-2xl font-semibold'>Twoje dane</span>
      <ProfileData first_name={userData[0].first_name} last_name={userData[0].last_name} email={userData[0].email} date={date} pesel={userData[0].PESEL} password={userData[0].password} />
      <Link className='grid col-span-2 justify-center mx-36' to='/doctor/editDataDoctor'>
        <Button>Edycja</Button>
      </Link>
    </main>
  );
};
