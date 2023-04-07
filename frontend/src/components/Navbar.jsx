import React, { useState, useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const navigation = [
	{ name: 'O nas', path: '/about' },
	{ name: 'Lokalizacje', path: '/ourlocation' },
	{ name: 'Kontakt', path: '/contact' },
];

const btnNavigation = [
	{ name: 'Dołącz do nas', path: '/register' },
	{ name: 'Logowanie', path: '/login' },
];

const Navbar = () => {
	const [nav, setNav] = useState(false);

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
		<header className='bg-gradient-to-tr from-blue-100 via-white-100 to-pink-100 h-screen font-Montserrat'>
			<div className='flex justify-between items-center h-24 max-w-7xl mx-auto px-4'>
				<h1 className='w-md text-2xl'>
					<NavLink to='/'>FarMMed</NavLink>
				</h1>
				<ul className='hidden lg:flex whitespace-nowrap'>
					{navigation.map((item) => (
						<li className='p-4 hover:text-purple-600 text-lg' key={item.path}>
							<NavLink to={item.path}>{item.name}</NavLink>
						</li>
					))}
				</ul>
				<div className='hidden lg:flex gap-4 whitespace-nowrap'>
					{btnNavigation.map((item, index) => (
						<a
							className={
								index === 0
									? 'text-purple-600 px-4 py-2 border rounded-md border-purple-600 flex flex-wrap hover:bg-purple-200 hover:text-purple-700'
									: ' bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md flex flex-wrap'
							}
						>
							<NavLink to={item.path}>{item.name}</NavLink>
						</a>
					))}
				</div>
				<div onClick={handleNav} className='block lg:hidden'>
					{nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
				</div>
				<div className={nav ? 'fixed bg-white left-0 top-0 w-[60%] h-full ease-in-out duration-500' : 'fixed left-[-100%]'}>
					<h1 className='w-full m-4 text-2xl'>
						<NavLink to='/'>FarMMed</NavLink>
					</h1>
					<ul className='pt-4'>
						{navigation.map((item) => (
							<li className='p-4 border-b border-gray-200 hover:text-purple-600 text-lg' key={item.path}>
								<NavLink to={item.path}>{item.name}</NavLink>
							</li>
						))}
					</ul>
					<div className='flex items-start p-4 justify-center gap-5'>
						{btnNavigation.map((item, index) => (
							<a
								className={
									index === 0 ? 'text-purple-600 px-8 py-3 border rounded-md border-purple-600 hover:bg-purple-200 hover:text-purple-700' : 'bg-purple-600 text-white px-8 py-3 rounded-md hover:bg-purple-700'
								}
							>
								<NavLink to={item.path}>{item.name}</NavLink>
							</a>
						))}
					</div>
				</div>
			</div>
			<main className='bg-gradient-to-tr from-blue-100 via-white-100 to-pink-100 h-screen'>
				<Outlet />
			</main>
		</header>
	);
};

export default Navbar;
