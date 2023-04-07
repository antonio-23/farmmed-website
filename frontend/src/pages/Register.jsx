import React, {useRef, useEffect, useState} from "react";
/*
export const Register = () => {
	const scroll = useRef(null);

	useEffect(() => {
	scroll.current.scrollIntoView({ behavior: 'smooth' });
	}, []);

	return (
		<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-ghostwithe bg-opacity-90 w-full max-w-2xl space-y-8 rounded-2xl">
          <div>
            <h2 className="mt-10 text-left ml-20 text-3xl font-bold tracking-tight text-gray-900">
              Załóż bazpłatne konto
            </h2>
          </div>
		<form className="mt-10 ml-20 mr-20 mb-10 space-y-6" action="#" method="POST">
		<input type="hidden" name="remember" defaultValue="true" />
		<div className="space-y-4 rounded-md shadow-xl">
			<label htmlFor="name" className="sr-only">
			Imię
			</label>
			<input
			id="name"
			name="name"
			type="text"
			autoComplete="name"
			required
			className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Imię"
			/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl">
			<label htmlFor="last_name" className="sr-only">
			Nazwisko
			</label>
			<input
			id="last_name"
			name="last_name"
			type="name"
			autoComplete="name"
			required
			className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Nazwisko"
			/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl">
			<label htmlFor="date_of_birth" className="sr-only">
			Data urodzenia
			</label>
			<input
			id="date_of_birth"
			name="date"
			type="date_of_birth"
			autoComplete="date_of_birth"
			required
			className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Data urodzenia"
			/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl">
			<label htmlFor="PESEL" className="sr-only">
			PESEL
			</label>
			<input
			id="PESEL"
			name="PESEL"
			type="number"
			autoComplete="PESEL"
			required
			className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="PESEL"
			/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl">
		<label htmlFor="email-address" className="sr-only">
		  Address Email
		</label>
		<input
		  id="email-address"
		  name="email"
		  type="email"
		  autoComplete="email"
		  required
		  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Email"
		/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl">
		<label htmlFor="repeat-email-address" className="sr-only">
		  Address Email
		</label>
		<input
		  id="email-address"
		  name="email"
		  type="repeat_mail"
		  autoComplete="email"
		  required
		  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Powtórz Email"
		/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl">
		<label htmlFor="password" className="sr-only">
		  HASŁO
		</label>
		<input
		  id="password"
		  name="password"
		  type="password"
		  autoComplete="current-password"
		  required
		  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Hasło"
		/>
		</div>
		<div className="space-y-4 rounded-md shadow-xl"ref={scroll}>
		<label htmlFor="repeat-password" className="sr-only">
		  HASŁO
		</label>
		<input
		  id="password"
		  name="repeat_password"
		  type="password"
		  autoComplete="current-password"
		  required
		  className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-6"		  placeholder="Powtórz hasło"
		/>
		</div>
		<div className="w-40 mx-auto" ref={scroll}>
		<button
			type="submit"
			className="group relative mx-auto flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
		>
		Zarejestruj się
	  </button>
		</div>
		<div className="mx-auto text-center pb-10">
		Masz już konto? 
			<a href="/login" className="pl-1 font-medium text-indigo-600 hover:text-indigo-500">
			Zaloguj się
			</a>
		</div>
		</form>
		</div>
		</div>
)};*/
import Header from "../components/Header";
import Signup from "../components/Signup";

export default function Register(){
	const refToElement = useRef(null);

		useEffect(() => {
	 	refToElement.current.scrollIntoView({ behavior: 'smooth' });
		}, []);
    return(
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        	<div className="bg-ghostwithe bg-opacity-90 w-full max-w-2xl space-y-8 rounded-2xl" ref={refToElement}>
				<Header
				heading="Załóż bazpłatne konto"
				paragraph="Posiadasz już konto? "
				linkName="Zaloguj sie"
				linkUrl="/login"
				/>
				<Signup/>
        	</div>
		</div>
    )
}