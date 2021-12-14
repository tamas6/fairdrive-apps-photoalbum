import type { NextPage } from 'next';
import Layout from 'components/Layout';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  return (
    <Layout>
      <h1 className="text-center">Fairdrive</h1>
      {!user && <h3 className="text-center">user loggeout</h3>}
    </Layout>
  );
};

export default Home;
