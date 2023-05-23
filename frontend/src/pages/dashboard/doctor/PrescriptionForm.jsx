import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchField } from '../../../components/SearchField';
import { Button } from '../../../components/Button';
import axios from 'axios';

const fixedInputClass = 'rounded-md appearance-none px-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 mx-4';

export const PrescriptionForm = () => {
  const [info, setInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  const [drugsList, setDrugList] = useState([]);
  const navigate = useNavigate();
  const [editState, setEditState] = useState([]);
  const [prescritionList, setPrescritionList] = useState([]);

  useEffect(() => {
    console.log(localStorage.getItem('prescription'));
    const id = localStorage.getItem('prescription');
    console.log(id);
    const view_information = async () => {
      try {
        const res = await axios.post('http://localhost:8800/api/medical_file/view', { id: id });
        setInfo(res.data);
        console.log(info);
      } catch (error) {
        console.error(error);
      }
    };
    view_information();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.post('http://localhost:8800/api/drug/search', { searchQuery }, { withCredentials: true });
      const data = response.data;
      setDrugList(data);
      console.log(drugsList);
    } catch (error) {
      console.error(error);
    }
  }

  async function selection_of_drugs() {
    try {
      const response = await axios.post('http://localhost:8800/api/drug/selection', { search }, { withCredentials: true });
      const data = response.data;
      setDrugList(data);
      console.log(drugsList);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    if(search.length){
    selection_of_drugs();
    }
  }, [search]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  async function display_drugs() {
    try {
      const response = await axios.post('http://localhost:8800/api/medical_file/show', { id_recepty: localStorage.getItem('prescription') }, { withCredentials: true });
      const data = response.data;
      setPrescritionList(data);
      console.log(drugsList);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmitAdd = async () => {
    const updatedState = { ...editState, id_recepty: localStorage.getItem('prescription') };
    try {
      const res = await axios.post('http://localhost:8800/api/medical_file/adddrug', updatedState);
      setInfo(res.data);
      console.log(info);
      fetchData();
      display_drugs(); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value)
    setEditState({ ...editState, [e.target.id]: e.target.value });
    console.log(editState);
  };

  const handleChangeInput = (e) => {
    setEditState({ ...editState, [e.target.id]: e.target.value });
    console.log(editState);
  };

  const handleSubmitSave = () => {
    localStorage.removeItem('prescription');
    navigate('/doctor/prescriptionDoctor');
  };

  return (
    <div className='text-center space-y-4 mx-40'>
      {info.length > 0 && (
        <div className='grid grid-cols-3 grid-flow-cols gap-x-4 pt-8 pb-2 items-center text-lg font-bold border-b-2 border-violet-600'>
          <span>{info[0].key ? info[0].key : ''}</span>
          <span>{info[0].name ? info[0].name : ''}</span>
          <span>{info[0].PESEL ? info[0].PESEL : ''}</span>
        </div>
      )}

        <div className='grid grid-cols-3 grid-flow-cols gap-x-4 py-4 items-center border rounded-xl border-gray-300 shadow-md shadow-gray-200 bg-white hover:bg-violet-100'>
        <span>Nazwa leku</span>
        <span>Dawkowanie</span>
        <span>Opakowanie</span>
          {prescritionList.map((drug) => (
            <React.Fragment key={drug.id}>
              <span>{drug.nazwa}</span>
              <span>{drug.dawkowanie}</span>
              <span>{drug.opakowanie}</span>
            </React.Fragment>
          ))}
        </div>

      <div className='rounded-lg p-6 border-gray-300 shadow-md shadow-gray-200 bg-white'>
        <SearchField value={searchQuery} onChange={handleSearchInputChange} />
        <div className='flex flex-col p-4 gap-y-2 mx-24 border rounded-xl my-4'>
          {drugsList.map((drug) => (
            <button value={drug.id} id='id_leku' name={drug.name} onClick={handleChange} className='hover:bg-violet-100 hover:rounded-xl active:bg-violet-100' key={drug.id}>
              {drug.name ? `${drug.name}, ${drug.moc}` : ''}
            </button>
          ))}
        </div>

        <input placeholder='Dawkowanie' type='text' id='dawkowanie' onChange={handleChangeInput} className={fixedInputClass} />
        <input placeholder='Opakowanie' type='text' id='opakowanie' onChange={handleChangeInput} className={fixedInputClass} />

        <div className='py-4'>
          <Button onClick={handleSubmitAdd}>Dodaj</Button>
        </div>
      </div>
      <Button onClick={handleSubmitSave} customClass={'w-full'}>
        Zapisz
      </Button>
    </div>
  );
};
