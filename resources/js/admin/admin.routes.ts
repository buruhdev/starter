import { RouteRecordRaw } from "vue-router";
import Dashboard from './views/Dashboard.vue';
import Users from './views/Users.vue';
import Profile from './views/Profile.vue';

const adminRoutes: Array<RouteRecordRaw> = [
    { name: "dashboard", path: "/admin/dashboard", component: Dashboard},
    { name: "users", path: "/admin/users", component: Users},
    { name: "profile", path: "/admin/profile", component: Profile}
];

export default adminRoutes;
