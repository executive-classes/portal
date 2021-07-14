<template>
    <base-card title="Funcionários" icon="fa-user-tie">
        <base-alert></base-alert>

        <span slot="header">
            <v-btn class="mt-2" text color="primary" :to="{name: 'employees.create'}">
                <v-icon>mdi-plus</v-icon>Funcionário
            </v-btn>
        </span>

        <base-table :headers="headers" :items="employees" :sort-by="['id']" :loading="loading">
            <template v-slot:item.actions="{ item }">
                <v-btn
                    icon
                    color="primary"
                    :to="{name: 'employees.show', params: {id: item.id}}"
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
    import Employee from "@/domain/employee/Employee";

    export default {
        name: "Employees",

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "user.email" },
                { text: "Nome", value: "user.name" },
                { text: "Status", value: "status.name" },
                { text: "Cargo", value: "position.name" },
                { text: "Ações", value: "actions" }
            ],
            employees: [],
            loading: true
        }),

        methods: {
            getData() {
                this.$http
                    .get("employees")
                    .then(response => {
                        this.employees = response.data;
                        this.loading = false;
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            cancel(employee) {
                employee = new Employee(employee);
                employee
                    .cancel()
                    .then(() => {
                        this.$alert.success("Funcionário cancelado com sucesso!");
                        this.getData();
                    })
                    .catch(error => this.$alert.error(error.message));
            },
            reactivate(employee) {
                employee = new Employee(employee);
                employee
                    .reactivate()
                    .then(() => {
                        this.$alert.success("Funcionário reativado com sucesso!");
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