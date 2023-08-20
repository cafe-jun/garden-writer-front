import '../styles/global.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <RightMouseDisable /> */}
      {/* <F12Disabled /> */}
      <Component {...pageProps} />
    </>
  );
}
