import { createContext, Dispatch, SetStateAction } from 'react';

export type PodFile = {
  access_time: string;
  block_size: string;
  content_type: string;
  creation_time: string;
  modification_time: string;
  name: string;
  size: string;
};

export interface FilesContextProps {
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
}

export const FilesContext = createContext<FilesContextProps>(
  {} as FilesContextProps
);

export default FilesContext.Provider;
