import './admin.bootstrap';
import { createApp } from 'vue';
import Admin from './Admin.vue';
import i18n from './i18n';
import { createRouter, createWebHistory } from 'vue-router';
import  adminRoutes from './admin.routes';
import { createPinia } from 'pinia';
import Toaster from "@meforma/vue-toaster";

const router = createRouter({
    history: createWebHistory(),
    routes: adminRoutes
});

createApp(Admin)
    .use(i18n)
    .use(router)
    .use(createPinia())
    .use(Toaster)
    .mount('#app');


