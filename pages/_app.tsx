import { DefaultSeo } from 'next-seo';
import { NextWebVitalsMetric } from 'next/app';
import { GlobalStyle } from '@styles/global-styles';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ResponsiveGlobal } from '@styles/responsive';
import React from 'react';
import { NextComponentType } from 'next';

import NextProgress from 'next-progress';
import { wrapper } from '../store';

import 'bootstrap/dist/css/bootstrap.min.css';

interface AppProps {
  Component: NextComponentType<any>;
  pageProps: any;
}

const MyApp: React.FunctionComponent<AppProps> = ({
  Component,
  pageProps,
}: AppProps) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <meta
          id="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
      </Head>
      <DefaultSeo
        title="Template Nextjsp"
        description="Nextjs"
        openGraph={{
          type: 'website',
          url: router.pathname,
          site_name: 'Template Nextjs',
          title: 'Template Nextjs',
          description: 'Nextjs',
        }}
      />
      <NextProgress
        color="#f9c10d"
        height="4px"
        options={{ showSpinner: true }}
      />
      <Component {...pageProps} />
      <GlobalStyle />
      <ResponsiveGlobal />
    </>
  );
};

export function reportWebVitals({
  id,
  name,
  // startTime,
  value,
  label,
}: NextWebVitalsMetric) {
  if ((window as any).gtag)
    (window as any).gtag('send', 'event', {
      eventCategory:
        label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      eventAction: name,
      eventValue: Math.round(name === 'CLS' ? value / 1000 : value), // values must be integers
      eventLabel: id, // id unique to current page load
      nonInteraction: true, // avoids affecting bounce rate.
    });
}

export default wrapper.withRedux(MyApp);
