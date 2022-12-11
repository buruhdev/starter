import './admin.bootstrap';
import { createApp } from 'vue';
import Admin from './Admin.vue';
import i18n from './i18n';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import  adminRoutes from './admin.routes';

const router = createRouter({
    history: createWebHistory(),
    routes: adminRoutes
});

createApp(Admin)
    .use(i18n)
    .use(router)
    .mount('#app');

