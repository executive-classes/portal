<template>
    <v-card>
        <v-form @submit.prevent="submit()">
            <v-card-title>Dados de Usuário</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Dates -->
                    <v-col cols="6" md="3">
                        <v-text-field
                            readonly
                            label="Criado em"
                            prepend-icon="mdi-calendar-plus"
                            :value="formatDate(employee.created_at)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-text-field
                            readonly
                            label="Alterado em"
                            prepend-icon="mdi-calendar-import"
                            :value="formatDate(employee.updated_at)"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-text-field
                            readonly
                            label="Suspenso em"
                            prepend-icon="mdi-calendar-remove"
                            :value="employee.inactive_at != null ? formatDate(employee.inactive_at) : '-'"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-text-field
                            readonly
                            label="Reativado em"
                            prepend-icon="mdi-calendar-check"
                            :value="employee.reactive_at != null ? formatDate(employee.reactive_at) : '-'"
                        ></v-text-field>
                    </v-col>

                    <!-- Email -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="email"
                            label="E-Mail"
                            prepend-icon="mdi-email"
                            v-model="employee.user.email"
                            :error-messages="errors.email"
                            @input="$v.employee.user.email.$touch()"
                            @blur="$v.employee.user.email.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- Name -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Nome"
                            prepend-icon="mdi-card-account-details-outline"
                            v-model="employee.user.name"
                            :error-messages="errors.name"
                            @input="$v.employee.user.name.$touch()"
                            @blur="$v.employee.user.name.$touch()"
                        ></v-text-field>
                    </v-col>

                    <!-- Phones -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Celular"
                            prepend-icon="mdi-cellphone"
                            v-model="employee.user.phone"
                            v-maska="['(##) ####-####', '(##) #####-####']"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Telefone"
                            prepend-icon="mdi-phone"
                            v-model="employee.user.phone_alt"
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
        name: "EmployeeData",

        props: {
            employee: {
                type: Object,
                required: true
            }
        },

        validations: {
            employee: {
                user: {
                    email: {
                        required,
                        email
                    },
                    name: {
                        required
                    }
                }
            }
        },

        computed: {
            errors() {
                const errors = {
                    email: [],
                    name: []
                };

                if (this.$v.employee.user.email.$dirty) {
                    !this.$v.employee.user.email.required &&
                        errors.email.push("O e-mail é necessário");
                    !this.$v.employee.user.email.email &&
                        errors.email.push("O e-mail precisa ser válido");
                }

                if (this.$v.employee.user.name.$dirty) {
                    !this.$v.employee.user.name.required &&
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
            },

            formatDate(date) {
                return this.$moment(date).format("DD/MM/YYYY, HH:mm:ss");
            }
        }
    };
</script>
