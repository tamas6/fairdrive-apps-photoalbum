import { ReactNode } from 'react';
import classes from './Title.module.scss';

type Props = {
  children: ReactNode;
  sub?: ReactNode;
};

const Title = ({ children, sub }: Props) => {
  return (
    <div>
      <h1 className={`${classes.root} text-purple`}>{children}</h1>
      {sub}
    </div>
  );
};

export default Title;
