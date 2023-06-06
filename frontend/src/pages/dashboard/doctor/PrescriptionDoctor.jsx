import { useState, useEffect } from 'react';
import { SearchField } from '../../../components/SearchField';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const PrescriptionDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);

  const handleClick = async (e, idName) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8800/api/medical_file/add', { pacjent: idName, user: localStorage.getItem('user') });
      localStorage.setItem('prescription', res.data.insertedId);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchData() {
    try {
      const response = await axios.post('http://localhost:8800/api/users/search', { searchQuery }, { withCredentials: true });
      const data = response.data;
      setUserList(data);
      console.log(userList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <>
      <div className='p-8 text-center'>
        <SearchField value={searchQuery} onChange={handleSearchInputChange} />
      </div>
      <div className='text-center space-y-4 mx-40 py-2'>
        <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-2 items-center text-lg font-bold'>
          <p>Id</p>
          <p>Imię i nazwisko</p>
          <p>PESEL</p>
        </div>
      </div>
      <div className='lg:h-[26rem] 2xl:h-[40rem] overflow-auto'>
        <div className='text-center space-y-4 mx-40'>
          {userList.map((value) => {
            return (
              <div key={value.id} className='grid grid-cols-4 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
                <p>{value.id}</p>
                <p>{value.name}</p>
                <p>{value.PESEL}</p>
                <button onClick={(e) => handleClick(e, value.id)} id={value.id} className='text-violet-600'>
                  <Link to='/doctor/prescriptionDoctor/prescriptionForm'>Wystaw receptę</Link>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
