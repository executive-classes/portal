<template>
    <v-select
        return-object
        label="Biller"
        v-model="biller"
        :items="billers"
        item-text="name"
        item-value="id"
        @change="$emit('change', biller)"
    ></v-select>
</template>

<script>
    export default {
        name: "BillerSelect",

        props: {
            customer_id: {
                required: true
            }
        },

        data: () => ({
            biller: {},
            billers: []
        }),

        created() {
            this.$http
                .get("billers", { params: { customer_id: this.customer_id } })
                .then(response => (this.billers = response.data))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>