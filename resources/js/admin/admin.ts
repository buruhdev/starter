import './admin.bootstrap';
import { createApp } from 'vue';
import Admin from './Admin.vue';
import i18n from './i18n';


const app = createApp(Admin);
app
.use(i18n)
.mount('#app');

