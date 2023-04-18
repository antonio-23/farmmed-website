import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(0);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth');
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
        setStatus(response.status)
      } catch (error) {
        console.error(error);
      }
    };
    checkAuth();
    console.log (status);
    axios.post('http://127.0.0.1:8800/api/users/name', { userId: userId })
      .then(res => setName(res.data))
      .catch(err => console.log(err));
  });

  return (
    <div className='relative right-12 rounded-l-[2.5rem] bg-white font-Montserrat'>
      <div className='p-10'>
        <h1 className='text-4xl font-bold'>Witaj, {name} </h1>
      </div>
    </div>
  );
};
