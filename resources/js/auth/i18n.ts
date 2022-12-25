import { createI18n } from "vue-i18n";
import idID from './locales/id.json';
import enUS from './locales/en.json';

type MessageSchema = typeof idID;

const i18n =  createI18n<[MessageSchema], 'id-ID' | 'en-US'>({
    locale: 'id-ID',
    messages: {
        'id-ID': idID,
        'en-US': enUS
    }
});

export default i18n;
