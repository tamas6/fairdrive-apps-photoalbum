import { ReactNode } from 'react';
import Topbar from 'components/Topbar';
import Sidebar from 'components/Sidebar';
import useUser from 'hooks/useUser';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { user } = useUser();

  return (
    <section className="relative w-full min-h-screen">
      <Topbar />
      <main className={`${user ? 'pl-64' : ''} pt-20 px-8`}>{children}</main>
      {!!user && <Sidebar />}
    </section>
  );
};

export default Layout;
