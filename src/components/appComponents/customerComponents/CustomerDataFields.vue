<template>
    <v-row>
        <!-- Name -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.customer.name" attribute="nome" v-slot="props">
                <v-text-field
                    type="text"
                    label="Nome"
                    prepend-icon="mdi-card-account-details-outline"
                    v-model="customer.name"
                    :error-messages="props.error"
                    @input="$v.customer.name.$touch()"
                    @blur="$v.customer.name.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.customer.email" attribute="e-mail" v-slot="props">
                <v-text-field
                    type="email"
                    label="E-Mail de contato"
                    prepend-icon="mdi-email"
                    v-model="customer.email"
                    :error-messages="props.error"
                    @input="$v.customer.email.$touch()"
                    @blur="$v.customer.email.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Phones -->
        <v-col cols="12" md="6">
            <v-text-field
                type="text"
                label="Celular"
                prepend-icon="mdi-cellphone"
                v-model="customer.phone"
                v-maska="['(##) ####-####', '(##) #####-####']"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
                type="text"
                label="Telefone"
                prepend-icon="mdi-phone"
                v-model="customer.phone_alt"
                v-maska="['(##) ####-####', '(##) #####-####']"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    import { required, email } from "vuelidate/lib/validators";

    export default {
        name: "CustomerDataFields",

        props: {
            customer: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        validations: {
            customer: {
                email: {
                    required,
                    email
                },
                name: {
                    required
                }
            }
        },

        created() {
            this.$validator.pushFields(this.formName, "customerData", this.$v);
        }
    }
</script>