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
// Chemist
import { ProfileChemist } from './pages/dashboard/chemist/ProfileChemist';
import { OrderChemist } from './pages/dashboard/chemist/OrderChemist';
import { DrugsChemist } from './pages/dashboard/chemist/DrugsChemist';
import { PrescriptionChemist } from './pages/dashboard/chemist/PrescriptionChemist';
import { Chemist } from './pages/dashboard/chemist/Chemist';
// Components
import Loader from './components/Loader';
import { EditPassword } from './components/EditPassword';



function useAuth() {
  const [id, setID] = useState(null);
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
        console.log(data);
        localStorage.clear();
        setID(data.user)
        setRole(data.id_role);
      } catch (error) {
        console.error(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, [navigate]);

  return [id, role, loaded];
}

export const AuthAdmin = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
  localStorage.setItem('user', id);
  return <Admin />;
};

export const AuthAddUser = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <AddUser />;
};

export const AuthAccounts = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <Accounts />;
};

export const AuthSchedule = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <Schedule />;
};

export const AuthDrugs = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 1) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <Drugs />;
};

export const AuthUser = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <User />;
};

export const AuthProfileUser = () => {
  const [id, role, loaded] = useAuth();

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
  const [id, role, loaded] = useAuth();

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
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <PrescriptionUser />;
};

export const AuthVisitUser = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <VisitUser />;
};

export const AuthEditDataUser = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) return <Loader />;

  if (role !== 2) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <EditDataUser />;
};

export const AuthDoctor = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <Doctor />;
};

export const AuthProfileDoctor = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <ProfileDoctor />;
};

export const AuthFiguresDoctor = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }
  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <FiguresDoctor />;
};

export const AuthPrescriptionDoctor = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <PrescriptionDoctor />;
};

export const AuthScheduleDoctor = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <ScheduleDoctor />;
};

export const AuthEditDataDoctor = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) return <Loader />;

  if (role !== 3) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <EditDataDoctor />;
};

export const AuthChemist = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <Chemist />;
};

export const AuthProfileChemist = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <ProfileChemist />;
};

export const AuthOrderChemist = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <OrderChemist />;
};

export const AuthDrugsChemist = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <DrugsChemist />;
};

export const AuthPrescriptionChemist = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role !== 4) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <PrescriptionChemist />;
};

export const AuthEditPassword = () => {
  const [id, role, loaded] = useAuth();

  if (!loaded) {
    return <Loader />;
  }

  if (role === null) {
    const navigate = useNavigate();
    navigate('/login');
    return;
  }
localStorage.setItem('user', id);
  return <EditPassword />;
};
