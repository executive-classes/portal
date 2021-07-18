<template>
    <base-main-card :title="biller.name" icon="fa-search-dollar">
        <base-alert></base-alert>

        <base-tabs>
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
                    <v-icon left>fa-money-check-alt</v-icon>Mudar Pagamento
                </v-tab>
            </template>
        
            <template slot="content">
                <v-tab-item>
                    <base-form
                        name="billerData"
                        :args="{type: 'data'}"
                        title="Dados"
                        @submit="submit($event)"
                    >
                        <BillerTimestampsFields :biller="biller"></BillerTimestampsFields>
                        <BillerDataFields :biller="biller" formName="billerData"></BillerDataFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="billerTax"
                        :args="{type: 'tax'}"
                        title="Documentos"
                        @submit="submit($event)"
                    >
                        <BillerTaxFields :biller="biller" formName="billerTax"></BillerTaxFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="billerAddress"
                        :args="{type: 'address'}"
                        title="Endereço"
                        @submit="submit($event)"
                    >
                        <AddressFields :address="biller.address" formName="billerAddress"></AddressFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="billerStatus"
                        :args="{type: 'status'}"
                        title="Status"
                        @submit="submit($event)"
                    >
                        <BillerStatusFields :biller="biller" formName="billerStatus"></BillerStatusFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="billerPayment"
                        :args="{type: 'payment'}"
                        title="Pagamento"
                        @submit="submit($event)"
                    >
                        <BillerPaymentFields :biller="biller" formName="billerPayment"></BillerPaymentFields>
                    </base-form>
                </v-tab-item>
            </template>
        </base-tabs>
    </base-main-card>
</template>

<script>
    import BillerTimestampsFields from "@/components/appComponents/billerComponents/BillerTimestampsFields";
    import BillerDataFields from "@/components/appComponents/billerComponents/BillerDataFields";
    import BillerTaxFields from "@/components/appComponents/billerComponents/BillerTaxFields";
    import BillerStatusFields from "@/components/appComponents/billerComponents/BillerStatusFields";
    import BillerPaymentFields from "@/components/appComponents/billerComponents/BillerPaymentFields";
    import AddressFields from "@/components/appComponents/addressComponents/AddressFields";
    import Biller from "@/domain/biller/Biller";

    export default {
        name: "Biller",

        components: {
            BillerTimestampsFields,
            BillerDataFields,
            BillerTaxFields,
            BillerStatusFields,
            BillerPaymentFields,
            AddressFields
        },

        data: () => ({
            biller: new Biller()
        }),

        methods: {
            submit(action) {
                this.biller
                    .update(action.type)
                    .then(() => this.$alert.success("Biller atualizado."))
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`billers/${this.$route.params.biller_id}`)
                .then(response => this.biller.fill(response.data))
                .catch(error => this.$alert.error(error.message));
        }
    }
</script>