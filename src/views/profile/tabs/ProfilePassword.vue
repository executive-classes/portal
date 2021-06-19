<template>
    <v-card>
        <v-form @submit.prevent="submit()">
            <v-card-title>Alterar senha</v-card-title>

            <v-card-text>
                <v-alert color="light-primary" border="left" elevation="4" prominent>
                    <div class="ml-3">
                        <p>Requisitos para a senha:</p>
                        <ul>
                            <li>Mínimo de 8 caracteres</li>
                            <li>Uma letra maiuscula</li>
                            <li>Uma letra minuscula</li>
                            <li>Um número</li>
                            <li>Um caractere especial (! @ # $ % & * - _)</li>
                        </ul>
                    </div>
                </v-alert>
                <v-row>
                    <!-- Password -->
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="Senha"
                            prepend-icon="mdi-lock"
                            v-model="user.password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            :error-messages="errors.password"
                            @input="password_check('password')"
                            @blur="password_check('password')"
                        ></v-text-field>
                    </v-col>

                    <!-- Confirm Password -->
                    <v-col cols="12" sm="6">
                        <v-text-field
                            label="Confirme a Senha"
                            prepend-icon="mdi-lock-reset"
                            v-model="user.confirmPassword"
                            :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showConfirmPassword ? 'text' : 'password'"
                            @click:append="showConfirmPassword = !showConfirmPassword"
                            :error-messages="errors.confirmPassword"
                            @input="password_check('confirmPassword')"
                            @blur="password_check('confirmPassword')"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" type="submit" rounded text>Salvar alterações</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    import { required, sameAs } from "vuelidate/lib/validators";
    import { password } from "@/rules";

    export default {
        name: "ProfilePassword",

        props: {
            user: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            showPassword: false,
            showConfirmPassword: false
        }),

        validations: {
            user: {
                password: {
                    required,
                    password
                },
                confirmPassword: {
                    required,
                    sameAs: sameAs(user => user.password)
                }
            }
        },

        computed: {
            errors() {
                const errors = {
                    password: [],
                    confirmPassword: []
                };

                if (this.$v.user.password.$dirty) {
                    !this.$v.user.password.required &&
                        errors.password.push("O senha é necessário");
                    !this.$v.user.password.password &&
                        errors.password.push("O senha precisa ser válida");
                }

                if (this.$v.user.confirmPassword.$dirty) {
                    !this.$v.user.confirmPassword.required &&
                        errors.confirmPassword.push(
                            "O confirmação de senha é necessário"
                        );
                    !this.$v.user.confirmPassword.sameAs &&
                        errors.confirmPassword.push(
                            "As senhas precisam ser iguais"
                        );
                }

                return errors;
            }
        },

        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$v.$reset();
                    this.$emit("submit", "password");
                }
            },
            password_check(field) {
                this.$v.user[field].$touch();

                if (this.$v.user.password.$dirty) {
                    this.$v.user.password.$touch();
                }

                if (this.$v.user.confirmPassword.$dirty) {
                    this.$v.user.confirmPassword.$touch();
                }
            }
        }
    };
</script>
