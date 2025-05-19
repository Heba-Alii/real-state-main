import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from "i18next-http-backend"
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // اللغة الافتراضية
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    Backend: {
      loadpath: "./locales/{{lng}}/translation.json"
    }
  });

export default i18n;
