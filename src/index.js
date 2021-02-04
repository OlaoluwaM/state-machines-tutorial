import App from './App';
import Modal from 'react-modal';

import { render } from 'react-dom';
import { StrictMode } from 'react';

import './index.css';

const rootElement = document.getElementById('root');

Modal.setAppElement(rootElement);

render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
