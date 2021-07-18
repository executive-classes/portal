<template>
    <TaxFields :model="biller" :strictTaxes="true" :formName="formName"></TaxFields>
</template>

<script>
    import TaxFields from "../taxComponents/TaxFields";

    export default {
        name: "BillerTaxFields",

        components: {
            TaxFields
        },

        props: {
            biller: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        }
    }
</script>