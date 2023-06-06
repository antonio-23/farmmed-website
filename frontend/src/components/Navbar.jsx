import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link, animateScroll as scroll } from 'react-scroll';

const Navbar = () => {
  const [navigation, setNavigation] = useState([
    { name: 'O nas', path: '/about', id: 'about' },
    { name: 'Lokalizacje', path: '/ourlocation', id: 'ourlocation' },
    { name: 'Opinie', path: '/contact', id: 'contact' },
  ]);

  const [btnNavigation, setBtnNavigation] = useState([
    { name: 'Dołącz do nas', path: '/register' },
    { name: 'Logowanie', path: '/login' },
  ]);

  const [nav, setNav] = useState(false);

  const closeNav = () => setNav(false);

  const handleNav = () => {
    setNav(!nav);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setNav(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='bg-gradient-to-tr from-blue-100 via-white-100 to-pink-100 h-screen font-Montserrat'>
      <div className='flex justify-between items-center h-24 max-w-7xl mx-auto px-4'>
        <h1 className='w-md text-2xl'>
          <NavLink to='/'>FarMMed</NavLink>
        </h1>
        <div className='hidden lg:flex whitespace-nowrap'>
          {navigation.map((item, index) => (
            <button className='p-4 hover:text-violet-600 text-lg font-medium cursor-pointer' key={item.path}>
              <Link key={index} to={item.id} smooth={true} offset={50} duration={800}>
                {item.name}
              </Link>
            </button>
          ))}
        </div>
        <div className='hidden lg:flex gap-4 whitespace-nowrap'>
          {btnNavigation.map((item, index) => (
            <button
              key={index}
              className={
                index === 0
                  ? 'text-violet-600 px-4 py-2 border rounded-md border-violet-600 flex flex-wrap hover:text-violet-700'
                  : ' bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-md flex flex-wrap'
              }
            >
              <NavLink to={item.path} key={index}>
                {item.name}
              </NavLink>
            </button>
          ))}
        </div>

        <div onClick={handleNav} className='block lg:hidden'>
          {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div className={nav ? 'fixed bg-white left-0 top-0 w-[60%] h-full ease-in-out duration-500 z-10' : 'fixed left-[-100%]'}>
          <h1 className='w-full m-4 text-2xl'>
            <NavLink to='/'>FarMMed</NavLink>
          </h1>
          <ul className='pt-4'>
            {navigation.map((item, index) => (
              <li className='p-4 border-b border-gray-200 hover:text-violet-600 text-lg cursor-pointer' key={item.path}>
                <Link key={index} to={item.id} smooth={true} offset={50} duration={800} onClick={closeNav}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className='flex items-start p-4 justify-center gap-5'>
            {btnNavigation.map((item, index) => (
              <button
                key={index}
                className={index === 0 ? 'text-violet-600 px-8 py-3 border rounded-md border-violet-600  hover:text-violet-700' : 'bg-violet-600 text-white px-8 py-3 rounded-md hover:bg-violet-700'}
              >
                <NavLink key={index} to={item.path} onClick={closeNav}>
                  {item.name}
                </NavLink>
              </button>
            ))}
          </div>
        </div>
      </div>
      <main className='bg-gradient-to-tr from-blue-100 via-white-100 to-pink-100'>
        <Outlet />
      </main>
    </div>
  );
};

export default Navbar;
