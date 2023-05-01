import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//Pages
import { Admin } from './pages/dashboard/admin/Admin';
import { Accounts } from './pages/dashboard/admin/Accounts';
import { Schedule } from './pages/dashboard/admin/Schedule';
import { Drugs } from './pages/dashboard/admin/Drugs';

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
import Loader from './components/Loader';

// import { ProfileChemist, PrescriptionChemist, OrderChemist, DrugsChemist, Chemist } from './pages/dashboard/chemist';
// import { Doctor, FiguresDoctor, PrescriptionDoctor, ProfileDoctor, ScheduleDoctor } from './pages/dashboard/doctor';
// import { FiguresUser, PrescriptionUser, ProfileUser, User, VisitUser } from './pages/dashboard/user';

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
      }
  
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
    navigate("/login")
      return null;
    }
  
    return <Admin />;
  }

export const AuthAccounts = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 1) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <Accounts />;
}

export const AuthSchedule = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 1) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <Schedule />;
}

export const AuthDrugs = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 1) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <Drugs />;
}

export const AuthUser = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 2) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <User />;
}

export const AuthProfileUser = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 2) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <ProfileUser />;
}

export const AuthFiguresUser = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 2) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <FiguresUser />;
}

export const AuthPrescriptionUser = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 2) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <PrescriptionUser />;
}

export const AuthVisitUser = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 2) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <VisitUser />;
}

export const AuthDoctor = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 3) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <Doctor />;
}

export const AuthProfileDoctor = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 3) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <ProfileDoctor />;
}

export const AuthFiguresDoctor = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader />
    }  
    if (role !== 3) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <FiguresDoctor />;
}

export const AuthPrescriptionDoctor = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 3) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <PrescriptionDoctor />;
}

export const AuthScheduleDoctor = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 3) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <ScheduleDoctor />;
}

export const AuthChemist = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 4) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <Chemist />;
}

export const AuthProfileChemist = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 4) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <ProfileChemist />;
}

export const AuthOrderChemist = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 4) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <OrderChemist />;
}

export const AuthDrugsChemist = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 4) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <DrugsChemist />;
}

export const AuthPrescriptionChemist = () => {
    const [role, loaded] = useAuth();
  
    if (!loaded) {
      return <Loader /> 
    } 
  
    if (role !== 4) {
          const navigate = useNavigate();
    navigate("/login")
      return null;
    }
  
    return <PrescriptionChemist />;
}

function not_auth() {
    const navigate = useNavigate();
    navigate("/login")
}