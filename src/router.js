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
                },
            ],
        },
        {
            name: "login",
            path: "/login",
            component: () => import("@/views/authentication/Login"),
            meta: {
                public: true
            }
        },
        {
            name: "password.recovery",
            path: "/password/recovery",
            component: () => import("@/views/authentication/PasswordRecovery"),
            meta: {
                public: true
            }
        },
        {
            name: "password.update",
            path: "/password/update",
            component: () => import("@/views/authentication/PasswordUpdate"),
            meta: {
                public: true
            }
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
