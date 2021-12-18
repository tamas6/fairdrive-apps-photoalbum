/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Title from 'components/Title';
import useUser from 'hooks/useUser';
import { useEffect } from 'react';
import useFairOs from 'hooks/useFairOs';

const Login: NextPage = () => {
  const { logout } = useFairOs();
  const { setUser } = useUser();

  useEffect(() => {
    setUser(null);

    logout();

    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('user');
    }
  }, []);

  return (
    <Layout>
      <Title>Logout page</Title>
      <p>Logging out...</p>
    </Layout>
  );
};

export default Login;
