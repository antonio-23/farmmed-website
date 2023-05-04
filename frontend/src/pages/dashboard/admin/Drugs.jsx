import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InputEdit(props) {
  return (
    <div>
      <input className='p-2 text-center w-16 rounded-lg' type='number' min={0} defaultValue={props.defaultValue} />
    </div>
  );
}

export const Drugs = () => {
  const navigate = useNavigate();
  const [drugsList, setDrugList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editRow, setEditRow] = useState({});
  const [showBtn, setShowBtn] = useState();
  const [drugCountEdit, setDrugCountEdit] = useState({});
  const [editDrugs, setEditDrugs] = useState();

  const handleClick = (e, id) => {
    e.preventDefault();
    setEditRow({ ...editRow, [id]: true });

    setShowBtn(!showBtn);
  };

  useEffect(() => {
    const drugData = {};
    drugsList.forEach((drug) => {
      drugData[drug.Identyfikator_Produktu_Leczniczego] = drug.Ilosc;
    });
    setDrugCountEdit(drugData);
    setEditDrugs(drugData);
  }, [drugsList]);

  // const handleQtyInputChange = (e, id) => {
  //   const newQty = { ...drugQty };
  //   newQty[id] = e.target.value;
  //   setDrugQty(newQty);
  // };

  // const handleSaveClick = async (e, id) => {
  //   e.preventDefault();
  //   const editDrug = drugsList.find((drug) => drug.Identyfikator_Produktu_Leczniczego === id);
  //   try {
  //     const response = await axios.put(`http://127.0.0.1:8800/api/drug/${id}`, editDrug, { withCredentials: true });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   setEditRow({ ...editRow, [id]: false });
  // };

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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/drug/searchdrugs', { searchQuery }, { withCredentials: true });
        const data = response.data;
        setDrugList(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [searchQuery]); // zmiana searchQuery spowoduje ponowne wykonanie useEffect()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://127.0.0.1:8800/api/drug/editdrugs', { editDrugs }, { withCredentials: true });
        const data = response.data;
        drugCountEdit(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [editDrugs]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='font-Montserrat'>
      <div className='p-10 flex flex-col items-center justify-center'>
        <input type='search' name='searchField' id='searchField' className='border rounded-lg w-[50%] focus:outline-0 p-4' placeholder='Wyszukaj' value={searchQuery} onChange={handleSearchInputChange} />
      </div>

      <div className='lg:h-[30rem] 2xl:h-[60rem] overflow-auto'>
        <div className='text-center space-y-4 mx-20 lg:mx-10'>
          <div className='grid grid-cols-8 grid-flow-cols gap-x-7 py-2 items-center text-lg font-bold'>
            <p>Id</p>
            <p>Nazwa</p>
            <p>Moc</p>
            <p>Postać</p>
            <p>Podmiot</p>
            <p>Opakowanie</p>
            <p>Ilość</p>
          </div>
          {drugsList.map((value) => {
            return (
              <div key={value.Identyfikator_Produktu_Leczniczego} className='grid grid-cols-8 grid-flow-cols gap-x-7 py-4 items-center border rounded-xl bg-white hover:bg-violet-100'>
                <p>{value.Identyfikator_Produktu_Leczniczego}</p>
                <p>{value.Nazwa_Produktu_Leczniczego}</p>
                <p>{value.Moc}</p>
                <p>{value.Postać_farmaceutyczna}</p>
                <p>{value.Podmiot_odpowiedzialny}</p>
                <p>{value.Opakowanie}</p>

                {editRow[value.Identyfikator_Produktu_Leczniczego] ? <InputEdit defaultValue={value.Ilosc} /> : <p>{value.Ilosc}</p>}

                <button onClick={(e) => handleClick(e, value.Identyfikator_Produktu_Leczniczego)} id={value.Identyfikator_Produktu_Leczniczego} className='text-violet-600'>
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
