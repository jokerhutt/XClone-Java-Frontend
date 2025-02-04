import { StrictMode } from 'react'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
import { createRoot } from 'react-dom/client'
import { SocketProvider } from './SocketContext'
import './App.css';
import App from './App.jsx'

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <SocketProvider>
      <App />
    </SocketProvider>
  </StrictMode>
)
