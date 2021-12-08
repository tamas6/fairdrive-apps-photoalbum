import { ReactNode } from 'react';
import Topbar from 'components/Topbar';
import Sidebar from 'components/Sidebar';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <section className="relative w-full min-h-screen">
      <Topbar />
      <main className="pl-64 pt-20">{children}</main>
      <Sidebar />
    </section>
  );
};

export default Layout;
