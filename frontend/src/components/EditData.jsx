import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import axios from 'axios';

const fixedInputClass =
  'rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm';

export const EditData = ({ link }) => {
  const [editState, setEditState] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/user/show2', { user: localStorage.getItem('user') }, { withCredentials: true });
        setEditState(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  const handleChange = (e) => {
    setEditState({ ...editState, [e.target.id]: e.target.value });
    console.log(editState)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(editState);
      const res = await axios.post('http://localhost:8800/api/user/edit', editState, {
        withCredentials: true,
      });
      setErr(res.data)
      }
    catch (err) {
      setErr("Dane niepoprawne");
    }
  }

  return (
    <>
      <div className='flex justify-center items-center px-4 pt-24 sm:px-6 lg:px-8'>
        <form action='' method='post' className='flex flex-col bg-ghostwithe bg-opacity-90 w-full max-w-md space-y-8 rounded-2xl'>
          <input id='first_name' name='first_name' autoComplete='name' type='name' placeholder={editState.first_name} onChange={handleChange} className={fixedInputClass} />
          <input id='last_name'name='last_name' type='name' autoComplete='last_name' placeholder={editState.last_name} onChange={handleChange} className={fixedInputClass} />
          <input id='email' autoComplete='email' type='email' placeholder={editState.email} onChange={handleChange} className={fixedInputClass} />
          {err && <p className='text-red-500'>{err}</p>}
          <button className={`bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-700 `} onClick={handleSubmit}>Zapisz</button>
          {/*<Button onClick={handleSubmit}>Zapisz</Button>*/}
        </form>
      </div>
      <Link to={link} className='flex justify-center py-8 text-violet-700'>
        Zmiana hasła
      </Link>
    </>
  );
};
