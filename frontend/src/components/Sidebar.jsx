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
    <div className='font-Montserrat w-[350px] bg-gradient-to-b from-indigo-500  to-violet-500 h-screen '>
      <div className='pt-10'>
        <h1 className='w-md text-2xl text-white pl-24'>
          <Link to='/'>FarMMed</Link>
        </h1>
        <hr className='w-48 h-1 mx-14 my-5 bg-gray-100 rounded md:my-10' />
      </div>
      <div className='flex flex-col mr-12'>
        {links.map((item, index) => (
          <button className='text-center p-4  rounded-xl text-white font-bold' key={index}>
            <NavLink to={item.path} className={({ isActive }) => (isActive ? 'bg-white rounded-xl p-4 text-violet-900 font-bold' : undefined)}>
              {item.name}
            </NavLink>
          </button>
        ))}
      </div>
      <div className='absolute bottom-14 left-0 pl-20'>
        <button className='border rounded-xl border-white hover:shadow-xl p-4 text-white font-bold text-' onClick={handleSubmit}>
          Wyloguj się
        </button>
      </div>
    </div>
  );
};
