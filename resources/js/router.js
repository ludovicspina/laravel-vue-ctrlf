import { createRouter, createWebHistory } from "vue-router";
import Home from "./Pages/HomeRoute.vue";
import Dashboard from "./Pages/Dashboard.vue";
import Formation from "./Pages/Formation.vue";
import Login from "./Pages/Login.vue";
import store from "./store"; // Importer ton système de gestion de session

const routes = [
    { path: "/", component: Home },

    {
        path: "/dashboard",
        component: Dashboard,
        meta: { requiresAuth: true, requiresAdmin: true },
    },

    {
        path: "/formation",
        component: Formation,
        meta: { requiresAuth: true },
    },

    { path: "/login", component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Vérification de l'authentification et du rôle avant accès aux pages protégées
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;
    const isAdmin = store.getters.isAdmin;

    if (to.meta.requiresAuth && !isAuthenticated) {
        next("/login");
    } else if (to.meta.requiresAdmin && !isAdmin) {
        next("/");
    } else {
        next();
    }
});

export default router;
