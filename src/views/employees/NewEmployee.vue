<template>
    <base-main-card title="Novo funcionário" icon="fa-user-tie">
        <base-alert></base-alert>

        <base-stepper :steps="steps" @finish="createEmployee">
            <template slot="1">
                <v-action :next="validateEmail"></v-action>
                <EmailInput formName="emailInputForm" @input="updateEmail"></EmailInput>
            </template>
            <template slot="2">
                <v-action :next="validateData"></v-action>
                <UserDataFields :user="employee.user" formName="userForm"></UserDataFields>
                <UserTaxFields :user="employee.user" formName="userForm"></UserTaxFields>
            </template>
            <template slot="3">
                <v-action :finish="validatePosition"></v-action>
                <EmployeePositionFields :employee="employee" formName="positionForm"></EmployeePositionFields>
            </template>
        </base-stepper>
    </base-main-card>
</template>

<script>
    import EmailInput from "@/components/genericComponents/inputs/EmailInput";
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import EmployeePositionFields from "@/components/appComponents/employeeComponents/EmployeePositionFields";
    import Employee from "@/domain/employee/Employee";

    export default {
        name: "NewEmployee",

        components: {
            EmailInput,
            UserDataFields,
            UserTaxFields,
            EmployeePositionFields
        },

        data: () => ({
            employee: new Employee(),
            steps: {
                1: "Insira o e-mail do novo funcionário",
                2: "Preencha as informações do usuário",
                3: "Defina o cargo do funcionário"
            }
        }),

        methods: {
            updateEmail(email) {
                this.employee.user.email = email;
            },

            validateEmail() {
                if (this.$validator.validate("emailInputForm")) {
                    return this.employee.user
                        .searchByEmail()
                        .then(() => Promise.resolve(true))
                        .catch(error => this.$alert.error(error.message));
                }
            },

            validateData() {
                return this.$validator.validate("userForm");
            },

            validatePosition() {
                return this.$validator.validate("positionForm");
            },

            createEmployee() {
                this.employee
                    .create()
                    .then(() => {
                        this.$alert.success("Funcionário criado.");
                        this.$router.push({ name: "employees.list" });
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        }
    };
</script>
