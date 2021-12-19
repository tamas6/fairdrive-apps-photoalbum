/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from 'next';
import Layout from 'components/Layout';
import Title from 'components/Title';
import TextInput from 'components/TextInput';
import Button from 'components/Button';
import useUser from 'hooks/useUser';
import Router from 'next/router';
import { SyntheticEvent, useEffect, useState } from 'react';
import useApp from 'hooks/useApp';
import useFairOs from 'hooks/useFairOs';
import usePods from 'hooks/usePods';

const Login: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, isAuthenticated } = useUser();
  const { setSidebarVisible } = useApp();
  const { login, getPodsWithHref } = useFairOs();
  const { setPods } = usePods();

  useEffect(() => {
    if (isAuthenticated) {
      Router.push('/');
    }
  }, [isAuthenticated]);

  const onChangeUsernameHandler = (evt: SyntheticEvent) => {
    setUsername((evt.target as HTMLInputElement).value);
  };

  const onChangePasswordHandler = (evt: SyntheticEvent) => {
    setPassword((evt.target as HTMLInputElement).value);
  };

  const onSubmitHandler = async (event: SyntheticEvent) => {
    event.preventDefault();
    console.log('onSubmitHandler');

    const { data } = await login({
      username,
      password,
    });

    if (data.code === 200) {
      setSidebarVisible(true);
      setUser({
        username,
        password,
      });

      setPods(await getPodsWithHref());

      Router.push('/');
    }
  };

  return (
    <Layout>
      <Title>Login page</Title>

      <form onSubmit={onSubmitHandler}>
        <TextInput
          placeholder="Username"
          value={username}
          onChange={onChangeUsernameHandler}
        />
        <TextInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePasswordHandler}
        />
        <Button type="submit" className="w-full md:w-1/3">
          Login
        </Button>
      </form>
    </Layout>
  );
};

export default Login;
