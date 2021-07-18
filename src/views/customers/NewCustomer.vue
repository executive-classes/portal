<template>
    <base-main-card title="Novo Cliente" icon="fa-users">
        <base-alert></base-alert>

        <base-stepper :steps="steps" @finish="createCustomer">
            <template slot="1">
                <v-action :next="validateData"></v-action>
                <CustomerDataFields :customer="customer" formName="customerData"></CustomerDataFields>
                <CustomerTaxFields :customer="customer" formName="customerData"></CustomerTaxFields>
            </template>
            <template slot="2">
                <v-action :finish="validateAddress"></v-action>
                <AddressFields :address="customer.address" formName="customerAddress"></AddressFields>
            </template>
        </base-stepper>
    </base-main-card>
</template>

<script>
    import CustomerDataFields from "@/components/appComponents/customerComponents/CustomerDataFields";
    import CustomerTaxFields from "@/components/appComponents/customerComponents/CustomerTaxFields";
    import AddressFields from "@/components/appComponents/addressComponents/AddressFields";
    import Customer from "@/domain/customer/Customer";

    export default {
        name: "NewCustomer",

        components: {
            CustomerDataFields,
            CustomerTaxFields,
            AddressFields
        },

        data: () => ({
            customer: new Customer(),
            steps: {
                1: "Preencha os dados do cliente",
                2: "Preencha o endereço do cliente"
            }
        }),

        methods: {
            validateData() {
                return this.$validator.validate("customerData");
            },

            validateAddress() {
                return this.$validator.validate("customerAddress");
            },

            createCustomer() {
                this.customer
                    .create()
                    .then(() => {
                        this.$alert.success("Cliente criado.");
                        this.$router.push({ name: "customers.list" });
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        }
    };
</script>
