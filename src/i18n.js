import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import bn from './locales/bn.json';
import ar from './locales/ar.json';
import ur from './locales/ur.json';
import hi from './locales/hi.json';
import zhCN from './locales/zh-CN.json';
import es from './locales/es.json';


i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            bn: { translation: bn },
            ar: { translation: ar },
            ur: { translation: ur },
            hi: { translation: hi },
            "zh-CN": { translation: zhCN },
            es: { translation: es }
        },
        lng: 'en', // Default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
