<template>
    <v-row>
        <v-col cols="12" lg="9" xl="6">
            <h2 class="font-weight-bold my-4 primary--text">Alterar Senha</h2>

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    label="Senha"
                    required
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                ></v-text-field>

                <v-text-field
                    v-model="confirmPassword"
                    :rules="confirmPasswordRules"
                    label="Confirme a Senha"
                    required
                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    @click:append="showConfirmPassword = !showConfirmPassword"
                ></v-text-field>

                <v-btn
                    :disabled="!valid"
                    color="primary"
                    block
                    class="mr-4 mt-4"
                    submit
                    @click="submit"
                >Alterar Senha</v-btn>
            </v-form>
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
            passwordRules: [v => !!v || "Senha é necessária"],
            confirmPasswordRules: [v => !!v || "Confirmação de senha é necessária"]
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