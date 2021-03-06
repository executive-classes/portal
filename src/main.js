import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store";
import router from "./router";
import "./plugins";
import "./plugins/base";
import "./plugins/rules";
import "./plugins/extensions";

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    render: (h) => h(App),
}).$mount("#app");
