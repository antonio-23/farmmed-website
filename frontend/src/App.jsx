import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

// Pages
import { Home } from './pages/Home';
import Register from './pages/Register';
import Log_in from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import { NotFound } from './pages/NotFound';

// Components
import Navbar from './components/Navbar';

//Auth
import {
  AuthAdmin,
  AuthAddUser,
  AuthAccounts,
  AuthChemist,
  AuthDoctor,
  AuthDrugs,
  AuthDrugsChemist,
  AuthFiguresDoctor,
  AuthFiguresUser,
  AuthOrderChemist,
  AuthPrescriptionChemist,
  AuthPrescriptionDoctor,
  AuthPrescriptionUser,
  AuthProfileChemist,
  AuthProfileDoctor,
  AuthProfileUser,
  AuthSchedule,
  AuthScheduleDoctor,
  AuthUser,
  AuthVisitUser,
  AuthEditDataDoctor,
  AuthEditDataUser,
  AuthEditPassword,
  AuthPrescriptionForm,
  AuthFiguresForm,
  AuthEditDataChemist,
  AuthPrescriptionChemistForm,
  AuthOrderRealization,
  AuthOrderPickUp,
} from './Auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Home />} />
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Log_in />} />
        <Route path='forgot_password' element={<ForgotPassword />} />
      </Route>

      <Route path='admin' element={<AuthAdmin />}>
        <Route path='accounts' element={<AuthAccounts />} />
        <Route path='schedule' element={<AuthSchedule />} />
        <Route path='drugs' element={<AuthDrugs />} />
        <Route path='addUser' element={<AuthAddUser />} />
        <Route path='editPassword' element={<AuthEditPassword />} />
      </Route>

      <Route path='user' element={<AuthUser />}>
        <Route path='profileUser' element={<AuthProfileUser />} />
        <Route path='figuresUser' element={<AuthFiguresUser />} />
        <Route path='prescriptionUser' element={<AuthPrescriptionUser />} />
        <Route path='visitUser' element={<AuthVisitUser />} />
        <Route path='editDataUser' element={<AuthEditDataUser />} />
        <Route path='editDataUser/editPassword' element={<AuthEditPassword />} />
      </Route>

      <Route path='doctor' element={<AuthDoctor />}>
        <Route path='profileDoctor' element={<AuthProfileDoctor />} />
        <Route path='figuresDoctor' element={<AuthFiguresDoctor />} />
        <Route path='prescriptionDoctor' element={<AuthPrescriptionDoctor />} />
        <Route path='scheduleDoctor' element={<AuthScheduleDoctor />} />
        <Route path='editDataDoctor' element={<AuthEditDataDoctor />} />
        <Route path='editDataDoctor' element={<AuthEditDataDoctor />} />
        <Route path='editDataDoctor/editPassword' element={<AuthEditPassword />} />
        <Route path='prescriptionDoctor/prescriptionForm' element={<AuthPrescriptionForm />} />
        <Route path='figuresDoctor/figuresForm' element={<AuthFiguresForm />} />
      </Route>

      <Route path='chemist' element={<AuthChemist />}>
        <Route path='profileChemist' element={<AuthProfileChemist />} />
        <Route path='orderChemist' element={<AuthOrderChemist />} />
        <Route path='drugsChemist' element={<AuthDrugsChemist />} />
        <Route path='prescriptionChemist' element={<AuthPrescriptionChemist />} />
        <Route path='editPassword' element={<AuthEditPassword />} />
        <Route path='editDataChemist' element={<AuthEditDataChemist />} />
        <Route path='editDataChemist/editPassword' element={<AuthEditPassword />} />
        <Route path='prescriptionChemist/prescriptionChemistForm' element={<AuthPrescriptionChemistForm />} />
        <Route path='orderChemist/orderRealization' element={<AuthOrderRealization />} />
        <Route path='orderChemist/orderPickUp' element={<AuthOrderPickUp />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
