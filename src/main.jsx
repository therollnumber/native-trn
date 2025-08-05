import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.jsx'
// Import JavaScript theme configuration instead of CSS
import '../styles/globals.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)