import Vue from "vue";
import Vuetify from "vuetify/lib";
import "@/scss/vuetify/overrides.scss";
Vue.use(Vuetify);

const theme = {
    primary: "#0f0fa3",
    secondary: "#ab1313",
    info: "#1e88e5",
    success: "#21c1d6",
    warning: "#ff9800",
    danger: "#fc4b6c",
    default: "#563dea",
};

import en from 'vuetify/src/locale/en.ts'
import pt from 'vuetify/src/locale/pt.ts'

export default new Vuetify({
    lang: {
        locales: { en, pt },
        current: 'pt',
    },
    theme: {
        themes: {
            dark: theme,
            light: theme,
        },
        dark: false,
    },
    rtl: false,
});
