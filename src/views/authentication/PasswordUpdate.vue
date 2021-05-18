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
                            >Alterar Senha</h2>

                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="password"
                                    :rules="passwordRules"
                                    label="Senha"
                                    required
                                    outlined
                                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showPassword ? 'text' : 'password'"
                                ></v-text-field>

                                <v-text-field
                                    v-model="confirmPassword"
                                    :rules="confirmPasswordRules"
                                    label="Confirme a Senha"
                                    required
                                    outlined
                                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="showConfirmPassword ? 'text' : 'password'"
                                ></v-text-field>

                                <v-btn
                                    :disabled="!valid"
                                    color="info"
                                    block
                                    class="mr-4"
                                    submit
                                    @click="submit"
                                >Alterar Senha</v-btn>
                            </v-form>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "PasswordUpdate",

        data: () => ({
            valid: true,
            password: "",
            confirmPassword: "",
            showPassword: false,
            showConfirmPassword: false,
            alert: false,
            error: "",
            passwordRules: [v => !!v || "Senha é necessária"],
            confirmPasswordRules: [v => !!v || "Confirmação de senha é necessária"],
        }),

        methods: {
            submit() {
                this.$router.push({ name: "login" });
            }
        }
    };
</script>

<style>
</style>