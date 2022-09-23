import { DrawingContext } from './context/DrawingContext';
import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './App';
import './style/style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>

    <DrawingContext>
      <App />
    </DrawingContext>

  </React.StrictMode>
);

