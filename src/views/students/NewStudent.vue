<template>
    <base-main-card title="Novo Aluno" icon="fa-user-graduate">
        <base-alert></base-alert>

        <base-stepper :steps="steps" @finish="createStudent">
            <template slot="1">
                <v-action :next="validateEmail"></v-action>
                <EmailInput formName="emailInputForm" @input="updateEmail"></EmailInput>
            </template>
            <template slot="2">
                <v-action :next="validateData"></v-action>
                <UserDataFields :user="student.user" formName="userForm"></UserDataFields>
                <UserTaxFields :user="student.user" formName="userForm"></UserTaxFields>
            </template>
            <template slot="3">
                <v-action :finish="validateData"></v-action>
                <BillerSelect
                    :customer_id="student.customer.id"
                    formName="BillerForm"
                    @change="updateBiller"
                ></BillerSelect>
            </template>
        </base-stepper>
    </base-main-card>
</template>

<script>
    import EmailInput from "@/components/genericComponents/inputs/EmailInput";
    import BillerSelect from "../../components/genericComponents/selects/BillerSelect";
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import Customer from "@/domain/customer/Customer";
    import Student from "@/domain/student/Student";

    export default {
        name: "NewStudent",

        components: {
            EmailInput,
            BillerSelect,
            UserDataFields,
            UserTaxFields
        },

        data: () => ({
            customer: new Customer(),
            student: new Student(),
            steps: {
                1: "Insira o e-mail do novo aluno",
                2: "Preencha os dados do aluno",
                3: "Escolha o endereço de cobrança"
            }
        }),

        methods: {
            updateEmail(email) {
                this.student.user.email = email;
            },

            validateEmail() {
                if (this.$validator.validate("emailInputForm")) {
                    return this.student.user
                        .searchByEmail()
                        .then(() => Promise.resolve(true))
                        .catch(error => this.$alert.error(error.message));
                }
            },

            validateData() {
                return this.$validator.validate("userForm");
            },

            updateBiller(biller) {
                console.log(biller);
                this.student.biller.fill(biller);
            },

            createStudent() {
                this.student
                    .create()
                    .then(() => {
                        this.$alert.success("Aluno criado.");
                        this.$router.push({
                            name: "customers.show",
                            params: { id: this.student.customer.id }
                        });
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.customer.fill({ id: this.$route.params.customer_id });
            this.student.fill({ customer: this.customer });
        }
    };
</script>
