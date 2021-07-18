<template>
    <TaxFields :model="customer" :strictTaxes="true" :formName="formName"></TaxFields>
</template>

<script>
    import TaxFields from "../taxComponents/TaxFields";

    export default {
        name: "CustomerTaxFields",

        components: {
            TaxFields
        },

        props: {
            customer: {
                type: Object,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        }
    };
</script>