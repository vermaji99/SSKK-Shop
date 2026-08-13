import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A0B2E',
              color: '#F5F1E8',
              border: '1px solid #D4AF37',
              borderRadius: '8px',
            },
            success: {
              style: {
                border: '1px solid #D4AF37',
              },
              iconTheme: {
                primary: '#D4AF37',
                secondary: '#1A0B2E',
              },
            },
            error: {
              style: {
                border: '1px solid #ef4444',
              },
            },
          }}
        />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
