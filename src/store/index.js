import moment from "moment";
import Vue from "vue";
import Vuex from "vuex";
import User from "@/domain/user/User";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        tokenEndTime: null,
        user: {},
        privileges: {},
        Sidebar_drawer: null,
        Customizer_drawer: false,
        useCustomizer: false,
        SidebarBg: "",
        SidebarColor: "secondary",
        navbarColor: "alternative",
        setHorizontalLayout: true,
        hasFooter: false,
        showLogo: true,
        lang: 'pt_BR'
    },

    mutations: {
        LOGIN(state, data) {
            state.token = data.plainTextToken;
            state.tokenEndTime = data.accessToken.expires_at;
            state.user = data.user;
            state.privileges = data.accessToken.abilities;
        },
        LOGOUT(state) {
            state.token = null;
            state.tokenEndTime = null;
            state.user = {};
            state.privileges = {};
        },
        TOKEN_LIVES(state) {
            if (moment().isAfter(state.tokenEndTime)) {
                this.commit('LOGOUT');
            }
        },
        SET_CUSTOMIZER_DRAWER(state, payload) {
            state.Customizer_drawer = payload;
        },
        SET_SIDEBAR_DRAWER(state, payload) {
            state.Sidebar_drawer = payload;
        },
        SET_SIDEBAR_COLOR(state, payload) {
            state.SidebarColor = payload;
        },
        SET_NAVBAR_COLOR(state, payload) {
            state.navbarColor = payload;
        },
        SET_LAYOUT(state, payload) {
            state.setHorizontalLayout = payload;
        },
        SHOW_HIDE_LOGO(state) {
            state.showLogo = !state.showLogo;
        },
        SET_MOBILE_LAYOUT(state) {
            state.navbarColor = "secondary";
        },
        SET_LAPTOP_LAYOUT(state) {
            state.navbarColor = "alternative";
        },
    },

    actions: {},

    getters: {
        logged: state => state.token != null,
        token: state => state.token,
        user: state => new User(state.user, state.privileges)
    },

    plugins: [
        createPersistedState({
            getState: (key) => Cookies.getJSON(key),
            setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
        })
    ]
});
