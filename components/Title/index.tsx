import { ReactNode } from 'react';
import classes from './Title.module.scss';

type Props = {
  children: ReactNode;
};

const Title = ({ children }: Props) => {
  return <h1 className={`${classes.root} text-purple`}>{children}</h1>;
};

export default Title;
