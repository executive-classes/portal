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
                    path: "dashboard",
                    name: "dashboard",
                    component: () => import("@/views/dashboard/Dashboard"),
                },
                {
                    path: "profile",
                    name: "profile",
                    title: 'Perfil',
                    component: () => import("@/views/profile/Profile"),
                },
                {
                    path: "employees",
                    name: "employees",
                    component: () => import("@/views/employees/Employees"),
                    meta: {
                        privilege: 'employee:get'
                    }
                },
                {
                    path: "employees/:id",
                    name: "employee",
                    component: () => import("@/views/employees/Employee"),
                    meta: {
                        privilege: 'employee:get'
                    }
                },
                {
                    path: "teachers",
                    name: "teachers",
                    component: () => import("@/views/teachers/Teachers"),
                    meta: {
                        privilege: 'teacher:get'
                    }
                },
                {
                    path: "teachers/:id",
                    name: "teacher",
                    component: () => import("@/views/teachers/Teacher"),
                    meta: {
                        privilege: 'teacher:get'
                    }
                },
                {
                    path: "students",
                    name: "students",
                    component: () => import("@/views/students/Students"),
                    meta: {
                        privilege: 'student:get'
                    }
                },
                {
                    path: "bugs",
                    name: "bugs",
                    component: () => import("@/views/bugs/Bugs"),
                    meta: {
                        privilege: 'buglog:get'
                    }
                }
            ],
        },
        {
            name: "auth",
            path: "/auth",
            redirect: "login",
            component: () => import("@/layouts/BlankLayout"),
            children: [
                {
                    path: "login",
                    name: "login",
                    component: () => import("@/views/authentication/Login"),
                    meta: {
                        public: true
                    }
                },
                {
                    path: "password/recovery",
                    name: "password.recovery",
                    component: () => import("@/views/authentication/PasswordRecovery"),
                    meta: {
                        public: true
                    }
                },
                {
                    path: "password/update",
                    name: "password.update",
                    component: () => import("@/views/authentication/PasswordUpdate"),
                    meta: {
                        public: true
                    }
                },
            ],
        },
        {
            path: "/unauthorized",
            name: "unauthorized",
            component: () => import("@/views/error/Unauthorized")
        },
        {
            path: "*",
            component: () => import("@/views/error/NotFound"),
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

    if (!to.meta.public) {
        // Redirect to login if the user is not authenticate.
        if (!store.getters.logged) {
            return next({ name: 'login' });
        }

        // Redirect if the access was unauthorized.
        if (to.meta.privilege != undefined && !store.getters.user.can(to.meta.privilege)) {
            return next({ name: 'unauthorized' });
        }
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
