import 'styles/globals.scss';
import { useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import AppProvider from 'contexts/App';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState('dark');

  return (
    <>
      <Head>
        <title>PhotoAlbum | Fairdrive Apps</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <AppProvider value={{ theme, setTheme }}>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
};

export default MyApp;
