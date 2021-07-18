<template>
    <base-main-card :title="customer.name" icon="fa-users">
        <base-alert></base-alert>

        <base-tabs :vertical="false">
            <template slot="header">
                <v-tab>
                    <v-icon left>fa-id-card</v-icon>Dados
                </v-tab>
                <v-tab>
                    <v-icon left>fa-file-alt</v-icon>Documentos
                </v-tab>
                <v-tab>
                    <v-icon left>fa-map-marked-alt</v-icon>Endereço
                </v-tab>
                <v-tab>
                    <v-icon left>fa-toggle-on</v-icon>Mudar Status
                </v-tab>
                <v-tab>
                    <v-icon left>fa-search-dollar</v-icon>Billers
                </v-tab>
                <v-tab>
                    <v-icon left>fa-user-graduate</v-icon>Alunos
                </v-tab>
            </template>

            <template slot="content">
                <v-tab-item>
                    <base-form
                        name="customerData"
                        :args="{type: 'data'}"
                        title="Dados de Perfil"
                        @submit="submit($event)"
                    >
                        <CustomerTimestampsFields :customer="customer"></CustomerTimestampsFields>
                        <CustomerDataFields :customer="customer" formName="customerData"></CustomerDataFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="customerTax"
                        :args="{type: 'tax'}"
                        title="Documentos"
                        @submit="submit($event)"
                    >
                        <CustomerTaxFields :customer="customer" formName="customerTax"></CustomerTaxFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="customerAddress"
                        :args="{type: 'address'}"
                        title="Endereço"
                        @submit="submit($event)"
                    >
                        <AddressFields :address="customer.address" formName="customerAddress"></AddressFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="customerStatus"
                        :args="{type: 'status'}"
                        title="Status"
                        @submit="submit($event)"
                    >
                        <CustomerStatusFields :customer="customer" formName="customerStatus"></CustomerStatusFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-card title="Billers" subtitle="Endereços de cobrança do cliente">
                        <BillerTable :customer_id="customer.id"></BillerTable>
                    </base-card>
                </v-tab-item>
                <v-tab-item>
                    <base-card title="Alunos" subtitle="Estudantes vinculados ao cliente">
                        <StudentTable :customer_id="customer.id"></StudentTable>
                    </base-card>
                </v-tab-item>
            </template>
        </base-tabs>
    </base-main-card>
</template>

<script>
    import CustomerTimestampsFields from "@/components/appComponents/customerComponents/CustomerTimestampsFields";
    import CustomerDataFields from "@/components/appComponents/customerComponents/CustomerDataFields";
    import CustomerTaxFields from "@/components/appComponents/customerComponents/CustomerTaxFields";
    import CustomerStatusFields from "@/components/appComponents/customerComponents/CustomerStatusFields";
    import AddressFields from "@/components/appComponents/addressComponents/AddressFields";
    import BillerTable from "@/components/appComponents/billerComponents/table/BillerTable";
    import StudentTable from "@/components/appComponents/studentComponents/table/StudentTable";
    import Customer from "@/domain/customer/Customer";

    export default {
        name: "Customer",

        components: {
            CustomerTimestampsFields,
            CustomerDataFields,
            CustomerTaxFields,
            CustomerStatusFields,
            AddressFields,
            BillerTable,
            StudentTable
        },

        data: () => ({
            customer: new Customer()
        }),

        methods: {
            submit(action) {
                this.customer
                    .update(action.type)
                    .then(() => this.$alert.success("Cliente atualizado."))
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`customers/${this.$route.params.customer_id}`)
                .then(response => this.customer.fill(response.data))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>