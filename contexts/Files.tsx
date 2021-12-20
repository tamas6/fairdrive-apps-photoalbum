import { createContext, Dispatch, SetStateAction } from 'react';

export interface FilesContextProps {
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
}

export const FilesContext = createContext<FilesContextProps>(
  {} as FilesContextProps
);

export default FilesContext.Provider;
