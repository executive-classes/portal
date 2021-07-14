import Vue from "vue";
import moment from "moment";
import VueSkycons from "vue-skycons";
import InstantSearch from "vue-instantsearch";
import Vuebar from "vuebar";
import Maska from 'maska'
import http from '../http';
import Alert from "../domain/alert/Alert";

Vue.use(VueSkycons, {
    color: "#1e88e5",
});
Vue.use(InstantSearch);
Vue.use(Vuebar);
Vue.use(Maska);

Vue.prototype.$http = http;
Vue.prototype.$moment = moment;
Vue.prototype.$alert = Vue.observable(new Alert());