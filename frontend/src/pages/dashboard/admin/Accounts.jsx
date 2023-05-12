import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { editProfile } from '../../../constants/formFields';
import { Link } from 'react-router-dom';

const fields = editProfile;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const Accounts = () => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState({});
  const [editProfileData, setEditProfileData] = useState([]);
  const [err, setErr] = useState(null);
  const [deleteRow, setDeleteRow] = useState({});
  const [showBtn, setShowBtn] = useState();

  async function fetchData() {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/users/searchuser', { searchQuery }, { withCredentials: true });
      const data = response.data;
      console.log(data);
      setUserList(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = async (e, id) => {
    e.preventDefault();
    const valid = editRow[id];
    if (valid) {
      try {
        const res = await axios.post(
          'http://127.0.0.1:8800/api/users/edituser',
          { id: id, first_name: editProfileData.first_name, last_name: editProfileData.last_name, email: editProfileData.email, role: editProfileData.role, id_spec: editProfileData.spec },
          { withCredentials: true }
        );
        setEditProfileData([]);
      } catch (error) {
        console.error(error);
      }
      setShowBtn(!showBtn);
      setEditRow({ ...editRow, [id]: false });
      fetchData();
    } else {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/users/user', { id: id }, { withCredentials: true });
        setEditProfileData(res.data[0]);
        console.log(editProfileData);
      } catch (error) {
        console.log(error);
      }
      setEditRow({ ...editRow, [id]: true });
    }
  };

  const handleClickDelete = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8800/api/users/deleteuser', { id: id }, { withCredentials: true });
      console.log(res.data);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setEditProfileData({...editProfileData, [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='font-Montserrat'>
      <div className='p-10 flex flex-col items-center justify-center'>
        <input type='search' name='searchField' id='searchField' className='border rounded-lg border-gray-300 w-[50%] focus:outline-0 p-4 shadow-inner shadow-gray-200' placeholder='Wyszukaj' value={searchQuery} onChange={handleSearchInputChange} />
      </div>

      <div className='lg:h-[26rem] 2xl:h-[40rem] overflow-auto'>
        <div className='text-center space-y-4 mx-20'>
          <div className='grid grid-cols-4 grid-flow-cols gap-x-4 py-2 items-center text-lg font-bold'>
            <p>Id</p>
            <p>Imię i nazwisko</p>
            <p>Rola</p>
          </div>
          {userList.map((value) => {
            return (
              <div key={value.id} className='grid grid-cols-4 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
                <p>{value.id}</p>
                <p>{value.name}</p>
                <p>{value.role}</p>
                <div className='flex gap-x-8'>
                  <button onClick={(e) => handleClick(e, value.id)} id={value.id} className='text-violet-600'>
                    {editRow[value.id] ? 'Zapisz' : 'Edycja'}
                  </button>
                  <button onClick={(e) => handleClickDelete(e, value.id)} id={value.id} className='text-red-500'>
                    {deleteRow[value.id] ? 'Tak!' : 'Usuń'}
                  </button>
                </div>
                <div className='grid col-span-4' style={{ display: editRow[value.id] ? 'block' : 'none' }}>
                  <form className='mx-20 my-10 space-y-6 flex justify-center items-center' action='#' method='POST' onSubmit={(e) => handleClick(e, value.id)}>
                    <div className='flex flex-col w-full max-w-md space-y-6 rounded-2xl'>
                      <input
                        value={editProfileData.first_name}
                        onChange={handleChange}
                        labelText='Name'
                        labelFor='name'
                        id='first_name'
                        name='first_name'
                        autoComplete='name'
                        isRequired={true}
                        type='name'
                        className={fixedInputClass}
                        placeholder={editProfileData.first_name}
                      />
                      <input
                        value={editProfileData.last_name}
                        onChange={handleChange}
                        labelText='Last_name'
                        labelFor='last_name'
                        name='last_name'
                        id='last_name'
                        isRequired={true}
                        type='name'
                        className={fixedInputClass}
                        placeholder={editProfileData.last_name}
                      />
                      <input
                        value={editProfileData.email}
                        onChange={handleChange}
                        labelText='Email address'
                        labelFor='email-addres'
                        id='email'
                        autoComplete='email'
                        isRequired={true}
                        type='email'
                        className={fixedInputClass}
                        placeholder={editProfileData.email}
                      />
                      <input
                        value={editProfileData.spec}
                        onChange={handleChange}
                        labelText='Spec'
                        labelFor='spec'
                        autoComplete='spec'
                        id='spec'
                        isRequired={true}
                        name='spec'
                        type='name'
                        className={fixedInputClass}
                        placeholder={editProfileData.spec}
                      />
                      <select value={editProfileData.role} onChange={handleChange} name='rola' id='role' isRequired={true} className={fixedInputClass}>
                        <option value='Admin'>Admin</option>
                        <option value='Doktor'>Doktor</option>
                        <option value='Aptekarz'>Aptekarz</option>
                      </select>
                      {err && <p className='text-red-500'>{err}</p>}
                    </div>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex flex-col items-center pt-6'>
        <Link to='/admin/addUser'>
          <button className='bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-700 font-semibold'>Dodaj użytkownika</button>
        </Link>
      </div>
    </div>
  );
};
