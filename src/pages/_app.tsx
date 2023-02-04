import React from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import reportAccessibility from '@/utils/reportAccessibility';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

reportAccessibility(React);
