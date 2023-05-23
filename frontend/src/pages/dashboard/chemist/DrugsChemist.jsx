import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchField } from '../../../components/SearchField';

export const DrugsChemist = () => {
  const navigate = useNavigate();
  const [drugsList, setDrugList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState({});
  const [showBtn, setShowBtn] = useState();
  const [editDrug, setEditDrugs] = useState(0);
  const [err, setErr] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/auth/auth', { user: localStorage.getItem('user') });
        console.log(response.data);
      } catch (error) {
        console.error(error);
        navigate('/');
      }
    };
    checkAuth();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.post('http://127.0.0.1:8800/api/drug/searchdrugs', { searchQuery }, { withCredentials: true });
      const data = response.data;
      setDrugList(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleClick = async (e, id, Ilosc) => {
    e.preventDefault();
    setEditDrugs(Ilosc);
    const valid = editRow[id];
    if (valid) {
      try {
        const res = await axios.post('http://127.0.0.1:8800/api/drug/editdrugs', { Ilosc: editDrug, Identyfikator_Produktu_Leczniczego: id }, { withCredentials: true });
        console.log(res.data);
      } catch (error) {
        console.error(error);
      }
      setShowBtn(!showBtn);
      setEditRow({ ...editRow, [id]: false });
      fetchData();
    } else setEditRow({ ...editRow, [id]: true });
  };

  const handleEditInputChange = (e) => {
    setEditDrugs(e.target.value);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className='p-8'>
        <SearchField value={searchQuery} onChange={handleSearchInputChange} />
      </div>

      <div className='grid grid-cols-8 grid-flow-cols gap-x-6 py-2 items-center text-center mx-20 lg:mx-10 text-lg font-bold'>
        <p>Id</p>
        <p>Nazwa</p>
        <p>Moc</p>
        <p>Postać</p>
        <p>Podmiot</p>
        <p>Opakowanie</p>
        <p>Ilość</p>
      </div>
      <div className='lg:h-[28rem] 2xl:h-[60rem] overflow-auto'>
        <div className='text-center space-y-4 mx-20 lg:mx-10'>
          {drugsList.map((value) => {
            return (
              <div
                key={value.Identyfikator_Produktu_Leczniczego}
                className='grid grid-cols-8 grid-flow-cols gap-x-7 py-4 items-center border rounded-xl border-gray-300 bg-white hover:bg-violet-100 shadow-md shadow-gray-200'
              >
                <p>{value.Identyfikator_Produktu_Leczniczego}</p>
                <p>{value.Nazwa_Produktu_Leczniczego}</p>
                <p>{value.Moc}</p>
                <p>{value.Postać_farmaceutyczna}</p>
                <p>{value.Podmiot_odpowiedzialny}</p>
                <p>{value.Opakowanie}</p>

                {editRow[value.Identyfikator_Produktu_Leczniczego] ? (
                  <input className='p-2 text-center w-16 rounded-lg' type='number' min={0} value={editDrug} onChange={handleEditInputChange} />
                ) : (
                  <p>{value.Ilosc}</p>
                )}

                <button onClick={(e) => handleClick(e, value.Identyfikator_Produktu_Leczniczego, value.Ilosc)} id={value.Identyfikator_Produktu_Leczniczego} className='text-violet-600'>
                  {editRow[value.Identyfikator_Produktu_Leczniczego] ? 'Zapisz' : 'Edycja'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
