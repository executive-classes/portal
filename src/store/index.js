import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: localStorage.getItem('token'),
        user: localStorage.getItem('user'),
        Sidebar_drawer: null,
        Customizer_drawer: false,
        useCustomizer: true,
        SidebarColor: "#0f0fa3",
        SidebarBg: "",
        navbarColor: "#ab1313",
        setHorizontalLayout: true,
        hasFooter: false,
        showLogo: true,
        lang: 'pt_BR'
    },

    mutations: {
        LOGIN(state, data) {
            state.token = data.token;
            state.user = data.user;
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', data.user)
        },
        LOGOUT(state) {
            state.token = null;
            state.user = {};
            localStorage.removeItem('token')
            localStorage.removeItem('user')
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
    },

    actions: {},

    getters: {
        logged: state => state.token != null,
        token: state => state.token,
        user: state => state.user
    },
});
