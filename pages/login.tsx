import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Title from 'components/Title';
import useUser from 'hooks/useUser';
import Router from 'next/router';

const Login: NextPage = () => {
  const { setUser } = useUser();

  const gotoHome = () => {
    Router.push('/');
  };

  return (
    <Layout>
      <Title>Login page</Title>

      <div>main</div>
    </Layout>
  );
};

export default Login;
