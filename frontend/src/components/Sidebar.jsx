import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { adminLinks, doctorLinks, chemistLinks, userLinksToClinic, userLinksToPharmacy } from '../constants/sidebarLinks';

export const Sidebar = () => {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://localhost:8800/api/auth/authorize', { user: localStorage.getItem('user') }, { withCredentials: true });
        const data = response.data;
        switch (data.id_role) {
          case 1:
            setLinks(adminLinks);
            break;
          case 2:
            setLinks(userLinksToClinic);
            break;
          case 3:
            setLinks(doctorLinks);
            break;
          case 4:
            setLinks(chemistLinks);
            break;

          default:
            setLinks([]);
            break;
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://127.0.0.1:8800/api/auth/logout');
      localStorage.clear();
      navigate('/');
    } catch (err) {
      setErr(err.response.data);
    }
    console.log(err);
  };

  return (
    <div className='flex flex-col items-start bg-gradient-to-b from-indigo-500 to-violet-500 font-Montserrat h-auto'>
      <header className='py-10 flex flex-col justify-center items-center'>
        <h1 className='text-2xl text-white '>
          <Link to='/'>FarMMed</Link>
        </h1>
        <hr className='w-48 h-1 mx-14 mt-8 bg-gray-100 rounded' />
      </header>

      <main className='flex flex-col justify-center items-center mx-auto gap-y-2'>
        {links.map((item, index) => (
          <button className='text-center p-4 rounded-xl text-white font-bold' key={index}>
            <NavLink to={item.path} className={({ isActive }) => (isActive ? 'bg-white rounded-xl p-4 text-violet-900 font-bold' : undefined)}>
              {item.name}
            </NavLink>
          </button>
        ))}
      </main>

      <aside className='flex items-end pt-52 2xl:pt-[36rem]  mx-auto'>
        <button className='border rounded-xl border-white hover:shadow-xl p-4 text-white font-bold' onClick={handleSubmit}>
          Wyloguj się
        </button>
      </aside>
    </div>
  );
};
