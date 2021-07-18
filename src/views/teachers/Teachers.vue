<template>
    <base-main-card title="Professores" icon="fa-chalkboard-teacher">
        <base-alert></base-alert>

        <base-table :headers="headers" :items="teachers" :sort-by="['id']" :loading="loading">
            <span slot="header">
                <v-btn rounded small class="ml-3" color="primary" :to="{name: 'teachers.new'}">
                    <v-icon>mdi-plus</v-icon>Professor
                </v-btn>
            </span>

            <template v-slot:item.actions="{ item }">
                <TeacherTableActions
                    :teacher="item"
                    @cancel="cancel(item)"
                    @reactivate="reactivate(item)"
                ></TeacherTableActions>
            </template>
        </base-table>
    </base-main-card>
</template>

<script>
    import TeacherTableActions from "@/components/appComponents/teacherComponents/table/TeacherTableActions";
    import Teacher from "@/domain/teacher/Teacher";

    export default {
        name: "Teachers",

        components: {
            TeacherTableActions
        },

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "user.email" },
                { text: "Nome", value: "user.name" },
                { text: "Status", value: "status.name" },
                { text: "Ações", value: "actions" }
            ],
            teachers: [],
            loading: true,
        }),

        methods: {
            getData() {
                this.$http
                    .get("teachers")
                    .then(response => {
                        this.teachers = response.data;
                        this.loading = false;
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            cancel(teacher) {
                teacher = new Teacher(teacher);
                teacher
                    .cancel()
                    .then(() => {
                        this.$alert.success("Professor cancelado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            reactivate(teacher) {
                teacher = new Teacher(teacher);
                teacher
                    .reactivate()
                    .then(() => {
                        this.$alert.success("Professor reativado com sucesso!");
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