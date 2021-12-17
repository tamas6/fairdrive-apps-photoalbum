import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Title from 'components/Title';
import useUser from 'hooks/useUser';
import { useEffect } from 'react';

const Login: NextPage = () => {
  const { setUser } = useUser();

  useEffect(() => {
    setUser(null);
  }, [setUser]);

  return (
    <Layout>
      <Title>Logout page</Title>
    </Layout>
  );
};

export default Login;
