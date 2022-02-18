import '@/styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>blog.yoiw.dev</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
