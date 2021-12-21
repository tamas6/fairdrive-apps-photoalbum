import { createContext, Dispatch, SetStateAction } from 'react';

export type PodDir = {
  access_time: string;
  content_type: string;
  creation_time: string;
  modification_time: string;
  name: string;
};

export interface DirsContextProps {
  dirs: PodDir[];
  setDirs: Dispatch<SetStateAction<PodDir[]>>;
}

export const DirsContext = createContext<DirsContextProps>(
  {} as DirsContextProps
);

export default DirsContext.Provider;
