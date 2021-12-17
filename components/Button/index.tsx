import { FunctionComponent, ReactNode } from 'react';
// import ChevronDown from 'assets/icons/chevron-down.svg';

type ButtonTypes = 'button' | 'submit' | 'reset';

type Props = {
  type?: ButtonTypes;
  children: ReactNode;
  symbol?: FunctionComponent;
  className?: string;
};

const Button = ({
  children,
  className = '',
  type = 'button',
  symbol: Symbol,
}: Props) => {
  return (
    <button
      type={type}
      className={[
        className,
        'bg-blue border-blue border-2 rounded-lg',
        'py-2.5 px-4 flex items-center justify-between text-purple',
        'text-left hover:bg-indigo-100 focus:bg-indigo-200',
      ].join(' ')}
    >
      <span>{children}</span>
      {Symbol && <Symbol />}
    </button>
  );
};

export default Button;
