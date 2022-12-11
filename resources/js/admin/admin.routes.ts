import { Route } from "./types/Route";
import Dashboard from './views/Dashboard.vue';
import Users from './views/Users.vue';
import Profile from './views/Profile.vue';

const adminRoutes: Route[] = [
    { name: "dashboard", path: "/admin/dashboard", component: Dashboard},
    { name: "users", path: "/admin/users", component: Users},
    { name: "profile", path: "/admin/profile", component: Profile}
];

export default adminRoutes;
