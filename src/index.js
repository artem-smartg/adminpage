import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import QuestionStore from './store/QuestionStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(process.env.REACT_APP_API_URL)
export const Context = createContext(null)

root.render(
  <Context.Provider value={{
    question: new QuestionStore(),
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);


reportWebVitals();
