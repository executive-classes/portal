<template>
    <base-card title="Alunos" icon="fa-user-graduate">
        <base-alert></base-alert>

        <base-table
            :headers="headers"
            :items="students"
            :search="search"
            :sort-by="['id']"
            :loading="loading"
        ></base-table>
    </base-card>
</template>

<script>
    export default {
        name: "Students",

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "email" },
                { text: "Nome", value: "name" },
                { text: "Status", value: "status" }
            ],
            students: [],
            loading: true,
        }),

        created() {
            this.$http
                .get("students")
                .then(response => {
                    this.students = response.data;
                    this.loading = false;
                })
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>