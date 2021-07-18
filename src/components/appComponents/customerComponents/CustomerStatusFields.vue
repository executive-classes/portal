<template>
    <v-row>
        <v-col cols="12">
            <v-select
                return-object
                label="Status"
                prepend-icon="mdi-toggle-switch-outline"
                v-model="customer.status"
                :items="status"
                item-text="name"
                item-value="id"
            ></v-select>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "CustomerStatusFields",

        props: {
            customer: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            status: []
        }),

        created() {
            this.$http.get("customers/status").then(response => {
                this.status = response.data;
            });
        }
    };
</script>
