import React, { useRef, useEffect} from "react";

import Header from "../components/Header"
import Forgot from "../components/Forgot";

export default function Forgot_password(){
	const refToElement = useRef(null);

		useEffect(() => {
	 	refToElement.current.scrollIntoView({ behavior: 'smooth' });
		}, []);
    return(
		
		<div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        	<div className="bg-ghostwithe bg-opacity-90 w-full max-w-2xl space-y-8 rounded-2xl" ref={refToElement}>
				<>
					<Header
						heading="Nie pamiętasz hasła?"
						paragraph="Jeśli na ten e-mail jest założone konto, to wyślemy na niego wiadomość. "
						linkName="Gmail"
						linkUrl="https://mail.google.com"
						/>
					<Forgot/>
				</>
			</div>
		</div>
    )
}