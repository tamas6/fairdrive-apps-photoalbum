import { createContext, Dispatch, SetStateAction } from 'react';

export interface PodItem {
  title: string;
  slug?: string;
}

export interface PodsContextProps {
  pods: PodItem[];
  setPods: Dispatch<SetStateAction<PodItem[]>>;
}

export const PodsContext = createContext<PodsContextProps>(
  {} as PodsContextProps
);

export default PodsContext.Provider;
