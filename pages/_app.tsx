/* eslint-disable react-hooks/exhaustive-deps */
import 'styles/globals.scss';
import { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import AppProvider from 'contexts/App';
import UserProvider from 'contexts/User';
import PodsProvider from 'contexts/Pods';
import useFairOs from 'hooks/useFairOs';

const localUser =
  typeof localStorage !== 'undefined' &&
  JSON.parse(localStorage.getItem('user'));

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [pods, setPods] = useState([]);
  const [user, setUser] = useState(
    localUser?.username
      ? { username: localUser.username, password: null }
      : null
  );
  const { userLoggedIn, getPodsWithHref } = useFairOs();

  const userProviderValue = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout: () => {
      setUser(null);
    },
  };

  const checkUserRemotely = async () => {
    const { data } = await userLoggedIn(user.username);

    if (!data.loggedin) {
      Router.push('/logout');
    } else {
      setSidebarVisible(true);
      setUser({
        username: user.username,
        password: window.prompt('Insert your password again!'),
      });

      setPods(await getPodsWithHref());
    }
  };

  useEffect(() => {
    if (user) {
      checkUserRemotely();
    }
  }, []);

  return (
    <>
      <Head>
        <title>PhotoAlbum | Fairdrive Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider value={{ sidebarVisible, setSidebarVisible }}>
        <UserProvider value={userProviderValue}>
          <PodsProvider value={{ pods, setPods }}>
            <Component {...pageProps} />
          </PodsProvider>
        </UserProvider>
      </AppProvider>
    </>
  );
};

export default MyApp;
