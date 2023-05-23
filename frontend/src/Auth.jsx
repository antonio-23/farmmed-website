import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Pages
// Admin
import { Admin } from './pages/dashboard/admin/Admin';
import { Accounts } from './pages/dashboard/admin/Accounts';
import { Schedule } from './pages/dashboard/admin/Schedule';
import { Drugs } from './pages/dashboard/admin/Drugs';
import { AddUser } from './pages/dashboard/admin/AddUser';
// User
import { ProfileUser } from './pages/dashboard/user/ProfileUser';
import { FiguresUser } from './pages/dashboard/user/FiguresUser';
import { PrescriptionUser } from './pages/dashboard/user/PrescriptionUser';
import { VisitUser } from './pages/dashboard/user/VisitUser';
import { User } from './pages/dashboard/user/User';
import { EditDataUser } from './pages/dashboard/user/EditDataUser';
// Doctor
import { ScheduleDoctor } from './pages/dashboard/doctor/ScheduleDoctor';
import { ProfileDoctor } from './pages/dashboard/doctor/ProfileDoctor';
import { FiguresDoctor } from './pages/dashboard/doctor/FiguresDoctor';
import { PrescriptionDoctor } from './pages/dashboard/doctor/PrescriptionDoctor';
import { Doctor } from './pages/dashboard/doctor/Doctor';
import { EditDataDoctor } from './pages/dashboard/doctor/EditDataDoctor';
import { PrescriptionForm } from './pages/dashboard/doctor/PrescriptionForm';
// Chemist
import { ProfileChemist } from './pages/dashboard/chemist/ProfileChemist';
import { OrderChemist } from './pages/dashboard/chemist/OrderChemist';
import { DrugsChemist } from './pages/dashboard/chemist/DrugsChemist';
import { PrescriptionChemist } from './pages/dashboard/chemist/PrescriptionChemist';
import { Chemist } from './pages/dashboard/chemist/Chemist';
// Components
import Loader from './components/Loader';
import { EditPassword } from './components/EditPassword';
import { FiguresForm } from './pages/dashboard/doctor/FiguresForm';

function useAuth() {
  const [role, setRole] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem('user');
        if (!user) {
          setLoaded(true); // Ustawienie flagi loaded na true
          return;
        }
        const response = await axios.post('http://localhost:8800/api/auth/authorize', { user });
        const data = response.data;
        setRole(data.id_role);
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);

  return [role, loaded];
}

const auth = (id) =>{
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== id) {
    window.location.href = '/login';
    return null;
  }
}

export const AuthAdmin = () => {
  auth(1);
  return <Admin />;
};

export const AuthAddUser = () => {
  auth(1);
  return <AddUser />;
};

export const AuthAccounts = () => {
  auth(1);
  return <Accounts />;
};

export const AuthSchedule = () => {
  auth(1);
  return <Schedule />;
};

export const AuthDrugs = () => {
  auth(1);
  return <Drugs />;
};

export const AuthUser = () => {
  auth(2);
  return <User />;
};

export const AuthProfileUser = () => {
  auth(2);
  return <ProfileUser />;
};

export const AuthFiguresUser = () => {
  auth(2);
  return <FiguresUser />;
};

export const AuthPrescriptionUser = () => {
  auth(2);
  return <PrescriptionUser />;
};

export const AuthVisitUser = () => {
  auth(2);
  return <VisitUser />;
};

export const AuthEditDataUser = () => {
  auth(2);
  return <EditDataUser />;
};

export const AuthDoctor = () => {
  auth(3);
  return <Doctor />;
};

export const AuthProfileDoctor = () => {
  auth(3);
  return <ProfileDoctor />;
};

export const AuthFiguresDoctor = () => {
  auth(3);
  return <FiguresDoctor />;
};

export const AuthPrescriptionDoctor = () => {
  auth(3);
  return <PrescriptionDoctor />;
};

export const AuthScheduleDoctor = () => {
  auth(3);
  return <ScheduleDoctor />;
};

export const AuthEditDataDoctor = () => {
  auth(3);
  return <EditDataDoctor />;
};
export const AuthPrescriptionForm = () => {
  auth(3);
  return <PrescriptionForm />;
};

export const AuthFiguresForm = () => {
  auth(3);
  return <FiguresForm />;
};

export const AuthChemist = () => {
  auth(4);
  return <Chemist />;
};

export const AuthProfileChemist = () => {
  auth(4);
  return <ProfileChemist />;
};

export const AuthOrderChemist = () => {
  auth(4);
  return <OrderChemist />;
};

export const AuthDrugsChemist = () => {
  auth(4);
  return <DrugsChemist />;
};

export const AuthPrescriptionChemist = () => {
  auth(4);
  return <PrescriptionChemist />;
};

export const AuthEditPassword = () => {
  auth(4);
  return <EditPassword />;
};

