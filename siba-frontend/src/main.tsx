import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { ThemeProvider } from './components/theme-provider'
import App from './App.tsx'
import { registerSW } from 'virtual:pwa-register'
import { Toaster } from 'react-hot-toast'

// Register service worker
registerSW({ immediate: true })

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="siba-theme">
        <App />
        <Toaster 
          position="top-right" 
          reverseOrder={false}
          containerStyle={{
            zIndex: 99999,
          }}
        />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
)
