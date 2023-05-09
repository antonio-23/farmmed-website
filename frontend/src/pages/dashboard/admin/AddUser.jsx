import axios from 'axios';
import React, {useState, useEffect} from 'react';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const AddUser = () => {
  const [adduser, setAdduser] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8800/api/users/adduser", adduser, {
        withCredentials: true
      }); 
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setAdduser({...adduser, [e.target.id]: e.target.value,
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


  return (
    <div className='flex  justify-center items-center px-4 pt-24 sm:px-6 lg:px-8'>
      <form action='' method='post' className='flex flex-col bg-ghostwithe bg-opacity-90 w-full max-w-md space-y-8 rounded-2xl'>
      <input onChange={handleChange} labelText='Name' labelFor='name' id='first_name' name='first_name' autoComplete='name' isRequired={true} type='name' className={fixedInputClass} placeholder='Imię' />
        <input onChange={handleChange} labelText='Last_name' labelFor='last_name' name='last_name' isRequired={true} type='name' autoComplete='last_name' className={fixedInputClass} placeholder='Nazwisko' />
        <input onChange={handleChange} labelText='Email address' labelFor='email-addres' id='email' autoComplete='email' isRequired={true} type='email' className={fixedInputClass} placeholder='Email' />
        <input onChange={handleChange} labelText='Password' labelFor='password' id='password' isRequired={true} type='password' className={fixedInputClass} placeholder='Hasło' />
        <input onChange={handleChange} labelText='Spec' labelFor='spec' id='id_spec' autoComplete='spec' isRequired={true} name='spec' type='name' className={fixedInputClass} placeholder='Specjalizacja' />
        <select name='' id='' className={fixedInputClass}>
          <option value='Admin'>Admin</option>
          <option value='Doktor'>Doktor</option>
          <option value='Aptekarz'>Aptekarz</option>
        </select>
        <button handleSubmit={handleSubmit} className='bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-700'>Dodaj</button>
      </form>
    </div>
  );
};
