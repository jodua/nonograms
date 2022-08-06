import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from "i18next";
import Backend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";
import languages from './config/languages';

import App from './App';

import "./styles/index.scss";

const language = languages.find(value => value === localStorage.getItem('language'));
const defaultGameConfig = {
  canvasSize: 500,
  cluesSize: 100,
  fontSize: 16,
}

if (localStorage.getItem('settings') === null) {
  localStorage.setItem('settings', JSON.stringify(defaultGameConfig));
}

i18next.use(Backend)
  .use(initReactI18next)
  .init({
    lng: language || 'en',
    fallbackLng: 'en',
    ns: ['main'],
    defaultNS: 'main',
    react: {
      wait: true,
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

