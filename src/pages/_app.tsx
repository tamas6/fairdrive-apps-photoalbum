import { AppProps } from 'next/app';

import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SearchProvider>
        <Component {...pageProps} />
      </SearchProvider>
    </UserProvider>
  );
}

export default MyApp;
