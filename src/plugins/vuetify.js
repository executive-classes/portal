import '@fortawesome/fontawesome-free/css/all.css'
import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@/scss/vuetify/overrides.scss";
Vue.use(Vuetify);

const ligthTheme = {
    primary: "#293176",
    secondary: "#1d203e",
    default: "#eef5f9",
    info: "#1e88e5",
    success: "#21c1d6",
    warning: "#ff9800",
    danger: "#fc4b6c",
    'light-primary': "#e8e8ff",
    'light-secondary': "#ffebeb",
    'light-info': "#e6ecfc",
    'light-warning': "#fff8ec",
    'light-success': "#e8fdf8",
    'light-danger': "#f9e7eb",
};

const darkTheme = {
    primary: "#293176",
    secondary: "#1d203e",
    default: "#891919",
    info: "#1e88e5",
    success: "#21c1d6",
    warning: "#ff9800",
    danger: "#fc4b6c",
};

import en from 'vuetify/src/locale/en.ts'
import pt from 'vuetify/src/locale/pt.ts'

export default new Vuetify({
    lang: {
        locales: { en, pt },
        current: 'pt',
    },
    iconfont: 'fa',
    theme: {
        themes: {
            dark: darkTheme,
            light: ligthTheme,
        },
        dark: false,
    },
    rtl: false,
});
