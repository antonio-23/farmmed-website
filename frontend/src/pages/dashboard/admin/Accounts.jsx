import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { editProfile } from '../../../constants/formFields';
import Input from '../../../components/Input';


const fields = editProfile;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));



export const Accounts = () => {
  const [status, setStatus] = useState(0);
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState({});
  const [editProfileData, setEditProfileData] = useState({});
  const [editProfile, setEditProfile] = useState(fieldsState);
  const [err, setErr] = useState(null);

  fieldsState = { ...fieldsState };

  const handleChange = (e) => {
    setEditProfile({ ...editProfile, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEditProfile({ ...editProfile });
    try {
      await axios.post('http://127.0.0.1:8800/api/auth/register', { ...editProfile });
    } catch (err) {
      setErr(err.response.data);
    }
    console.log(err);
  };

  const handleClick = (e, id) => {
    e.preventDefault();
    setEditRow({ ...editRow, [id]: true });
  };

  useEffect(() => {
    const profileData = {};
    userList.forEach((user) => {
      profileData[user.id] = user.first_name;
    });
    setEditProfileData(profileData);
    setEditProfile(profileData);
  }, [userList]);

  // useEffect(()=>{
  //   const profileData = {};
  //   userList.forEach((user)=>{
  //     profileData[user.id] = user.first_name;
  //   });
  //   setEditProfile(profileData);
  //   setEditProfileData(profileData);
  // }, [userList]);

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
  }, []);

  useEffect(() => {
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
    fetchData();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const EditForm = () => {
    return (
      <form className='mt-10 ml-20 mr-20 mb-10 space-y-6' action='#' method='POST' onSubmit={handleSubmit}>
        <div className=''>
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={editProfile[field.id]}
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
    );
  };
  return (
    <div className='font-Montserrat'>
      <div className='p-10 flex flex-col items-center justify-center'>
        <input type='search' name='searchField' id='searchField' className='border rounded-lg w-[50%] focus:outline-0 p-4' placeholder='Wyszukaj' value={searchQuery} onChange={handleSearchInputChange} />
      </div>

      <div className='lg:h-[30rem] 2xl:h-[60rem] overflow-auto'>
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
                <button onClick={(e) => handleClick(e, value.id)} id={value.id} className='text-violet-600'>
                  {editRow[value.id] ? 'Zapisz' : 'Edycja'}
                </button>
                <div className='grid col-span-4' style={{ display: editRow[value.id] ? 'block' : 'none' }}>
                  <EditForm />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
