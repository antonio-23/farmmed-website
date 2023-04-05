import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navigation = [
	{ name: "O nas", path: "/about" },
	{ name: "Lokalizacje", path: "/ourlocation" },
	{ name: "Kontakt", path: "/contact" },
];

const Navbar = () => {
	return (
		<div className="navbar bg-[#eef2ff]">
			<header className=" py-5 px-20 grid grid-cols-3 justify-center text-lg items-baseline">
				<div className="flex justify-start">
					<img className="h-6 flex " src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
					<span>
						<NavLink to="/">FarMMed</NavLink>
					</span>
				</div>
				<div className="flex justify-center gap-x-10">
					{" "}
					{navigation.map((item) => (
						<a className="text-md  text-[#374151]">
							<NavLink to={item.path}>{item.name}</NavLink>
						</a>
					))}
				</div>
				<div className="flex justify-end gap-3">
					<a className="text-violet-600 px-4 py-2 border-2 rounded-md border-violet-600">
						<NavLink to="register">Dołącz do nas</NavLink>
					</a>
					<a className="bg-violet-600 text-white  px-6 py-2  rounded-md">
						<NavLink to="login">Logowanie</NavLink>
					</a>
				</div>
			</header>

			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Navbar;
