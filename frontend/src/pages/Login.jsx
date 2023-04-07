import React, { useRef, useEffect} from "react";
/*
export const Login = () => {
	const refToElement = useRef(null);

	useEffect(() => {
	  refToElement.current.scrollIntoView({ behavior: 'smooth' });
	}, []);
	return(
	<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-ghostwithe bg-opacity-90 w-full max-w-2xl space-y-8 rounded-2xl">
          <div>
            <h2 className="mt-10 text-left ml-20 text-3xl font-bold tracking-tight text-gray-900">
              Zaloguj się
            </h2>
          </div>
	<form className="mt-10 ml-20 mr-20 mb-10 space-y-6" action="#" method="POST">
	<input type="hidden" name="remember" defaultValue="true" />
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

	<div className="flex items-center justify-between">
	  <div className="text-sm">
		<a href="/forgot_password" className="font-medium text-indigo-600 hover:text-indigo-500">
		  Przypomij hasło
		</a>
	  </div>
	</div>

	<div className="w-40 mx-auto" ref={refToElement}>
	  <button
		type="submit"
		className="group relative mx-auto flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
	  >
		Zaloguj się
	  </button>
	</div>
	<div className="mx-auto text-center pb-10">
	Nie masz konta?  
		<a href="/register" className="pl-1 font-medium text-indigo-600 hover:text-indigo-500">
		  Zarejstruj się
		</a>
	</div>
  </form>
  </div>
  </div>
)};*/

import Header from "../components/Header"
import Login from "../components/Login"

export default function Log_in(){
	const refToElement = useRef(null);

		useEffect(() => {
	 	refToElement.current.scrollIntoView({ behavior: 'smooth' });
		}, []);
    return(
		
		<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        	<div className="bg-ghostwithe bg-opacity-90 w-full max-w-2xl space-y-8 rounded-2xl" ref={refToElement}>
				<>
					<Header
						heading="Zaloguj się"
						paragraph="Nie masz konta? "
						linkName="Zrejestruj się"
						linkUrl="/register"
						/>
					<Login/>
				</>
			</div>
		</div>
    )
}
