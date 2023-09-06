import { createContext } from 'react';

type User = {
  id: number;
  email: string;
  password: string;
  admin: boolean;
};

type GetUserRequest = {
  data: User;
};

const NoUser: User = {
  id: -1,
  email: '',
  password: '',
  admin: false
};

const UserContext = createContext<User>(NoUser);

export type { User, GetUserRequest };
export { NoUser, UserContext };
