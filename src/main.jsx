import React from 'react'
import ReactDOM from 'react-dom/client'
import ReduxThunk from 'redux-thunk'
import reducers from './components/Reducers/index.jsx'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'

import './index.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
