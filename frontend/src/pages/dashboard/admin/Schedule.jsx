import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Schedule = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [showRow, setShowRow] = useState({});
  const [data2, setData] = useState([]);
  const [days, setDays] = useState([
    { day: 'Poniedziałki', id: 1 },
    { day: 'Wtorki', id: 2 },
    { day: 'Środy', id: 3 },
    { day: 'Czwartki', id: 4 },
    { day: 'Piątki', id: 5 },
    { day: 'Soboty', id: 6 },
  ]);

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

  const handleClickCreate = async (e) => {
    e.preventDefault();
    console.log(data2);
    console.log(e.target.id);
    try {
      const res = await axios.post('http://127.0.0.1:8800/api/schedule/create',  data2 , { withCredentials: true });
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeStartDate = async (e) => {
    e.preventDefault();
    setData({ ...data2, ['startDate']: e.target.value });
  };

  const handleChangeEndDate = async (e) => {
    e.preventDefault();
    setData({ ...data2, ['endDate']: e.target.value });
  };

  const handleChangeStartTime = async (e) => {
    e.preventDefault();
    setData({ ...data2, ['startTime']: e.target.value });
  };

  const handleChangeEndTime = async (e) => {
    e.preventDefault();
    setData({ ...data2, ['endTime']: e.target.value, ['dayOfWeek']: e.target.id });
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    const valid = showRow[id];
    if (valid) {
      setShowRow({ ...showRow, [id]: false });
    } else {
      setShowRow({ ...showRow, [id]: true });
    }
    setData({ ['doctorId']: id });
  };

  return (
    <>
      <div className='lg:h-[44rem] 2xl:h-[60rem] w-full overflow-auto'>
        <div className='flex justify-around mx-10 pt-6 items-center text-center text-lg font-bold'>
          <p>Imię i nazwisko</p>
          <p>Spaecjalizacja</p>
        </div>
        <div className='text-center py-4 mx-10'>
          {doctorList.map((value) => {
            return (
              <div key={value.id} className='grid-flow-cols py-4 my-4 items-center border rounded-xl bg-white hover:bg-violet-100 shadow-md shadow-gray-200 border-gray-300'>
                <div className='grid grid-cols-2'>
                  <p>{value.name}</p>
                  <p>{value.spec}</p>
                  <div className={showRow[value.id] ? 'flex flex-col py-4 justify-center items-center ' : 'hidden'}>
                    <p className='font-bold py-1'>Data od:</p>
                    <input
                      onChange={(e) => {
                        handleChangeStartDate(e);
                      }}
                      type='date'
                      className='p-2 rounded-lg'
                    />
                  </div>
                  <div className={showRow[value.id] ? 'flex flex-col py-4 justify-center items-center ' : 'hidden'}>
                    <p className='font-bold py-1'>Data Do:</p>
                    <input
                      onChange={(e) => {
                        handleChangeEndDate(e);
                      }}
                      type='date'
                      className='p-2 rounded-lg'
                    />
                  </div>
                </div>

                <div className='grid grid-cols-4'>
                  <div className={showRow[value.id] ? 'flex flex-col mt-6 justify-center items-center' : 'hidden'}>
                    {days.map((day) => {
                      return (
                        <p key={day.id} id={day.id} className='font-bold p-2 my-2'>
                          {day.day}
                        </p>
                      );
                    })}
                  </div>

                  <div className={showRow[value.id] ? 'py-4 flex flex-col justify-center items-center ' : 'hidden'}>
                    <p className='border-b ml-4 py-1'>Czas od:</p>
                    {Object.keys(days).map((index) => (
                      <input
                        onChange={(e) => {
                          handleChangeStartTime(e);
                        }}
                        type='time'
                        className='border-b ml-4 rounded-lg my-2 p-2'
                        key={index}
                      />
                    ))}
                  </div>

                  <div className={showRow[value.id] ? 'flex flex-col py-4 justify-center items-center ' : 'hidden'}>
                    <p className='border-b ml-4 py-1'>Czas Do:</p>
                    {Object.keys(days).map((index) => (
                      <input id={parseInt(index) + 1}
                        onChange={(e) => {
                          handleChangeEndTime(e);
                        }}
                        type='time'
                        className='border-b ml-4 rounded-lg my-2 p-2'
                        key={index}
                      />
                    ))}
                  </div>

                  <div className={showRow[value.id] ? 'flex flex-col mt-6 justify-center items-center ' : 'hidden'}>
                    {Object.keys(days).map((index) => (
                      
                      <button id={parseInt(index) + 1}
                        onClick={(e) => {
                          handleClickCreate(e);
                        }}
                        className='py-2 text-violet-600 my-2'
                        key={index}
                      >
                        Zapisz
                      </button>
                     
                    ))}
                  </div>
                </div>

                <div id={value.id} onClick={(e) => handleClick(e, value.id)} className='grid col-span-2 justify-center'>
                  {showRow[value.id] ? (
                    <div className='animate-bounce bg-ghostwithe p-1 rounded-2xl'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#7c3aed' className='w-6 h-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75' />
                      </svg>
                    </div>
                  ) : (
                    <div className='animate-bounce bg-ghostwithe p-1 rounded-2xl'>
                      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='#7c3aed' className='w-6 h-6'>
                        <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75' />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
