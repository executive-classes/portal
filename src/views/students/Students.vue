<template>
    <base-card title="Alunos" icon="fa-user-graduate">
        <base-alert></base-alert>

        <base-table :headers="headers" :items="students" :sort-by="['id']" :loading="loading">
            <template v-slot:item.actions="{ item }">
                <v-btn
                    icon
                    color="primary"
                    :to="{name: 'students.show', params: {id: item.id}}"
                    :disabled="item.status.id != 'active'"
                >
                    <v-icon small>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="danger" @click="cancel(item)" v-if="item.status.id == 'active'">
                    <v-icon small>mdi-block-helper</v-icon>
                </v-btn>
                <v-btn icon color="success" @click="reactivate(item)" v-else>
                    <v-icon small>mdi-check</v-icon>
                </v-btn>
            </template>
        </base-table>
    </base-card>
</template>

<script>
    import Student from "@/domain/student/Student";

    export default {
        name: "Students",

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "user.email" },
                { text: "Nome", value: "user.name" },
                { text: "Status", value: "status.name" },
                { text: "Ações", value: "actions" }
            ],
            students: [],
            loading: true,
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
            cancel(student) {
                student = new Student(student);
                student
                    .cancel()
                    .then(() => {
                        this.$alert.success("Aluno cancelado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            reactivate(student) {
                student = new Student(student);
                student
                    .reactivate()
                    .then(() => {
                        this.$alert.success("Aluno reativado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.getData();
        }
    }
</script>