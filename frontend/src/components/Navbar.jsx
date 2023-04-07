import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
	{ name: "O nas", path: "/about" },
	{ name: "Lokalizacje", path: "/ourlocation" },
	{ name: "Kontakt", path: "/contact" },
];

const btnNavigation = [
	{ name: "Dołącz do nas", path: "/register" },
	{ name: "Logowanie", path: "/login" },
];

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<div className="navbar bg-[#eef2ff]">
			<header className="py-5 px-20 grid grid-cols-3 justify-center text-md items-baseline">
				<div className="flex justify-start">
					<img className="h-6 flex " src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
					<span>
						<NavLink to="/">FarMMed</NavLink>
					</span>
				</div>
				<div className="hidden lg:flex justify-center gap-x-10">
					{navigation.map((item) => (
						<a className="text-md text-[#374151]" key={item.path}>
							<NavLink to={item.path}>{item.name}</NavLink>
						</a>
					))}
				</div>
				<div className="flex justify-end gap-3 items-center">
					<a className="hidden text-violet-600 px-4 py-2 border-2 rounded-md border-violet-600 lg:inline-block">
						<NavLink to="register">Dołącz do nas</NavLink>
					</a>
					<a className="hidden bg-violet-600 text-white px-6 py-2 rounded-md lg:inline-block">
						<NavLink to="login">Logowanie</NavLink>
					</a>
				</div>
				<div class="flex justify-end">
					<button class="lg:hidden" onClick={toggleMenu}>
						<svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>

			</header>
			<div className={`${menuOpen ? "block" : "hidden"} lg:hidden`}>
				{navigation.map((item) => (
					<a className="block px-4 py-2 text-[#374151]" key={item.path}>
						<NavLink to={item.path} onClick={toggleMenu}>
							{item.name}
						</NavLink>
					</a>
				))}
				{btnNavigation.map((item, index) => (
                        <button key={index} className={index === 0 ? "text-violet-600 px-4 py-2 border-2 rounded-md border-violet-600 flex flex-wrap" : "bg-violet-600 text-white px-6 py-2 rounded-md flex flex-wrap"}>
                            <NavLink to={item.path} onClick={toggleMenu}>{item.name}</NavLink>
                        </button>
                    ))}
			</div>
			<main>
				<div className="bg-gradient-to-r from-blue-100 via-white-100 to-pink-100 h-screen">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default Navbar;
