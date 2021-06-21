<template>
    <v-row>
        <v-col cols="12" lg="9" xl="6">
            <base-alert :alert="alert"></base-alert>

            <h2 class="font-weight-bold my-md-4 primary--text">Acessar Portal</h2>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="mt-4"
                    required
                ></v-text-field>

                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Senha"
                    required
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    color="primary"
                    block
                    class="mr-4 mt-4"
                    submit
                    @click="submit"
                >Entrar</v-btn>
            </v-form>

            <v-divider class="mt-5"></v-divider>

            <v-row>
                <v-col cols="6" class="text-left">
                    <a href="https://executiveclasses.com.br">
                        <v-btn color="primary" text class="pa-0" small>Seja um aluno</v-btn>
                    </a>
                </v-col>
                <v-col cols="6" class="text-right">
                    <router-link :to="{ name: 'password.recovery' }">
                        <v-btn color="primary" text class="pa-0" small>Esqueceu a Senha?</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    import { mapState, mapMutations } from "vuex";
    import Alert from "@/domain/alert/Alert";

    export default {
        name: "Login",

        data: () => ({
            valid: true,
            email: "",
            password: "",
            showPassword: false,
            alert: new Alert(),
            passwordRules: [v => !!v || "Senha é necessária"],
            emailRules: [
                v => !!v || "E-mail é necessário",
                v => /.+@.+\..+/.test(v) || "E-mail precisa ser válido"
            ]
        }),

        computed: {
            ...mapState(["lang"])
        },

        methods: {
            ...mapMutations({
                login: "LOGIN"
            }),

            submit() {
                this.$refs.form.validate();

                if (this.$refs.form.validate(true)) {
                    this.$http
                        .post("login", {
                            email: this.email,
                            password: this.password,
                            language: this.lang
                        })
                        .then(response => {
                            this.login(response.data);
                            this.$router.push({ name: "home" });
                        })
                        .catch(error => this.alert.error(error.message));
                }
            }
        }
    };
</script>
