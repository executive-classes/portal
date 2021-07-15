<template>
    <base-card title="Professores" icon="fa-chalkboard-teacher">
        <base-alert></base-alert>

        <span slot="header">
            <v-btn class="mt-2" text color="primary" :to="{name: 'teachers.create'}">
                <v-icon>mdi-plus</v-icon>Professor
            </v-btn>
        </span>

        <base-table :headers="headers" :items="teachers" :sort-by="['id']" :loading="loading">
            <template v-slot:item.actions="{ item }">
                <v-btn
                    icon
                    color="primary"
                    :to="{name: 'teachers.show', params: {id: item.id}}"
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
    import Teacher from "@/domain/teacher/Teacher";

    export default {
        name: "Teachers",

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