import React, { useEffect, useState } from 'react';
import { SearchField } from '../../../components/SearchField';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const FiguresDoctor = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);

  const handleClick = async (e, id) => {
    e.preventDefault();
    localStorage.setItem('figures', id);
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
      <nav className='p-8'>
        <SearchField value={searchQuery} onChange={handleSearchInputChange} />
      </nav>
      <main>
        <div className='text-center space-y-4 mx-40 py-2'>
          <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-2 items-center text-lg font-bold'>
            <p>Id</p>
            <p>Imię i nazwisko</p>
            <p>PESEL</p>
          </div>
        </div>
        <section className='lg:h-[26rem] 2xl:h-[40rem] overflow-auto'>
          <div className='text-center space-y-4 mx-40'>
            {userList.map((value) => {
              return (
                <div key={value.id} className='grid grid-cols-4 grid-flow-col gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
                  <span>{value.id}</span>
                  <span>{value.name}</span>
                  <span>{value.PESEL}</span>
                  <button onClick={(e) => handleClick(e, value.id)} className='text-violet-600'>
                    <Link to='/doctor/figuresDoctor/figuresForm'>Dodaj wpis</Link>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};
