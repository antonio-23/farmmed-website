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
          navigate('/login');
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
  }, [navigate]);

  return [role, loaded];
}

export const AuthAdmin = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <Admin />;
};

export const AuthAddUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <AddUser />;
};

export const AuthAccounts = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <Accounts />;
};

export const AuthSchedule = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <Schedule />;
};

export const AuthDrugs = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <Drugs />;
};

export const AuthUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <User />;
};

export const AuthProfileUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <ProfileUser />;
};

export const AuthFiguresUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <FiguresUser />;
};

export const AuthPrescriptionUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <PrescriptionUser />;
};

export const AuthVisitUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <VisitUser />;
};

export const AuthEditDataUser = () => {
  const [role, loaded] = useAuth();

  if (!loaded) return <Loader />;

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <EditDataUser />;
};

export const AuthDoctor = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <Doctor />;
};

export const AuthProfileDoctor = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <ProfileDoctor />;
};

export const AuthFiguresDoctor = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }
  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <FiguresDoctor />;
};

export const AuthPrescriptionDoctor = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <PrescriptionDoctor />;
};

export const AuthScheduleDoctor = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <ScheduleDoctor />;
};

export const AuthEditDataDoctor = () => {
  const [role, loaded] = useAuth();

  if (!loaded) return <Loader />;

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <EditDataDoctor />;
};
export const AuthPrescriptionForm = () => {
  const [role, loaded] = useAuth();

  if (!loaded) return <Loader />;

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <PrescriptionForm />;
};

export const AuthFiguresForm = () => {
  const [role, loaded] = useAuth();

  if (!loaded) return <Loader />;

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <FiguresForm />;
};

export const AuthChemist = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <Chemist />;
};

export const AuthProfileChemist = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <ProfileChemist />;
};

export const AuthOrderChemist = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <OrderChemist />;
};

export const AuthDrugsChemist = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <DrugsChemist />;
};

export const AuthPrescriptionChemist = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <PrescriptionChemist />;
};

export const AuthEditPassword = () => {
  const [role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role === null) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }

  return <EditPassword />;
};

