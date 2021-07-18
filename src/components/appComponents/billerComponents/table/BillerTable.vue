<template>
    <base-table :headers="headers" :items="billers" :sort-by="['id']" :loading="loading">
        <template slot="header">
            <v-btn rounded small class="ml-3" color="primary" :to="{name: 'billers.new'}">
                <v-icon>mdi-plus</v-icon>Biller
            </v-btn>
        </template>

        <template v-slot:item.address="{ item }">
            {{formatAddress(item.address)}}
        </template>

        <template v-slot:item.actions="{ item }">
            <BillerTableActions
                :biller="item"
                @cancel="cancel(item)"
                @reactivate="reactivate(item)"
            ></BillerTableActions>
        </template>
    </base-table>
</template>

<script>
    import BillerTableActions from "./BillerTableActions";
    import Biller from "@/domain/biller/Biller";
    import { formatter } from "@/mixins";

    export default {
        name: "BillerTable",

        components: {
            BillerTableActions
        },

        mixins: [formatter],

        props: {
            customer_id: {
                default: null
            }
        },

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "Nome", value: "name" },
                { text: "Documento", value: "tax.code" },
                { text: "Endereço", value: "address" },
                { text: "Status", value: "status.name" },
                { text: "Ações", value: "actions" }
            ],
            billers: [],
            loading: true
        }),

        methods: {
            getData() {
                let filters = {
                    ...(this.customer_id ? { customer_id: this.customer_id } : {})
                };

                this.$http
                    .get("billers", filters)
                    .then(response => {
                        this.billers = response.data;
                        this.loading = false;
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            cancel(biller) {
                biller = new Biller(biller);
                biller
                    .cancel()
                    .then(() => {
                        this.$alert.success("Biller cancelado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            reactivate(biller) {
                biller = new Biller(biller);
                biller
                    .reactivate()
                    .then(() => {
                        this.$alert.success("Biller reativado com sucesso!");
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