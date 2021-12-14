import 'styles/globals.scss';
import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import AppProvider from 'contexts/App';
import UserProvider from 'contexts/User';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  return (
    <>
      <Head>
        <title>PhotoAlbum | Fairdrive Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider value={{ theme, setTheme }}>
        <UserProvider value={{ user, setUser }}>
          <Component {...pageProps} />
        </UserProvider>
      </AppProvider>
    </>
  );
};

export default MyApp;
