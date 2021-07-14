<template>
    <v-row>
        <v-col cols="12">
            <v-select
                return-object
                label="Cargo"
                prepend-icon="mdi-clipboard-account-outline"
                v-model="employee.position"
                :items="positions"
                item-text="name"
                item-value="id"
            ></v-select>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "EmployeePositionFields",

        props: {
            employee: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            positions: []
        }),

        created() {
            this.$http.get("employees/positions").then(response => {
                this.positions = response.data;
            });
        }
    };
</script>
