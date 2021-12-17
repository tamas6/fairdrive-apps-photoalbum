import type { NextPage } from 'next';
import Layout from 'components/Layout';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push('/login');
    }
  }, [isAuthenticated]);

  return (
    isAuthenticated && (
      <Layout>
        <h1 className="text-center">Fairdrive</h1>
      </Layout>
    )
  );
};

export default Home;
