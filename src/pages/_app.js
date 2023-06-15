import '../styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';
import { client } from 'src/graphql/client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '@components/Loading';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const ref = useRef();
  useEffect(() => {
    const start = () => {
      ref.current.continuousStart();
    };
    const end = () => {
      ref.current.complete();
    };
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeError', end);
    router.events.on('routeChangeComplete', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);
  return (
    <>
      <Toaster />
      <SessionProvider session={pageProps.session}>
        <ApolloProvider client={client}>
          <Loading progress={ref} />
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
