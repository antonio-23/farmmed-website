import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SearchField } from '../../../components/SearchField';

export const Drugs = () => {
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
        console.log(response.data); // zaloguj informacje o stanie autoryzacji
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
  }, [searchQuery]); // zmiana searchQuery spowoduje ponowne wykonanie useEffect()

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

  const handleEditInputChange = (event) => {
    setEditDrugs(event.target.value);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    console.log(formData.get('file'));
    axios
      .post('http://127.0.0.1:8800/api/drug/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Plik został przesłany na backend', response);
        setErr(`Dodano, strona za chwilę się odświeży`);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch((error) => {
        console.error('Błąd podczas przesyłania pliku', error);
        // Dodaj tutaj kod obsługujący błąd
      });
  };

  return (
    <div className='font-Montserrat'>
      <div className='p-8'>
        <SearchField value={searchQuery} onChange={handleSearchInputChange} />
      </div>

      <div className='flex flex-col items-center justify-center mb-2'>
        <label className='block my-2 text-sm font-medium text-gray-800'>Dodaj plik</label>
        <input
          type='file'
          id='file'
          name='file'
          multiple
          onChange={handleFile}
          className='block text-sm text-gray-900 border file:border-none file:bg-violet-500 file:hover:bg-violet-600 file:text-white file:p-2 file:mr-4 border-gray-300 rounded-lg cursor-pointer focus:outline-none hover:outline-none mb-2'
        />
        {err && <p className='text-lime-500 font-semibold'>{err}</p>}
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
                  <input className='mx-auto p-2 text-center w-16 rounded-lg' type='number' min={0} value={editDrug} onChange={handleEditInputChange} />
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
    </div>
  );
};
