<template>
    <base-main-card title="Clientes" icon="fa-users">
        <base-alert></base-alert>

        <base-table :headers="headers" :items="customers" :sort-by="['id']" :loading="loading">
            <span slot="header">
                <v-btn rounded small class="ml-3" color="primary" :to="{name: 'customers.new'}">
                    <v-icon>mdi-plus</v-icon>Cliente
                </v-btn>
            </span>

            <template v-slot:item.actions="{ item }">
                <CustomerTableActions
                    :customer="item"
                    @cancel="cancel(item)"
                    @reactivate="reactivate(item)"
                ></CustomerTableActions>
            </template>
        </base-table>
    </base-main-card>
</template>

<script>
    import CustomerTableActions from "@/components/appComponents/customerComponents/table/CustomerTableActions";
    import Customer from "@/domain/customer/Customer";

    export default {
        name: "Customers",

        components: {
            CustomerTableActions
        },

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "Nome", value: "name" },
                { text: "Documento", value: "tax.code" },
                { text: "Status", value: "status.name" },
                { text: "Ações", value: "actions" }
            ],
            customers: [],
            loading: true
        }),

        methods: {
            getData() {
                this.$http
                    .get("customers")
                    .then(response => {
                        this.customers = response.data;
                        this.loading = false;
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            cancel(customer) {
                customer = new Customer(customer);
                customer
                    .cancel()
                    .then(() => {
                        this.$alert.success("Clientes cancelado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            reactivate(customer) {
                customer = new Customer(customer);
                customer
                    .reactivate()
                    .then(() => {
                        this.$alert.success("Cliente reativado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.getData();
        }
    };
</script>
