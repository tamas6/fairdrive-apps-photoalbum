import { ReactNode, useEffect } from 'react';
import Router from 'next/router';
import Topbar from 'components/Topbar';
import Sidebar from 'components/Sidebar';
import useUser from 'hooks/useUser';
import useApp from 'hooks/useApp';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { isAuthenticated } = useUser();
  const { sidebarVisible, setSidebarVisible } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      setSidebarVisible(false);
      Router.push('/login');
    }
  }, [isAuthenticated, setSidebarVisible]);

  return (
    <section className="relative w-full min-h-screen">
      <Topbar />
      <main className={`${sidebarVisible ? 'pl-64' : ''} pt-20 px-8`}>
        {children}
      </main>
      {sidebarVisible && <Sidebar />}
    </section>
  );
};

export default Layout;
