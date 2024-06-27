import '../styles/global.css';

import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { useEffect, useState } from 'react';

import { PageHeader } from '@/components/PageHeader/PageHeader';

const queryClient = new QueryClient();
const theme = createTheme({
  spacing: 1,
});
export default function App({ Component, pageProps }: AppProps) {
  const [isHeader, setIsHeader] = useState<boolean>(false);
  const { asPath } = useRouter();
  const banPick = ['/', '/login', '/signUp', '/write/info', '/user/passwd'];
  useEffect(() => {
    if (banPick.includes(asPath)) {
      setIsHeader(false);
    } else {
      setIsHeader(true);
    }
  }, [asPath]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          {/* <RightMouseDisable /> */}
          {/* <F12Disabled /> */}
          {isHeader && <PageHeader />}
          <Component {...pageProps} />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
