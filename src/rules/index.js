import { helpers } from "vuelidate/lib/validators";

const password = helpers.regex(
    "password",
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W|_])(?=.{8}).*$/
)

export {
    password
};
