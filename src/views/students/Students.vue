<template>
    <base-main-card title="Alunos" icon="fa-user-graduate">
        <base-alert></base-alert>

        <base-table :headers="headers" :items="students" :sort-by="['id']" :loading="loading">
        </base-table>
    </base-main-card>
</template>

<script>

    export default {
        name: "Students",

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "user.email" },
                { text: "Nome", value: "user.name" },
                { text: "Status", value: "status.name" }
            ],
            students: [],
            loading: true
        }),


        methods: {
            getData() {
                this.$http
                    .get("students")
                    .then(response => {
                        this.students = response.data;
                        this.loading = false;
                    })
                    .catch(error => this.$alert.error(error.message));
            },
        },

        created() {
            this.getData();
        }
    }
</script>