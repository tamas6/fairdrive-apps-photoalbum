import 'styles/globals.scss';
import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import AppProvider from 'contexts/App';
import UserProvider from 'contexts/User';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [user, setUser] = useState(null);

  const userProviderValue = {
    user,
    setUser,
    isAuthenticated: !!user,
    logout: () => {
      setUser(null);
    },
  };

  return (
    <>
      <Head>
        <title>PhotoAlbum | Fairdrive Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider value={{ sidebarVisible, setSidebarVisible }}>
        <UserProvider value={userProviderValue}>
          <Component {...pageProps} />
        </UserProvider>
      </AppProvider>
    </>
  );
};

export default MyApp;
