<template>
    <v-row>
        <!-- Email -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.user.email" attribute="e-mail" v-slot="props">
                <v-text-field
                    type="email"
                    label="E-Mail"
                    prepend-icon="mdi-email"
                    v-model="user.email"
                    :error-messages="props.error"
                    @input="$v.user.email.$touch()"
                    @blur="$v.user.email.$touch()"
                ></v-text-field>
            </form-group>
        </v-col>

        <!-- Name -->
        <v-col cols="12" md="6">
            <form-group :validator="$v.user.name" attribute="nome" v-slot="props">
                <v-text-field
                    type="text"
                    label="Nome"
                    prepend-icon="mdi-card-account-details-outline"
                    v-model="user.name"
                    :error-messages="props.error"
                    @input="$v.user.name.$touch()"
                    @blur="$v.user.name.$touch()"
                ></v-text-field>
            </form-group>
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
</template>

<script>
    import { required, email } from "vuelidate/lib/validators";

    export default {
        name: "UserDataFields",

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

        created() {
            this.$validator.pushFields(this.formName, "userData", this.$v);
        }
    };
</script>
