<template>
    <base-card title="Professores" icon="fa-chalkboard-teacher">
        <base-alert></base-alert>

        <base-table
            :headers="headers"
            :items="teachers"
            :sort-by="['id']"
            :loading="loading"
        >
            <template v-slot:item.actions="{ item }">
                <router-link :to="{name: 'teacher', params: {id: item.id}}">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                </router-link>
            </template>
        </base-table>
    </base-card>
</template>

<script>

    export default {
        name: "Teachers",

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "email" },
                { text: "Nome", value: "name" },
                { text: "Status", value: "status" },
                { text: "Ações", value: "actions" }
            ],
            teachers: [],
            loading: true,
        }),

        created() {
            this.$http
                .get("teachers")
                .then(response => {
                    this.teachers = response.data;
                    this.loading = false;
                })
                .catch(error => this.$alert.error(error.message));
        }
    }
</script>