import React from 'react'
import ReactDOM from 'react-dom'
import './css/font.scss'
import './css/index.scss'
import Home from './router'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
