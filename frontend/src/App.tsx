import React, { useEffect, useState } from 'react';
import './App.css';
import { Spinner } from '@material-tailwind/react';
import { NoUser, User, UserContext } from './types/UserTypes';
import AdminApp from './components/admin/AdminApp';
import HomePage from './components/home/HomePage';
import DriverApp from './components/driver/DriverApp';

function App() {
  const [user, setUser] = useState<User>(NoUser);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const conseguirUsuario = async () => {
      // const data = await conseguirUsurioLogeado();
      // setUser(data);
      // setLoading(false);
    };
    conseguirUsuario();
  }, []);

  let display;

  if (loading) {
    display = <Spinner />;
  } else if (user === NoUser) {
    display = <HomePage />;
  } else if (user.admin) {
    display = <AdminApp />;
  } else {
    display = <DriverApp />;
  }

  return <UserContext.Provider value={user}>{display}</UserContext.Provider>;
}

export default App;
