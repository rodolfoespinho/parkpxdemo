import React from 'react'
import ReactDOM from 'react-dom/client'
import ParkPX from './App.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ParkPX />
    <SpeedInsights />
  </React.StrictMode>
)
