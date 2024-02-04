import '../styles/global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/PageHeader/PageHeader';
import { PageHeaderBackground } from '@/components/PageHeader/type';

const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  const [pageHeaderBackground, setPageHeaderBackground] = useState<PageHeaderBackground>(
    PageHeaderBackground.original
  );
  const { asPath } = useRouter();

  useEffect(() => {
    if (['/recruitment', '/novel'].includes(asPath)) {
      setPageHeaderBackground(PageHeaderBackground.white);
    } else {
      setPageHeaderBackground(PageHeaderBackground.original);
    }
  }, [asPath]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* <RightMouseDisable /> */}
      {/* <F12Disabled /> */}
      <PageHeader background={pageHeaderBackground} />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
