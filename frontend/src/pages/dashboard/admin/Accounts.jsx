import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Accounts = () => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
        setStatus(response.status);
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  },[]);

  useEffect (() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/users/searchuser',{searchQuery}, { withCredentials: true });
        const data = response.data;
        console.log(data);
        setUserList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <div className='font-Montserrat'>
      <div className='p-10 flex flex-col items-center justify-center'>
        <input type='search' name='searchField' id='searchField' className='border rounded-lg w-[50%] focus:outline-0 p-4' placeholder='Wyszukaj' value={searchQuery} onChange={handleSearchInputChange}/>
      </div>

      <div className='h-[30rem] 2xl:h-[60rem] overflow-auto'>
        <div className='text-center space-y-4 mx-20'>
          <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-2 items-center text-lg font-bold'>
            <p>Id</p>
            <p>Imię i nazwisko</p>
            <p>Rola</p>
          </div>
          {userList.map((value) => {
            return (
              <div key={value.id} className='grid grid-cols-4 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl hover:bg-violet-100'>
                <p>{value.id}</p>
                <p>{value.name}</p>
                <p>{value.role}</p>
                <button id={value.id} className='text-violet-600'>
                  Edycja
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
