import axios from 'axios';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HelloName } from '../../../components/HelloName';

export const MainPage = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
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
    console.log(status);
    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/user/name', { user: localStorage.getItem('user') }, { withCredentials: true });
        const data = response.data;
        setName(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='w-full bg-ghostwithe font-Montserrat'>
      <HelloName name={name} />
      <Outlet />
    </div>
  );
};
