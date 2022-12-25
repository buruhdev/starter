import { RouteRecordRaw } from "vue-router";
import Login from './views/Login.vue';

const authRoutes: Array<RouteRecordRaw> = [
    { name: "login", path: "/auth/login", component: Login}
];

export default authRoutes;
