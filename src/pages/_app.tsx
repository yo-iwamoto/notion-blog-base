import '@/styles/global.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import Head from 'next/head';

export default function ({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>blog.yoiw.dev</title>
        <link rel='stylesheet' href='https://unpkg.com/@highlightjs/cdn-assets@11.4.0/styles/base16/espresso.min.css' />
      </Head>
      <Component {...pageProps} />

      <Script src='https://unpkg.com/@highlightjs/cdn-assets@11.4.0/highlight.min.js' strategy='beforeInteractive' />
      <Script strategy='afterInteractive'>hljs.highlightAll();</Script>
    </>
  );
}
