import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Global } from '@emotion/react'
import { RESET } from './styles/reset.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Global styles={RESET} />
    <App />
  </React.StrictMode>,
)
