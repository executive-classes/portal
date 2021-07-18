<template>
    <base-main-card title="Novo Professor" icon="fa-chalkboard-teacher">
        <base-alert></base-alert>

        <base-stepper :steps="steps" @finish="createTeacher">
            <template slot="1">
                <v-action :next="validateEmail"></v-action>
                <EmailInput formName="emailInputForm" @input="updateEmail"></EmailInput>
            </template>
            <template slot="2">
                <v-action :finish="validateData"></v-action>
                <UserDataFields :user="teacher.user" formName="userForm"></UserDataFields>
                <UserTaxFields :user="teacher.user" formName="userForm"></UserTaxFields>
            </template>
        </base-stepper>
    </base-main-card>
</template>

<script>
    import EmailInput from "@/components/genericComponents/inputs/EmailInput";
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import Teacher from "@/domain/teacher/Teacher";

    export default {
        name: "NewTeacher",

        components: {
            EmailInput,
            UserDataFields,
            UserTaxFields
        },

        data: () => ({
            teacher: new Teacher(),
            steps: {
                1: "Insira o e-mail do novo professor",
                2: "Preencha as informações do usuário"
            }
        }),

        methods: {
            updateEmail(email) {
                this.teacher.user.email = email;
            },

            validateEmail() {
                if (this.$validator.validate("emailInputForm")) {
                    return this.teacher.user
                        .searchByEmail()
                        .then(() => Promise.resolve(true))
                        .catch(error => this.$alert.error(error.message));
                }
            },

            validateData() {
                return this.$validator.validate("userForm");
            },

            createTeacher() {
                this.teacher
                    .create()
                    .then(() => {
                        this.$alert.success("Professor criado.");
                        this.$router.push({ name: "teachers.list" });
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        }
    };
</script>
