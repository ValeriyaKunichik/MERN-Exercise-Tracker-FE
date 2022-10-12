import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExercisesContextProvider } from './context/ExercisesContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV==='production') disableReactDevTools();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ExercisesContextProvider>
      <App />
    </ExercisesContextProvider>
  </React.StrictMode>
)