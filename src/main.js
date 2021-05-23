import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import http from './http';
import rules from './rules';
import moment from "moment";
import Vuebar from "vuebar";
import "./plugins/base";
import VueSkycons from "vue-skycons";
import InstantSearch from "vue-instantsearch";

Vue.use(VueSkycons, {
    color: "#1e88e5",
});
Vue.use(InstantSearch);
Vue.config.productionTip = false;
Vue.use(Vuebar);

Vue.prototype.$http = http;
Vue.prototype.$moment = moment;
Vue.prototype.$rules = rules;

new Vue({
    vuetify,
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
