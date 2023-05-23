import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchField } from '../../../components/SearchField';
import { Button } from '../../../components/Button';
import axios from 'axios';

const fixedInputClass = 'rounded-md appearance-none px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mx-4';

export const PrescriptionForm = () => {
  const [info, setInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [drugsList, setDrugList] = useState([]);
    const navigate = useNavigate();

useEffect(() => {
    const view_information = async () => {
      try {
        const res = await axios.post('http://localhost:8800/api/medical_file/view', { id: localStorage.getItem('prescription') });
        setInfo(res.data)
        console.log(info);
      } catch (error) {
        console.error(error);
      }
    };
    view_information();
},[]); 

async function fetchData() {
  try {
    const response = await axios.post('http://localhost:8800/api/drug/search', { searchQuery }, { withCredentials: true });
    const data = response.data;
    setDrugList(data);
    console.log(drugsList)
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  fetchData();
}, [searchQuery]); 

const handleSearchInputChange = (event) => {
  setSearchQuery(event.target.value);
};

const handleSubmit = async() => {
  try {
    const res = await axios.post('http://localhost:8800/api/medical_file/adddrug', { id: localStorage.getItem('prescription') });
    setInfo(res.data)
    console.log(info);
  } catch (error) {
    console.error(error);
  }
}

const handleSubmit2 = () => {
  localStorage.removeItem('prescription');
  navigate('/doctor/prescriptionDoctor');
}

  return (
    <div className='text-center space-y-4 mx-40'>
      <div className='text-center space-y-4 mx-40'>
        {info.length > 0 && (
          <div className='grid grid-cols-3 grid-flow-cols gap-x-4 pt-8 items-center text-lg font-bold border-b-2 border-violet-600'>
            <span>{info[0].key ? info[0].key : ''}</span>
            <span>{info[0].name ? info[0].name : ''}</span>
            <span>{info[0].PESEL ? info[0].PESEL : ''}</span>
          </div>
        )}
      </div>
      <div className='grid grid-cols-3 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
        <span>Nazwa leku</span>
        <span>Dawkowanie</span>
        <span>Opakowanie</span>
      </div>
      <div className='bg-white rounded-lg mx-16 p-6 border-gray-300 shadow-md shadow-gray-200'>
        <form action='#' method='post'>
          <SearchField value={searchQuery} onChange={handleSearchInputChange}/>
          <div className='flex flex-col p-4 gap-y-2 mx-24 border rounded-xl my-4'>
            {drugsList.map((drug) => (
              <span className='hover:bg-violet-100 hover:rounded-xl' key={drug.id}>
                {drug.name ? drug.name : ''}
              </span>
            ))}
          </div>
          <input placeholder='Dawkowanie' type='text' className={fixedInputClass} />
          <input placeholder='Opakowanie' type='text' className={fixedInputClass} />
          <div className='py-4'>
            <Button onClick={handleSubmit}>Dodaj</Button>
          </div>
        </form>
      </div>
      <Button on onClick={handleSubmit2}>Zapisz</Button>
    </div>
  );
};
