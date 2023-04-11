import React, {useRef, useEffect, useState} from "react";

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