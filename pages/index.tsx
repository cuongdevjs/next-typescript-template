/* eslint-disable react/no-danger */
import dynamic from 'next/dynamic';
import { NextSeo } from 'next-seo';
import { memo } from 'react';

const Home = dynamic(() => import('containers/Home'));

function PublicContainer() {
  return (
    <>
      <NextSeo
        title="Template Nextjs"
        description=""
        openGraph={{
          type: 'website',
          url: '/',
          title: '',
          description: '',
          images: [],
          site_name: 'Nextjs',
          profile: {
            username: '',
          },
        }}
      />

      <Home />
    </>
  );
}

export default memo(PublicContainer);
