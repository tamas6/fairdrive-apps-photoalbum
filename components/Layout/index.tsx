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
      <main
        role="content"
        className={`${sidebarVisible ? 'ml-72' : ''} pt-20 px-6`}
      >
        {children}
      </main>
      {sidebarVisible && <Sidebar />}
    </section>
  );
};

export default Layout;
