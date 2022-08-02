import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "./styles/index.scss";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "hello": "Hello",
        }
      },
    },
    fallbackLng: "en",
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

