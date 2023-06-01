import React, { useEffect, useState } from 'react';
import axios from 'axios';

// poniedziałek - 1
// wtorek       - 2
// środa        - 3
// czwartek     - 4
// piątek       - 5
// sobota       - 6

export const Schedule = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [showRow, setShowRow] = useState({});
  const [data, setData] = useState([])

  useEffect(()=>{
    const showDoctors =async () => {
      try{
        const res = await axios.post("http://127.0.0.1:8800/api/users/view", { withCredentials: true });
        const data = res.data;
        setDoctorList(data);
      }catch(error){
        console.error(error);
      }
    }
    showDoctors();
  }, [])

  const handleClickDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8800/api/schulde/create', { data }, { withCredentials: true });
      console.log(res.data);
      fetchData();
    } catch (error) {
      console.error(error);
    }
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
  };


  return (
    <>
      <div className='flex justify-around mx-10 pt-6 items-center text-center text-lg font-bold'>
        <p>Imię i nazwisko</p>
        <p>Spaecjalizacja</p>
      </div>
      {/* <div className='lg:h-[35rem] 2xl:h-[60rem] w-full overflow-auto'>
        <div className='text-center py-4 mx-10'>
          {doctorList.map((value) => {
            return (
              <div key={value.id} className='grid-flow-cols py-4 my-4 items-center border rounded-xl bg-white hover:bg-violet-100 shadow-md shadow-gray-200 border-gray-300'>
                <div className='grid grid-cols-2'>
                  <p>{value.name}</p>
                  <p>{value.spec}</p>
                  <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                    <p className='border-b ml-4 py-1' >Data od:</p>
                    <input type="date"/>
                  </div>
                  <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                    <p className='border-b ml-4 py-1' >Data Do::</p>
                    <input type="date"/>
                  </div>
                </div>
                
                <div className='grid grid-cols-4'>
                <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                  <p className='border-b ml-4 py-1'>Dzień tygodnia</p>
                  <p className='border-b ml-4 py-2'>Poniedziałki</p>
                  <p className='border-b ml-4 py-2'>Wtorki</p>
                  <p className='border-b ml-2 py-2'>Środy</p>
                  <p className='border-b ml-4 py-2'>Czwartki</p>
                  <p className='border-b ml-4 py-2'>Piątki</p>
                  <p className='border-b ml-4 py-2'>Soboty</p>
                </div>
                <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                  <p className='border-b ml-4 py-1'>Czas od:</p>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                </div>
                <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                  <p className='border-b ml-4 py-1'>Czas Do:</p>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                  <input type="time" className='border-b ml-4 py-2'/><br/>
                </div>
                <div className={showRow[value.id] ? 'py-4 justify-center items-center ' : 'hidden'}>
                  <p className='border-b ml-4 py-1'> </p>
                  <buton className='border-b ml-4 py-2 text-violet-600'>Zapisz</buton><br/>
                  <buton className='border-b ml-4 py-2 text-violet-600'>Zapisz</buton><br/>
                  <buton className='border-b ml-4 py-2 text-violet-600'>Zapisz</buton><br/>
                  <buton className='border-b ml-4 py-2 text-violet-600'>Zapisz</buton><br/>
                  <buton className='border-b ml-4 py-2 text-violet-600'>Zapisz</buton><br/>
                  <buton className='border-b ml-4 py-2 text-violet-600'>Zapisz</buton><br/>
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
      </div> */}
    </>
  );
};
