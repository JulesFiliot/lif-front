import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const en = require('./locales/en.json');
const fr = require('./locales/fr.json');

const resources = { en, fr };

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
