import React, { useEffect, useState } from 'react';
import { Button } from '../../../components/Button';
import axios from 'axios';

export const VisitUser = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [doctorId, setDoctorId] = useState();
  const [dateList, setDateList] = useState([]);
  const [date, setDate] = useState();
  const [timeList, setTimeList] = useState([]);
  const [time, setTime] = useState();
  const [err, setErr] = useState(null);

  useEffect(() => {
    const showDoctors = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/users/view', { withCredentials: true });
        const data = res.data;
        setDoctorList(data);
      } catch (error) {
        console.error(error);
      }
    };
    showDoctors();
  }, []);

  const saveDoctorId = (id) => {
    setDoctorId(id);
  };

  const saveDate = (id) => {
    const dateString = id;
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    const formattedDate = `${year}${month < 10 ? '0' : ''}${month}${day < 10 ? '0' : ''}${day}`;
    setDate(formattedDate);

    console.log(`${formattedDate}hsja`);
  };

  const saveTime = (id) => {
    setTime(id);
  };

  useEffect(() => {
    const showDates = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/schedule/view_date', { id: doctorId }, { withCredentials: true });
        const data = res.data;

        setDateList(data);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(doctorId);
    showDates();
  }, [doctorId]);

  useEffect(() => {
    const showTimes = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/schedule/view_time', { id: doctorId, date: date }, { withCredentials: true });
        const data = res.data;
        setTimeList(data);
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(doctorId);
    showTimes();
  }, [date]);

  useEffect(() => {
    const showTime = async () => {
      console.log(time);
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/schedule/registration', { user: localStorage.getItem('user'), id: time }, { withCredentials: true });

        if (res.status === 200 && time.length) setErr('Zarejestrowano na wizytę');
      } catch (error) {
        console.error(error);
      }
    };
    showTime();
  }, [time]);

  return (
    <>
      <div className='grid grid-cols-3 grid-flow-col m-10 mt-20 gap-4'>
        <div className='w-full flex flex-col px-4 py-8 items-center justify-center  border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
          <label className='text-xl font-bold pb-4'>Wybierz doktora</label>
          {doctorList.map((value) => {
            return (
              <select key={value.id} className='outline-none p-2 rounded-lg' onClick={(event) => saveDoctorId(event.target.value)}>
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              </select>
            );
          })}
        </div>
        <div className='w-full flex flex-col px-4 py-8 items-center justify-center  border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
          <label className='text-xl font-bold pb-4'>Wybierz datę</label>
          <select onChange={(event) => saveDate(event.target.value)} className='outline-none p-2 rounded-lg'>
            {dateList.map((value) => {
              return (
                <option key={value.id} value={value.date}>
                  {value.date}
                </option>
              );
            })}
          </select>
        </div>
        <div className='w-full flex flex-col px-4 py-8 items-center justify-center  border rounded-xl border-gray-300 bg-white shadow-md shadow-gray-200'>
          <label className='text-xl font-bold pb-4'>Wybierz godzinę</label>
          <select onChange={(event) => saveTime(event.target.value)} className=' outline-none p-2 rounded-lg'>
            {timeList.map((value) => {
              return (
                <option key={value.id} value={value.id}>
                  {value.time}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className='grid col-span-3 items-center justify-center'>{err && <p className='text-lime-500 font-semibold'>{err}</p>}</div>
    </>
  );
};
