import { createContext } from 'react';

type User = {
  email: string;
  id: number;
  is_superuser: boolean;
};

type UserInfo = {
    email: string;
    password: string;
    name: string;
}

const NoUser: User = {
  id: -1,
  email: '',
  is_superuser: false
};

const UserContext = createContext<User>(NoUser);

export type { User, UserInfo };
export { NoUser, UserContext };
