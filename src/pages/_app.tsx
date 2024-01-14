import '@/styles/global.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Leetcode clone</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <meta name="description" content="web application that contains leetcode problems and video solutions" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}