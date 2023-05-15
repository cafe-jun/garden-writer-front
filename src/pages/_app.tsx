import { globalStyle } from 'lib/stitches.config';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  globalStyle();
  return <Component {...pageProps} />;
}
