import { createContext, Dispatch, SetStateAction } from 'react';

export type UserObject = {
  username: string;
};

export interface UserContextProps {
  user: UserObject;
  setUser: Dispatch<SetStateAction<UserObject>>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);

export default UserContext.Provider;
