<template>
    <TaxFields :model="user" :formName="formName"></TaxFields>
</template>

<script>
    import TaxFields from "../taxComponents/TaxFields";

    export default {
        name: "UserTaxFields",

        components: {
            TaxFields
        },

        props: {
            user: {
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