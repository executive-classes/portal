<template>
    <v-card>
        <v-form @submit.prevent="submit()">
            <v-card-title>Dados de Perfil</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Email -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="email"
                            label="E-Mail"
                            prepend-icon="mdi-email"
                            v-model="user.email"
                            :error-messages="errors.email"
                            @input="$v.user.email.$touch()"
                            @blur="$v.user.email.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- Name -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Nome"
                            prepend-icon="mdi-card-account-details-outline"
                            v-model="user.name"
                            :error-messages="errors.name"
                            @input="$v.user.name.$touch()"
                            @blur="$v.user.name.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- Phones -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Celular"
                            prepend-icon="mdi-cellphone"
                            v-model="user.phone"
                            v-maska="['(##) ####-####', '(##) #####-####']"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Telefone"
                            prepend-icon="mdi-phone"
                            v-model="user.phone_alt"
                            v-maska="['(##) ####-####', '(##) #####-####']"
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
    import { required, email } from "vuelidate/lib/validators";

    export default {
        name: "ProfileData",

        props: {
            user: {
                type: Object,
                required: true
            }
        },

        validations: {
            user: {
                email: {
                    required,
                    email
                },
                name: {
                    required
                }
            }
        },

        computed: {
            errors() {
                const errors = {
                    email: [],
                    name: []
                };

                if (this.$v.user.email.$dirty) {
                    !this.$v.user.email.required &&
                        errors.email.push("O e-mail é necessário");
                    !this.$v.user.email.email &&
                        errors.email.push("O e-mail precisa ser válido");
                }

                if (this.$v.user.name.$dirty) {
                    !this.$v.user.name.required &&
                        errors.name.push("O nome é necessário");
                }

                return errors;
            }
        },

        methods: {
            submit() {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.$v.$reset();
                    this.$emit("submit", "data");
                }
            }
        }
    };
</script>
