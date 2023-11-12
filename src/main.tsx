import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Header from './components/Header.tsx'
import { AuthProvider } from './authContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Header></Header>
      <App />
    </AuthProvider>

  </React.StrictMode>,
)
