<template>
    <form-group :validator="$v.email" attribute="e-mail" class="mb-4" v-slot="props">
        <v-text-field
            type="email"
            label="E-Mail"
            prepend-icon="mdi-email"
            v-model="email"
            :error-messages="props.error"
            @input="input()"
            @blur="$v.email.$touch()"
        ></v-text-field>
    </form-group>
</template>

<script>
    import { required, email } from "vuelidate/lib/validators";

    export default {
        name: "EmailInput",

        props: {
            formName: {
                type: String,
                required: true
            }
        },

        data: () => ({
            email: ""
        }),

        validations: {
            email: {
                required,
                email
            }
        },

        methods: {
            input() {
                this.$v.email.$touch();
                this.$emit('input', this.email);
            }
        },

        created() {
            this.$validator.pushFields(this.formName, "emailInput", this.$v);
        }
    };
</script>