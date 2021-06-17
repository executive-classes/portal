import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,

    // This is for the scroll top when click on any router link
    scrollBehavior: (to, from, savedPosition) => {
        let scrollTo = 0;

        if (to.hash) {
            scrollTo = to.hash;
        } else if (savedPosition) {
            scrollTo = savedPosition.y;
        }

        return goTo(scrollTo);
    },

    routes: [
        {
            path: "/",
            name: "home",
            redirect: "dashboard",
            component: () => import("@/layouts/Layout"),
            children: [
                {
                    name: "dashboard",
                    path: "dashboard",
                    component: () => import("@/views/dashboard/Dashboard"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Dashboard", to: { name: "dashboard" } }
                        ]
                    },
                },
                {
                    name: "profile",
                    path: "profile",
                    component: () => import("@/views/profile/Profile"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Perfil", to: { name: "profile" } }
                        ]
                    },
                },
                {
                    name: "users",
                    path: "users",
                    component: () => import("@/views/users/Users"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Usuários", to: { name: "users" } }
                        ]
                    }
                },
                {
                    name: "user",
                    path: "users/:id",
                    component: () => import("@/views/users/User"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Usuários", to: { name: "users" } },
                            { text: "Usuário", to: { name: "user" } }
                        ]
                    }
                },
                {
                    name: "employees",
                    path: "employees",
                    component: () => import("@/views/employees/Employees"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Funcionários", to: { name: "employees" } }
                        ]
                    },
                },
                {
                    name: "employee",
                    path: "employees/:id",
                    component: () => import("@/views/employees/Employee"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Funcionários", to: { name: "employees" } },
                            { text: "Funcionário", to: { name: "employee" } }
                        ]
                    }
                },
                {
                    name: "teachers",
                    path: "teachers",
                    component: () => import("@/views/teachers/Teachers"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Professores", to: { name: "teachers" } }
                        ]
                    },
                },
                {
                    name: "teacher",
                    path: "teachers/:id",
                    component: () => import("@/views/teachers/Teacher"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Professores", to: { name: "teachers" } },
                            { text: "Professor", to: { name: "teacher" } }
                        ]
                    },
                },
                {
                    name: "students",
                    path: "students",
                    component: () => import("@/views/students/Students"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Alunos", to: { name: "students" } }
                        ]
                    },
                },
                {
                    name: "bugs",
                    path: "bugs",
                    component: () => import("@/views/bugs/Bugs"),
                    meta: {
                        breadcrumbs: [
                            { text: "Home", to: { name: "home" } },
                            { text: "Bugs", to: { name: "bugs" } }
                        ]
                    },
                },
            ],
        },
        {
            name: "auth",
            path: "/auth",
            redirect: "login",
            component: () => import("@/layouts/BlankLayout"),
            children: [
                {
                    name: "login",
                    path: "login",
                    component: () => import("@/views/authentication/Login"),
                    meta: {
                        public: true
                    }
                },
                {
                    name: "password.recovery",
                    path: "password/recovery",
                    component: () => import("@/views/authentication/PasswordRecovery"),
                    meta: {
                        public: true
                    }
                },
                {
                    name: "password.update",
                    path: "password/update",
                    component: () => import("@/views/authentication/PasswordUpdate"),
                    meta: {
                        public: true
                    }
                },
            ],
        },
        {
            path: "*",
            component: () => import("@/views/error/404"),
        },
    ],
});

/**
 * Guard for auth
 */

import store from "@/store";

router.beforeEach((to, from, next) => {
    // Check if the token is still valid.
    store.commit('TOKEN_LIVES');

    // Redirect to login if the user is not authenticate.
    if (!to.meta.public && !store.getters.logged) {
        return next({ name: 'login' });
    }

    next();
})

/**
 * Progress bar for change route loading.
 */
import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start(800);
    }
    next();
});

router.afterEach(() => {
    // Complete the animation of the route progress bar.
    NProgress.done();
});

export default router;
