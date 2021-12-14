import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Title from 'components/Title';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { SyntheticEvent } from 'react';

const Login: NextPage = () => {
  const { setUser } = useUser();

  // const gotoHome = () => {
  //   Router.push('/');
  // };

  const onSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('onSubmitHandler');
    setUser({});
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
