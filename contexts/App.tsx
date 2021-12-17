import { createContext, Dispatch, SetStateAction } from 'react';

export interface ContextProps {
  sidebarVisible: boolean;
  setSidebarVisible: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<ContextProps>({} as ContextProps);

export default AppContext.Provider;
