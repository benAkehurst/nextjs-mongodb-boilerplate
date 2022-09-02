import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import Layout from '../components/Layout/Layout';
import { NotificationContextProvider } from '../store/NotificationContext';
import { appConfig } from '../app-config';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <NotificationContextProvider>
        <Layout>
          <Head>
            <title>{appConfig.appName}</title>
            <meta name="description" content={appConfig.appMetaDescription} />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </NotificationContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
