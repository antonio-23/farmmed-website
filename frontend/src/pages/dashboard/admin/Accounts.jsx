import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { editProfile } from '../../../constants/formFields';
import Input from '../../../components/Input';
import { Link } from 'react-router-dom';

const fields = editProfile;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export const Accounts = () => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState({});
  const [editProfileData, setEditProfileData] = useState(fieldsState);
  const [editProfile, setEditProfile] = useState(fieldsState);
  const [err, setErr] = useState(null);
  const [deleteRow, setDeleteRow] = useState({});
  const [showBtn, setShowBtn] = useState();

  async function fetchData() {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/users/searchuser', { searchQuery }, { withCredentials: true });
      const data = response.data;
      console.log(data);
      setEditProfile(data);
      setUserList(data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleClick = async (e, id) => {
    e.preventDefault();
    console.log(id);
    console.log(editProfileData);
    const valid = editRow[id];
    if (valid) {
      try {
        const res = await axios.post(
          'http://127.0.0.1:8800/api/users/edituser',
          { id: id, first_name: editProfileData.first_name, last_name: editProfileData.last_name, email: editProfileData.email, role: editProfileData.role },
          { withCredentials: true }
        );
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
      setShowBtn(!showBtn);
      setEditRow({ ...editRow, [id]: false });
      fetchData();
    } else {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/users/user', { id: id }, { withCredentials: true });
        setEditProfileData(res.data);
        console.log(res.data);
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
    setEditProfileData({ ...editProfileData, [e.target.id]: e.target.value });
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
        <input type='search' name='searchField' id='searchField' className='border rounded-lg w-[50%] focus:outline-0 p-4' placeholder='Wyszukaj' value={searchQuery} onChange={handleSearchInputChange} />
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
              <div key={value.id} className='grid grid-cols-4 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl bg-white hover:bg-violet-100'>
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
                  <form className='mt-10 ml-20 mr-20 mb-10 space-y-6' action='#' method='POST' onSubmit={(e) => handleClick(e, value.id)}>
                    <div className=''>
                      {fields.map((field) => (
                        <Input
                          key={field.id}
                          handleChange={handleChange}
                          value={editProfileData[field.id]}
                          labelText={field.labelText}
                          labelFor={field.labelFor}
                          id={field.id}
                          name={field.name}
                          type={field.type}
                          isRequired={field.isRequired}
                          placeholder={field.placeholder}
                        />
                      ))}
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
