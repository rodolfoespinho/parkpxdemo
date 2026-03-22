import React from 'react'
import ReactDOM from 'react-dom/client'
import ParkPX from './App.jsx'
import { Analytics } from '@vercel/analytics/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParkPX />
    <Analytics />
  </React.StrictMode>
)
