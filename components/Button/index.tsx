import { ReactElement, ReactNode } from 'react';

type RadiusTypes = 'default' | 'simple';

export type StyleTypes = 'outset' | 'inset' | 'simple';

type ButtonTypes = 'button' | 'submit' | 'reset';

type Props = {
  children: ReactNode;
  type?: ButtonTypes;
  style?: StyleTypes;
  radius?: RadiusTypes;
  icon?: boolean;
  prepend?: ReactElement;
  append?: ReactElement;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  children,
  type = 'button',
  style = 'outset',
  radius = 'default',
  icon = false,
  prepend,
  append,
  className = '',
  onClick,
}: Props) => {
  return (
    <button
      type={type}
      className={[
        className,
        'py-2.5 flex items-center justify-between',
        'text-purple text-left hover:bg-indigo-100 focus:bg-indigo-200',
        radius === 'simple' ? 'rounded' : 'rounded-lg',
        icon ? 'px-2' : 'px-3',
        style === 'outset' ? 'bg-blue border-blue border-2' : '',
        style === 'inset' ? 'bg-white border-purple border' : '',
        style === 'simple'
          ? 'bg-white border-transparent border hover:border-current'
          : '',
      ].join(' ')}
      onClick={onClick}
    >
      {prepend && <span className="mr-3">{prepend}</span>}
      <span>{children}</span>
      {append && <span className="ml-3">{append}</span>}
    </button>
  );
};

export default Button;
