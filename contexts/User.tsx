import { createContext, Dispatch, SetStateAction } from 'react';

export type UserContextProps = {
  user: any;
  setUser?: Dispatch<SetStateAction<any>>;
};

export const UserContext = createContext<UserContextProps>({
  user: null,
});

export default UserContext.Provider;
