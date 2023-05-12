import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const FiguresUser = () => {
  const [figuresList, setFiguresList] = useState([{}]);
  const [showRow, setShowRow] = useState({});

  const handleClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    const valid = showRow[id];
    if (valid) {
      setShowRow({ ...showRow, [id]: false });
    } else {
      setShowRow({ ...showRow, [id]: true });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/allfile', { user: localStorage.getItem('user') }, { withCredentials: true });
      const data = response.data;

      setFiguresList(data);
    } catch (error) {
      console.log(error);
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
    <>
      <div className='flex justify-around mx-10 pt-6 items-center text-center text-lg font-bold'>
        <p>Data</p>
        <p>Doktor</p>
      </div>
      <div className='lg:h-[32rem] 2xl:h-[60rem] w-full overflow-auto'>
        <div className='text-center py-4 mx-10'>
          {figuresList.map((value) => {
            console.log(value);
            return (
              <div key={value.id} className='grid grid-cols-2 grid-flow-cols py-4 my-2 items-center border rounded-xl bg-white hover:bg-violet-100 shadow-md shadow-gray-200'>
                <p>{value.data_wizyty}</p>
                <p>{value.doctor_name}</p>

                <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                  <p className='border-b ml-4 py-1'>Cel wizyty</p>
                  <p className='border-b ml-4 py-1'>Objawy</p>
                  <p className='border-b ml-2 py-1'>Wyniki badań</p>
                  <p className='border-b ml-4 py-1'>Zalecenia</p>
                  <p className='border-b ml-4 py-1'>Termin kolejnej wizyty</p>
                </div>
                <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                  <p className='border-b mr-4 py-1'>{value.cel_wizyty}</p>
                  <p className='border-b mr-4 py-1'>{value.objawy}</p>
                  <p className='border-b mr-4 py-1'>{value.wynik_badania}</p>
                  <p className='border-b mr-4 py-1'>{value.Zalecenia}</p>
                  <p className='border-b mr-4 py-1'>{value.Termin_kolejnej_wizyty}</p>
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
