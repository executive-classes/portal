<template>
    <v-row>
        <!-- Name -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.biller.name" attribute="nome" v-slot="props">
                <v-text-field
                    type="text"
                    label="Nome"
                    prepend-icon="mdi-card-account-details-outline"
                    v-model="biller.name"
                    :error-messages="props.error"
                    @input="$v.biller.name.$touch()"
                    @blur="$v.biller.name.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Email -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.biller.email" attribute="e-mail" v-slot="props">
                <v-text-field
                    type="email"
                    label="E-Mail de contato"
                    prepend-icon="mdi-email"
                    v-model="biller.email"
                    :error-messages="props.error"
                    @input="$v.biller.email.$touch()"
                    @blur="$v.biller.email.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Phones -->
        <v-col cols="12" md="6">
            <v-text-field
                type="text"
                label="Celular"
                prepend-icon="mdi-cellphone"
                v-model="biller.phone"
                v-maska="['(##) ####-####', '(##) #####-####']"
            ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
            <v-text-field
                type="text"
                label="Telefone"
                prepend-icon="mdi-phone"
                v-model="biller.phone_alt"
                v-maska="['(##) ####-####', '(##) #####-####']"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    import { required, email } from "vuelidate/lib/validators";

    export default {
        name: "BillerDataFields",

        props: {
            biller: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        validations: {
            biller: {
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
            this.$validator.pushFields(this.formName, "billerData", this.$v);
        }
    }
</script>