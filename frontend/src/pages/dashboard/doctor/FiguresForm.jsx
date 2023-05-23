import React, { useState } from 'react';
import { Button } from '../../../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fixedInputClass = 'rounded-md appearance-none px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mx-4 resize-none';

export const FiguresForm = () => {
  const navigate = useNavigate();
  const [editState, setEditState] = useState([]);

  const handleSubmitAdd = async () => {
    const updatedState = { ...editState, id: localStorage.getItem('figures'), user: localStorage.getItem('user') };
    console.log(updatedState);

    try {
      const res = await axios.post('http://localhost:8800/api/medical_file/addfile', updatedState);
    } catch (error) {
      console.error(error);
    }

    localStorage.removeItem('figures');
    navigate('/doctor/figuresDoctor');
  };

  const handleChange = (e) => {
    setEditState({ ...editState, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <div className='flex flex-col justify-center mx-40 gap-y-2 py-8 2xl:mt-20 lg:mt-10'>
        <input type='text' name='' id='cel' onChange={handleChange} placeholder='Cel wizyty' className={fixedInputClass} />
        <textarea name='' id='objawy' onChange={handleChange} cols='5' rows='5' placeholder='Objawy' className={fixedInputClass} />
        <textarea name='' id='wynik' onChange={handleChange} cols='5' rows='5' placeholder='Wyniki badania' className={fixedInputClass} />
        <textarea name='' id='zalecenia' onChange={handleChange} cols='5' rows='5' placeholder='Zalecenia' className={fixedInputClass} />
        <input type='text' id='termin' onChange={handleChange} placeholder='Termin następnej wizyty' className={fixedInputClass} />
        <Button onClick={handleSubmitAdd} customClass={'mx-4'}>
          Dodaj
        </Button>
      </div>
    </div>
  );
};
