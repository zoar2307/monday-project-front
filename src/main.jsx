import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/style/main.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'



createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='175115050984-3eppbpfcbrbtvjgnbq273smgn9979cof.apps.googleusercontent.com'>
    <App />
  </GoogleOAuthProvider>
)
