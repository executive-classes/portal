import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        user: {},
        Sidebar_drawer: null,
        Customizer_drawer: false,
        useCustomizer: true,
        SidebarColor: "#007",
        SidebarBg: "",
        navbarColor: "#900",
        setHorizontalLayout: true,
        hasFooter: false,
        showLogo: true
    },

    mutations: {
        LOGIN(state, token, user) {
            state.token = token;
            state.user = user;
        },
        LOGOUT(state) {
            state.token = null;
            state.user = {};
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
