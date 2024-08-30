import '../styles/global.css';

import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';

import { PageHeader } from '@/components/PageHeader/PageHeader';

const theme = createTheme({
  spacing: 1,
});
const queryClient = new QueryClient();
// TODO: regExp
const noHeaderPages = ['/user', '/join', '/write/create'];

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  const hideHeader = noHeaderPages.some(pageUrl => pageUrl.includes(pageUrl));

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
          {!hideHeader && <PageHeader />}
          <Component {...pageProps} />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
