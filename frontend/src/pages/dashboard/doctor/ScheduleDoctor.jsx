import axios from 'axios';
import React, { useEffect, useState } from 'react';

export const ScheduleDoctor = () => {
  const [userData, setUserData] = useState([{}]);

  const fetchData = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:8800/api/schedule/displaying', { user: localStorage.getItem('user') }, { withCredentials: true });
      setUserData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='grid grid-rows-6 grid-flow-col gap-4 m-8 '>
      {userData.map((value) => {
        return (
          <div key={value.id} className='flex justify-around items-center p-4 border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
            <span>{value.name}</span>
            <span>{value.time}</span>
          </div>
        );
      })}
    </div>
  );
};
