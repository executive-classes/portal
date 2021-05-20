<template>
    <v-row>
        <v-col cols="12" lg="7" xl="6" class="primary d-none d-md-flex align-center justify-center">
            <v-container></v-container>
        </v-col>
        <v-col cols="12" lg="5" xl="6" class="d-flex align-center">
            <v-container>
                <div class="pa-7 pa-sm-12">
                    <v-row>
                        <v-col cols="12" lg="9" xl="6">
                            <v-alert
                                v-model="alert"
                                dismissible
                                transition="expand-transition"
                                color="danger"
                                border="left"
                                elevation="2"
                                colored-border
                                icon="fa-exclamation"
                            >{{message}}</v-alert>

                            <h2
                                class="font-weight-bold mt-4 blue-grey--text text--darken-2"
                            >Acessar Portal</h2>

                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    class="mt-4"
                                    required
                                    outlined
                                ></v-text-field>

                                <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    label="Senha"
                                    required
                                    outlined
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                ></v-text-field>

                                <v-btn
                                    :disabled="!valid"
                                    color="info"
                                    block
                                    class="mr-4"
                                    submit
                                    @click="submit"
                                >Entrar</v-btn>
                            </v-form>

                            <v-divider class="mt-5"></v-divider>

                            <v-row>
                                <v-col cols="6" class="text-left">
                                    <a href="https://executiveclasses.com.br">
                                        <v-btn color="default" text class="pa-0">Contratar</v-btn>
                                    </a>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <router-link :to="{ name: 'password.recovery' }">
                                        <v-btn color="default" text class="pa-0">Esqueci a Senha</v-btn>
                                    </router-link>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "Login",

        data: () => ({
            valid: true,
            email: "",
            password: "",
            showPassword: false,
            alert: false,
            message: "",
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
                            this.login({
                                token: response.data.plainTextToken,
                                user: response.data.user,   
                                expires: response.data.accessToken.expires_at
                            });
                            this.$router.push({ name: "home" });
                        })
                        .catch(error => this.error(error.message));
                }
            },

            error(message) {
                this.message = message;
                this.alert = true;
            }
        }
    };
</script>
