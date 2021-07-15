<template>
    <base-card :title="teacher.name" icon="fa-user-tie">
        <base-alert></base-alert>

        <v-stepper v-model="step">
            <v-stepper-header>
                <v-stepper-step :complete="step > 1" step="1">Insira o e-mail do novo professor</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step :complete="step > 2" step="2">Preencha as informações do usuário</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <form-group
                        :validator="$v.email"
                        attribute="e-mail"
                        class="mb-4"
                        v-slot="props"
                    >
                        <v-text-field
                            type="email"
                            label="E-Mail"
                            prepend-icon="mdi-email"
                            v-model="email"
                            :error-messages="props.error"
                            @input="$v.email.$touch()"
                            @blur="$v.email.$touch()"
                        ></v-text-field>
                    </form-group>

                    <v-btn color="primary" @click="searchUser()">Confirmar</v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <UserDataFields :user="teacher.user" formName="newUserForm"></UserDataFields>
                    <UserTaxFields :user="teacher.user" formName="newUserForm"></UserTaxFields>
                    <v-btn color="primary" @click="userSubmit()">Confirmar</v-btn>
                    <v-btn @click="step = 1">Voltar</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </base-card>
</template>

<script>
    import { required, email } from "vuelidate/lib/validators";
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import Teacher from "@/domain/teacher/Teacher";

    export default {
        name: "NewEmployee",

        components: {
            UserDataFields,
            UserTaxFields
        },

        data: () => ({
            step: 1,
            email: "",
            teacher: new Teacher()
        }),

        validations: {
            email: {
                required,
                email
            }
        },

        methods: {
            searchUser() {
                if (!this.$v.invalid) {
                    this.teacher.user
                        .searchByEmail(this.email)
                        .then(() => {
                            this.teacher.user.email = this.email;
                            this.step = 2;
                        })
                        .catch(error => this.$alert.error(error.message));
                }
            },
            userSubmit() {
                if (this.$validator.validate("newUserForm")) {
                    this.teacher
                        .create()
                        .then(() => {
                            this.$alert.success("Professor criado.");
                            this.$router.push({ name: "teachers.list" });
                        })
                        .catch(error => this.$alert.error(error.message));
                }
            }
        }
    };
</script>
