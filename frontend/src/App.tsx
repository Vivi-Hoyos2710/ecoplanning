import React, { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from '@material-tailwind/react';
import { NoUser, User, UserContext } from './types/UserTypes';
import AdminApp from './components/admin/AdminApp';
import HomeApp from './components/home/HomeApp';
import DriverApp from './components/driver/DriverApp';
import { getLoggedUser } from './services/AuthService';

function App() {
  const [user, setUser] = useState<User>(NoUser);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const conseguirUsuario = async () => {
      const data = await getLoggedUser();
      setUser(data);
      setLoading(false);
    };
    conseguirUsuario();
  }, []);

  let display;

  if (!loading) {
    if (user === NoUser) {
      display = <HomeApp />;
    } else if (user.is_superuser) {
      display = <AdminApp />;
    }else{
      display = <DriverApp />
    }
  } else {
    display = <Spinner />;
  }

  return <UserContext.Provider value={user}>{display}</UserContext.Provider>;
}

export default App;
