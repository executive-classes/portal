<template>
    <v-row>
        <v-col cols="12">
            <v-select
                return-object
                label="Status"
                prepend-icon="mdi-toggle-switch-outline"
                v-model="student.status"
                :items="status"
                item-text="name"
                item-value="id"
            ></v-select>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "StudentStatusFields",

        props: {
            student: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            status: []
        }),

        created() {
            this.$http.get("students/status").then(response => {
                this.status = response.data;
            });
        }
    };
</script>
