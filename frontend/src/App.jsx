import './App.css';
import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Pages
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Contact } from './pages/Contact';
import Register from './pages/Register';
import Log_in from './pages/Login';
import { OurLocation } from './pages/OurLocation';
import ForgotPassword from './pages/ForgotPassword';

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

//Auth
import {AuthAdmin, AuthAccounts, AuthChemist, AuthDoctor, AuthDrugs, AuthDrugsChemist, AuthFiguresDoctor, AuthFiguresUser, AuthOrderChemist, AuthPrescriptionChemist, AuthPrescriptionDoctor, AuthPrescriptionUser, AuthProfileChemist, AuthProfileDoctor, AuthProfileUser, AuthSchedule, AuthScheduleDoctor, AuthUser, AuthVisitUser } from './Auth'

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
      <Route path='admin' element={<AuthAdmin />}>
        <Route path='accounts' element={<AuthAccounts />} />
        <Route path='schedule' element={<AuthSchedule />} />
        <Route path='drugs' element={<AuthDrugs />} />
      </Route>
      <Route path='user' element={<AuthUser />}>
        <Route path='profileUser' element={<AuthProfileUser />} />
        <Route path='figuresUser' element={<AuthFiguresUser />} />
        <Route path='prescriptionUser' element={<AuthPrescriptionUser />} />
        <Route path='visitUser' element={<AuthVisitUser />} />
      </Route>
      <Route path='doctor' element={<AuthDoctor />}>
        <Route path='profileDoctor' element={<AuthProfileDoctor />} />
        <Route path='figuresDoctor' element={<AuthFiguresDoctor />} />
        <Route path='prescriptionDoctor' element={<AuthPrescriptionDoctor />} />
        <Route path='scheduleDoctor' element={<AuthScheduleDoctor />} />
      </Route>
      <Route path='chemist' element={<AuthChemist />}>
        <Route path='profileChemist' element={<AuthProfileChemist />} />
        <Route path='orderChemist' element={<AuthOrderChemist />} />
        <Route path='drugsChemist' element={<AuthDrugsChemist />} />
        <Route path='prescriptionChemist' element={<AuthPrescriptionChemist />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
