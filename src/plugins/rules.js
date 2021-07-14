import Vue from "vue";
import Vuelidate from 'vuelidate'
import VuelidateErrorExtractor from "vuelidate-error-extractor";
import FormGroup from "../components/formComponents/FormGroup.vue";
import Validator from "../domain/validator/Validator"
import messages from "../rules/messages"

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
    template: FormGroup,
    messages: messages
});

Vue.prototype.$validator = new Validator();
