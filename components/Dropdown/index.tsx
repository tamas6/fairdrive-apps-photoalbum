import { ReactNode } from 'react';
import ChevronDown from 'assets/chevron-down.svg';

type Props = {
  children: ReactNode;
};

const Dropdown = ({ children }: Props) => {
  return (
    <button className="w-44 text-xs flex items-center justify-between text-purple bg-white rounded-md px-2.5 py-2.5 text-left">
      <span>{children}</span>
      <ChevronDown className="float-right mr-1" />
    </button>
  );
};

export default Dropdown;
