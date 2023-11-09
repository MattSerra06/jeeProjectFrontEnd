// router.js
import {createRouter, createWebHistory} from 'vue-router';
import Home from './pages/Home.vue';
import Sessions from "@/pages/Sessions.vue";
import Admin from "@/pages/Admin.vue";
import Login from "@/pages/Login.vue";
import Register from "@/pages/Register.vue";
import Sites from "@/pages/Sites.vue";
import Discipline from "@/pages/Discipline.vue";


const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {path: '/sessions', component: Sessions},
    {path: '/admin', component: Admin},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/sites', component: Sites},
    {path : '/disciplines', component: Discipline}
    // Ajoutez d'autres routes au besoin
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
