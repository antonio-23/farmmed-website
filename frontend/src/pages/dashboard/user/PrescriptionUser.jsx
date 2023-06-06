import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxDownload } from 'react-icons/rx';

export const PrescriptionUser = () => {
  const [prescriptionList, setPrescriptionList] = useState([]);
  const [showRow, setShowRow] = useState({});

  const handleClick = (e, id) => {
    e.preventDefault();
    const valid = showRow[id];
    if (valid) {
      setShowRow({ ...showRow, [id]: false });
    } else {
      setShowRow({ ...showRow, [id]: true });
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/medical_file/allprescription', { user: localStorage.getItem('user') }, { withCredentials: true });
      const data = response.data;
      console.log(data);
      setPrescriptionList(data);
      console.log(data);
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
    <div>
      <div className='flex justify-around mx-10 pt-6 items-center text-center text-lg font-bold'>
        <p>Data</p>
        <p>Doktor</p>
      </div>

      <div className='lg:h-[35rem] 2xl:h-[60rem] overflow-auto text-center py-4 mx-10'>
        {prescriptionList.map((value) => {
          return (
            <div key={value.id} className='grid grid-cols-2 grid-flow-cols py-4 items-center border rounded-xl bg-white hover:bg-violet-100 shadow-md shadow-gray-200 border-gray-300 my-4'>
              <p>{value.data_wystawienia}</p>
              <p>{value.doctor_name}</p>

              <div key={value.doctor_name} className={showRow[value.id] ? 'grid col-span-2 grid-cols-5 pt-4 justify-center items-center border-t-2 my-4' : 'hidden'}>
                <p className='border-r-2 text-violet-700'>Nazwa leku</p>
                <p className='border-r-2 text-violet-700'>Moc</p>
                <p className='border-r-2 text-violet-700'>Opakowanie</p>
                <p className='border-r-2 text-violet-700'>Dakowanie</p>
                <p className='text-violet-700'>Ulotka</p>
              </div>

              <div className={showRow[value.id] ? 'grid col-span-2 grid-cols-5 justify-center items-center border-b-2 pb-4' : 'hidden'}>
                <div className='flex flex-col gap-y-2'>
                  {value.leki.map((drug) => (
                    <span>{drug.nazwa_leku}</span>
                  ))}
                </div>
                <div className='flex flex-col gap-y-2'>
                  {value.leki.map((drug) => (
                    <span>{drug.moc}</span>
                  ))}
                </div>
                <div className='flex flex-col gap-y-2'>
                  {value.leki.map((drug) => (
                    <span>{drug.opakowanie}</span>
                  ))}
                </div>
                <div className='flex flex-col gap-y-2'>
                  {value.leki.map((drug) => (
                    <span>{drug.dawkowanie}</span>
                  ))}
                </div>
                <div className='flex flex-col justify-center items-center gap-y-2'>
                  {value.leki.map((drug) => (
                    <a key={drug.ulotka} href={drug.ulotka} target='_blank' rel='noopener noreferrer'>
                      <RxDownload size={20} />
                    </a>
                  ))}
                </div>
              </div>

              <div className={showRow[value.id] ? 'grid col-span-2 justify-center py-4 gap-y-2' : 'hidden'}>
                <p className='text-xl font-bold'>Kod</p>
                <p className=' text-violet-700 text-xl font-bold '>{value.key}</p>
              </div>

              <div id={value.id} onClick={(e) => handleClick(e, value.id)} className='grid col-span-2 justify-center py-2'>
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
  );
};
