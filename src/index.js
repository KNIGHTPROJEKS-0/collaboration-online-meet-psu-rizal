import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource-variable/inter';
import '@fontsource-variable/plus-jakarta-sans';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { sendToVercelAnalytics } from './vitals';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './auth';

const queryClient = new QueryClient();

function Bootstrap() {
  const init = useAuthStore((s) => s.init);
  React.useEffect(() => { 
    init(); 
  }, [init]);
  
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Bootstrap />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals(sendToVercelAnalytics);
