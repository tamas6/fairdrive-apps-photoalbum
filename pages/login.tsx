import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Title from 'components/Title';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { SyntheticEvent, useEffect } from 'react';
import useApp from 'hooks/useApp';

const Login: NextPage = () => {
  const { setUser, isAuthenticated } = useUser();
  const { setSidebarVisible } = useApp();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  const onSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('onSubmitHandler');
    setSidebarVisible(true);
    setUser({
      username: 'johndoe',
    });
    Router.push('/');
  };

  return (
    <Layout>
      <Title>Login page</Title>

      <form onSubmit={onSubmitHandler}>
        <TextInput placeholder="Username" />
        <TextInput type="password" placeholder="Password" />
        <Button type="submit" className="w-full md:w-1/3">
          Login
        </Button>
      </form>
    </Layout>
  );
};

export default Login;
