<template>
    <v-row>
        <v-col cols="12">
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
        </v-col>

        <!-- Password -->
        <v-col cols="12" sm="6">
            <form-group
                :validator="$v.user.password"
                :messages="errorMessages"
                attribute="senha"
                v-slot="props"
            >
                <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    label="Senha"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="user.password"
                    :error-messages="props.error"
                    @click:append="showPassword = !showPassword"
                    @input="password_check('password')"
                    @blur="password_check('password')"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Confirm Password -->
        <v-col cols="12" sm="6">
            <form-group
                :validator="$v.user.confirmPassword"
                :messages="errorMessages"
                attribute="confirmação de senha"
                v-slot="props"
            >
                <v-text-field
                    :type="showConfirmPassword ? 'text' : 'password'"
                    label="Confirme a Senha"
                    prepend-icon="mdi-lock-reset"
                    :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    v-model="user.confirmPassword"
                    :error-messages="props.error"
                    @click:append="showConfirmPassword = !showConfirmPassword"
                    @input="password_check('confirmPassword')"
                    @blur="password_check('confirmPassword')"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Password Reminder -->
        <v-col cols="12">
            <v-text-field
                type="text"
                label="Lembrete de senha"
                prepend-icon="mdi-note-outline"
                v-model="user.password_reminder"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    import { required, sameAs } from "vuelidate/lib/validators";
    import { password } from "@/rules";

    export default {
        name: "UserPasswordFields",

        props: {
            user: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        data: () => ({
            showPassword: false,
            showConfirmPassword: false,
            errorMessages: {
                sameAs: "As senhas precisam ser iguais."
            }
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

        methods: {
            password_check(field) {
                this.$v.user[field].$touch();

                if (this.$v.user.password.$dirty) {
                    this.$v.user.password.$touch();
                }

                if (this.$v.user.confirmPassword.$dirty) {
                    this.$v.user.confirmPassword.$touch();
                }
            }
        },

        created() {
            this.$validator.pushFields(this.formName, "userPassword", this.$v);
        }
    };
</script>
