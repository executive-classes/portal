<template>
    <base-main-card title="Novo Biller" icon="fa-search-dollar">
        <base-alert></base-alert>

        <base-stepper :steps="steps" @finish="createBiller">
            <template slot="1">
                <v-action :next="validateData"></v-action>
                <BillerDataFields :biller="biller" formName="billerData"></BillerDataFields>
                <BillerTaxFields :biller="biller" formName="billerData"></BillerTaxFields>
            </template>
            <template slot="2">
                <v-action :finish="validateAddress"></v-action>
                <AddressFields :address="biller.address" formName="billerAddress"></AddressFields>
            </template>
            <template slot="3">
                <v-action :finish="validatePayment"></v-action>
                <BillerPaymentFields :biller="biller" formName="billerPayment"></BillerPaymentFields>
            </template>
        </base-stepper>
    </base-main-card>
</template>

<script>
    import BillerDataFields from "@/components/appComponents/billerComponents/BillerDataFields";
    import BillerTaxFields from "@/components/appComponents/billerComponents/BillerTaxFields";
    import BillerPaymentFields from "@/components/appComponents/billerComponents/BillerPaymentFields";
    import AddressFields from "@/components/appComponents/addressComponents/AddressFields";
    import Customer from "@/domain/customer/Customer";
    import Biller from "@/domain/biller/Biller";

    export default {
        name: "NewBiller",

        components: {
            BillerDataFields,
            BillerTaxFields,
            BillerPaymentFields,
            AddressFields
        },

        data: () => ({
            customer: new Customer(),
            biller: new Biller(),
            steps: {
                1: "Preencha os dados do biller",
                2: "Preencha o endereço do biller",
                3: "Escolha a forma de pagamento"
            }
        }),

        methods: {
            validateData() {
                return this.$validator.validate("billerData");
            },

            validateAddress() {
                return this.$validator.validate("billerAddress");
            },

            validatePayment() {
                return this.$validator.validate("billerPayment");
            },

            createBiller() {
                this.biller
                    .create()
                    .then(() => {
                        this.$alert.success("Biller criado.");
                        this.$router.push({
                            name: "customers.show",
                            params: { id: this.biller.customer.id }
                        });
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.customer.fill({ id: this.$route.params.customer_id });
            this.biller.fill({ customer: this.customer });
        }
    };
</script>
