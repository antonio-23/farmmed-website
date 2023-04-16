import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from "react-router-dom";

// Pages
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import Register from "./pages/Register";
import Log_in from "./pages/Login";
import { OurLocation } from "./pages/OurLocation";
import ForgotPassword from "./pages/ForgotPassword";
import { Admin } from './pages/dashboard/Admin';
import { Accounts } from './pages/dashboard/Accounts';
import { Schedule } from './pages/dashboard/Schedule';
import { Drugs } from './pages/dashboard/Drugs';

// Components
import Navbar from "./components/Navbar";
import { NotFound } from './pages/NotFound';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
		<Route path="/" element={<Navbar />}>
			<Route index element={<Home />} />
			{/* <Route path="about" element={<About />} />
			<Route path="ourlocation" element={<OurLocation />} />
			<Route path="contact" element={<Contact />} /> */}
			<Route path="register" element={<Register />} />
			<Route path="login" element={<Log_in />} />
			<Route path="forgot_password" element={<ForgotPassword/>}/>
		</Route>
		<Route path='admin/:id/' element={<Admin/>}>
			<Route path='accounts' element={<Accounts />}/>
			<Route path='accounts' element={<Schedule />}/>
			<Route path='accounts' element={<Drugs />}/>
		</Route>
		
		<Route path='*' element={<NotFound />} />
		</>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
