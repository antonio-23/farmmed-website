import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardDoubleArrowDown, MdOutlineKeyboardDoubleArrowUp } from 'react-icons/md';
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
    <div className='lg:h-[30rem] 2xl:h-[60rem] w-full overflow-auto'>
      <div className='text-center py-8 mx-10'>
        <div className='grid grid-cols-2 grid-flow-cols py-4 items-center text-lg font-bold'>
          <p>Data</p>
          <p>Doktor</p>
        </div>
        {figuresList.map((value) => {
          console.log(value);
          return (
            <div key={value.id} className='grid grid-cols-2 grid-flow-cols py-4 my-2 items-center border rounded-xl bg-white hover:bg-violet-100'>
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
                {showRow[value.id] ? <MdOutlineKeyboardDoubleArrowUp size={20} /> : <MdOutlineKeyboardDoubleArrowDown size={20} />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
