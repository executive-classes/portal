import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import http from './http';
import moment from "moment";
import Vuebar from "vuebar";
import "./plugins/base";
import VueSkycons from "vue-skycons";
import InstantSearch from "vue-instantsearch";
import Maska from 'maska'
import Vuelidate from 'vuelidate'

String.capitalize = s => s && s[0].toUpperCase() + s.slice(1);

Vue.use(Vuelidate);
Vue.use(VueSkycons, {
    color: "#1e88e5",
});
Vue.use(InstantSearch);
Vue.use(Vuebar);
Vue.use(Maska);

Vue.config.productionTip = false;

Vue.prototype.$http = http;
Vue.prototype.$moment = moment;


new Vue({
    vuetify,
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
