import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './CartContext.tsx'
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>

    <CartProvider>

    <App />
    </CartProvider>
  
    </MantineProvider>
  </React.StrictMode>,
)
