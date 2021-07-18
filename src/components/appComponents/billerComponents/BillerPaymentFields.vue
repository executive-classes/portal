<template>
    <v-row>
        <v-col cols="12" sm="6">
            <form-group :validator="$v.biller.interval" attribute="intervalo" v-slot="props">
                <v-select
                    return-object
                    label="Intervalo de Pagametno"
                    prepend-icon="mdi-calendar-clock"
                    v-model="biller.interval"
                    :items="intervals"
                    item-text="name"
                    item-value="id"
                    :error-messages="props.error"
                    @change="$v.biller.interval.$touch()"
                    @blur="$v.biller.interval.$touch()"
                ></v-select>
            </form-group>
        </v-col>
        <v-col cols="12" sm="6">
            <form-group
                :validator="$v.biller.payment_method"
                attribute="método de pagamento"
                v-slot="props"
            >
                <v-select
                    return-object
                    label="Método de Pagamento"
                    prepend-icon="mdi-cash"
                    v-model="biller.payment_method"
                    :items="methods"
                    item-text="name"
                    item-value="id"
                    :error-messages="props.error"
                    @change="$v.biller.payment_method.$touch()"
                    @blur="$v.biller.payment_method.$touch()"
                ></v-select>
            </form-group>
        </v-col>
    </v-row>
</template>

<script>
    import { required } from "vuelidate/lib/validators";

    export default {
        name: "BillerPaymentFields",

        props: {
            biller: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },

        data: () => ({
            intervals: [],
            methods: []
        }),

        validations: {
            biller: {
                interval: {
                    required
                },
                payment_method: {
                    required
                }
            }
        },

        created() {
            this.$validator.pushFields(this.formName, "billerPayment", this.$v);

            this.$http.get("payments/intervals").then(response => {
                this.intervals = response.data;
            });

            this.$http.get("payments/methods").then(response => {
                this.methods = response.data;
            });
        }
    };
</script>