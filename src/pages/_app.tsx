import { AppProps } from 'next/app';

import { UserProvider } from '@context/UserContext';
import { SearchProvider } from '@context/SearchContext';
import { PodProvider } from '@context/PodContext';

import '@styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SearchProvider>
        <PodProvider>
          <Component {...pageProps} />
        </PodProvider>
      </SearchProvider>
    </UserProvider>
  );
}

export default MyApp;
