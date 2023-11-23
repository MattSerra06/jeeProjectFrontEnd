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
    {
        path: '/admin',
        component: Admin,
        meta: {requiredRoles: ['ROLE_ADMIN', 'ROLE_SESSION_MANAGER', 'ROLE_ADMINISTRATIVE_MANAGER']}
    },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/sites', component: Sites},
    {path: '/disciplines', component: Discipline}
    // Ajoutez d'autres routes au besoin
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userRole = localStorage.getItem('role'); // Ou votre méthode de récupération du rôle
    // Vérifier si la route cible nécessite un rôle spécifique
    if (to.matched.some(record => record.meta.requiredRoles)) {
        const requiredRoles = to.meta.requiredRoles;

        if (!requiredRoles.includes(userRole)) {
            // Rediriger l'utilisateur si le rôle n'est pas autorisé
            return next({ path: '/' }); // Rediriger vers l'accueil ou une page d'erreur
        }
    }
    next(); // Continuer si le rôle est autorisé ou si la route ne nécessite pas de rôle spécifique
});

export default router;
