// index.js
import React from 'react';

import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'; // Corrected import statement
import rootReducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

  <Provider store={store}>

    <BrowserRouter>
      <App />
      <Toaster />

    </BrowserRouter>
    </Provider>
  </React.StrictMode>
    
);


reportWebVitals();
