<template>
    <base-table :headers="headers" :items="students" :sort-by="['id']" :loading="loading">
        <template slot="header" v-if="customer_id">
            <v-btn
                rounded
                small
                class="ml-3"
                color="primary"
                :to="{name: 'students.new', params: {customer_id: $route.params.customer_id}}"
            >
                <v-icon>mdi-plus</v-icon>Aluno
            </v-btn>
        </template>

        <template v-slot:item.actions="{ item }">
            <StudentTableActions
                :student="item"
                @cancel="cancel(item)"
                @reactivate="reactivate(item)"
            ></StudentTableActions>
        </template>
    </base-table>
</template>

<script>
    import StudentTableActions from "./StudentTableActions";
    import Student from "@/domain/student/Student";

    export default {
        name: "StudentTable",

        components: {
            StudentTableActions
        },

        props: {
            customer_id: {
                default: null
            }
        },

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "user.email" },
                { text: "Nome", value: "user.name" },
                { text: "Status", value: "status.name" },
                { text: "Ações", value: "actions" }
            ],
            students: [],
            loading: true
        }),

        methods: {
            getData() {
                let filters = {
                    ...(this.customer_id ? { customer_id: this.customer_id } : {})
                };

                this.$http
                    .get("students", filters)
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
    };
</script>