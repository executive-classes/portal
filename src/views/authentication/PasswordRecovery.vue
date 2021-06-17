<template>
    <v-row>
        <v-col cols="12" lg="9" xl="6">
            <h2 class="font-weight-bold my-4 primary--text">Recuperar Senha</h2>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    class="my-4"
                    hint="Informe seu e-mail de cadastro"
                    persistent-hint
                    required
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    color="primary"
                    block
                    class="mr-4 mt-4"
                    submit
                    @click="submit"
                >Enviar E-Mail</v-btn>
            </v-form>

            <v-divider class="mt-5"></v-divider>

            <v-row>
                <v-col cols="6" class="text-left">
                    <a href="https://executiveclasses.com.br">
                        <v-btn color="primary" text class="pa-0" small>Seja um aluno</v-btn>
                    </a>
                </v-col>
                <v-col cols="6" class="text-right">
                    <router-link :to="{ name: 'login' }">
                        <v-btn color="primary" text class="pa-0" small>Acessar o portal</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "PasswordRecovery",

        data: () => ({
            valid: true,
            email: "",
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