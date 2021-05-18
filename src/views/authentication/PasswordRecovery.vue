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
                            >{{error}}</v-alert>

                            <h2
                                class="font-weight-bold mt-4 blue-grey--text text--darken-2"
                            >Recuperar Senha</h2>

                            <v-alert
                                color="info"
                                border="left"
                                colored-border
                                dense
                                class="my-6"
                            >{{message}}</v-alert>

                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="email"
                                    :rules="emailRules"
                                    label="E-mail"
                                    class="mt-4"
                                    required
                                    outlined
                                ></v-text-field>

                                <v-btn
                                    :disabled="!valid"
                                    color="info"
                                    block
                                    class="mr-4"
                                    submit
                                    @click="submit"
                                >Enviar E-Mail</v-btn>
                            </v-form>

                            <v-divider class="mt-5"></v-divider>

                            <v-row>
                                <v-col cols="6" class="text-left">
                                    <a href="https://executiveclasses.com.br">
                                        <v-btn color="default" text class="pa-0">Contratar</v-btn>
                                    </a>
                                </v-col>
                                <v-col cols="6" class="text-right">
                                    <router-link :to="{ name: 'login' }">
                                        <v-btn color="default" text class="pa-0">Entrar</v-btn>
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
    export default {
        name: "PasswordRecovery",

        data: () => ({
            valid: true,
            email: "",
            alert: false,
            error: "",
            message: "Informe seu e-mail de cadastro",
            emailRules: [
                v => !!v || "E-mail é necessário",
                v => /.+@.+\..+/.test(v) || "E-mail precisa ser válido"
            ]
        }),

        methods: {
            submit() {
                this.$router.push({ name: "password.update" });
            }
        }
    };
</script>

<style>
</style>