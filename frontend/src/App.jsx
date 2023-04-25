import './App.css';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
// Pages
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import Register from './pages/Register';
import Log_in from './pages/Login';
import { OurLocation } from './pages/OurLocation';
import ForgotPassword from './pages/ForgotPassword';
import { Admin } from './pages/dashboard/admin/Admin';
import { Accounts } from './pages/dashboard/admin/Accounts';
import { Schedule } from './pages/dashboard/admin/Schedule';
import { Drugs } from './pages/dashboard/admin/Drugs';

// import { ProfileChemist, PrescriptionChemist, OrderChemist, DrugsChemist, Chemist } from './pages/dashboard/chemist';
// import { Doctor, FiguresDoctor, PrescriptionDoctor, ProfileDoctor, ScheduleDoctor } from './pages/dashboard/doctor';
// import { FiguresUser, PrescriptionUser, ProfileUser, User, VisitUser } from './pages/dashboard/user';

// Components
import Navbar from './components/Navbar';
import { NotFound } from './pages/NotFound';
import { ProfileUser } from './pages/dashboard/user/ProfileUser';
import { FiguresUser } from './pages/dashboard/user/FiguresUser';
import { PrescriptionUser } from './pages/dashboard/user/PrescriptionUser';
import { VisitUser } from './pages/dashboard/user/VisitUser';
import { ScheduleDoctor } from './pages/dashboard/doctor/ScheduleDoctor';
import { ProfileDoctor } from './pages/dashboard/doctor/ProfileDoctor';
import { FiguresDoctor } from './pages/dashboard/doctor/FiguresDoctor';
import { PrescriptionDoctor } from './pages/dashboard/doctor/PrescriptionDoctor';
import { ProfileChemist } from './pages/dashboard/chemist/ProfileChemist';
import { OrderChemist } from './pages/dashboard/chemist/OrderChemist';
import { DrugsChemist } from './pages/dashboard/chemist/DrugsChemist';
import { PrescriptionChemist } from './pages/dashboard/chemist/PrescriptionChemist';
import { User } from './pages/dashboard/user/User';

function Auth() {
  const [role, setRole] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://localhost:8800/api/auth/authorize', { user: localStorage.getItem('user') }, { withCredentials: true });
        const data = response.data;
        setRole(data.id_role);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  switch (role) {
    case 1:
      return <Admin />;
      break;
    case 2:
      return <User />;
      break;
    case 3:
      return <Doctor />;
      break;
    case 4:
      return <Chemist />;
      break;

    default:
      return <NotFound />;
      break;
  }
  // if (role === 1) {
  //   return <Admin />;
  // } else {
  //   return <NotFound />;
  // }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} />
			<Route path="ourlocation" element={<OurLocation />} />
			<Route path="contact" element={<Contact />} /> */}
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Log_in />} />
        <Route path='forgot_password' element={<ForgotPassword />} />
      </Route>
      <Route path='admin' element={<Auth />}>
        <Route path='accounts' element={<Accounts />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='drugs' element={<Drugs />} />
      </Route>
      <Route path='user' element={<Auth />}>
        <Route path='profileUser' element={<ProfileUser />} />
        <Route path='figuresUser' element={<FiguresUser />} />
        <Route path='prescriptionUser' element={<PrescriptionUser />} />
        <Route path='visitUser' element={<VisitUser />} />
      </Route>
      <Route path='doctor' element={<Auth />}>
        <Route path='profileDoctor' element={<ProfileDoctor />} />
        <Route path='figuresDoctor' element={<FiguresDoctor />} />
        <Route path='prescriptionDoctor' element={<PrescriptionDoctor />} />
        <Route path='scheduleDoctor' element={<ScheduleDoctor />} />
      </Route>
      <Route path='chemist' element={<Auth />}>
        <Route path='profileChemist' element={<ProfileChemist />} />
        <Route path='orderChemist' element={<OrderChemist />} />
        <Route path='drugsChemist' element={<DrugsChemist />} />
        <Route path='prescriptionChemist' element={<PrescriptionChemist />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
