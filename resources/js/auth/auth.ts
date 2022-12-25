import './auth.bootstrap.js';
import { createApp } from 'vue';
import Auth from './Auth.vue';
import i18n from './i18n';
import { createRouter, createWebHistory } from 'vue-router';
import  authRoutes from './auth.routes';

const router = createRouter({
    history: createWebHistory(),
    routes: authRoutes
});

createApp(Auth)
    .use(i18n)
    .use(router)
    .mount('#app');

