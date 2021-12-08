import { createContext, Dispatch, SetStateAction } from 'react';

export type ContextProps = {
  theme: string;
  setTheme?: Dispatch<SetStateAction<string>>;
};

export const AppContext = createContext<ContextProps>({
  theme: 'dark',
});

export default AppContext.Provider;
