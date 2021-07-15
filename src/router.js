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
                    meta: {
                        title: 'Perfil'
                    }
                },
                {
                    path: "employees",
                    name: "employees.list",
                    component: () => import("@/views/employees/Employees"),
                    meta: {
                        privilege: 'employee:get',
                        title: 'Funcionários'
                    }
                },
                {
                    path: "employees/new",
                    name: "employees.create",
                    component: () => import("@/views/employees/NewEmployee"),
                    meta: {
                        privilege: 'employee:create',
                        title: 'Novo funcionário'
                    }
                },
                {
                    path: "employees/:id",
                    name: "employees.show",
                    component: () => import("@/views/employees/Employee"),
                    meta: {
                        privilege: 'employee:update',
                        title: 'Funcionário'
                    }
                },
                {
                    path: "teachers",
                    name: "teachers.list",
                    component: () => import("@/views/teachers/Teachers"),
                    meta: {
                        privilege: 'teacher:get',
                        title: 'Professores'
                    }
                },
                {
                    path: "teachers/new",
                    name: "teachers.create",
                    component: () => import("@/views/teachers/NewTeacher"),
                    meta: {
                        privilege: 'teacher:create',
                        title: 'Novo Professor'
                    }
                },
                {
                    path: "teachers/:id",
                    name: "teachers.show",
                    component: () => import("@/views/teachers/Teacher"),
                    meta: {
                        privilege: 'teacher:update',
                        title: 'Professor'
                    }
                },
                {
                    path: "students",
                    name: "students",
                    component: () => import("@/views/students/Students"),
                    meta: {
                        privilege: 'student:get',
                        title: 'Alunos'
                    }
                },
                {
                    path: "bugs",
                    name: "bugs.list",
                    component: () => import("@/views/bugs/Bugs"),
                    meta: {
                        privilege: 'buglog:get',
                        title: 'Erros'
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
 * Change page title
 */

const DEFAULT_TITLE = 'Executive Classes';

router.beforeEach((to, from, next) => {
    let title = DEFAULT_TITLE

    if (to.meta.title) {
        title = `${to.meta.title} - ${title}`;
    }

    document.title = title;

    next();
})

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
