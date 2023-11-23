import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Global } from '@emotion/react'
import { RESET } from './styles/reset.js'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/auth.js'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={RESET} />
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
