<template>
    <base-main-card title="Funcionários" icon="fa-user-tie">
        <base-alert></base-alert>

        <base-table :headers="headers" :items="employees" :sort-by="['id']" :loading="loading">
            <span slot="header">
                <v-btn rounded small class="ml-3" color="primary" :to="{name: 'employees.new'}">
                    <v-icon>mdi-plus</v-icon>Funcionário
                </v-btn>
            </span>

            <template v-slot:item.actions="{ item }">
                <EmployeeTableActions
                    :employee="item"
                    @cancel="cancel(item)"
                    @reactivate="reactivate(item)"
                ></EmployeeTableActions>
            </template>
        </base-table>
    </base-main-card>
</template>

<script>
    import EmployeeTableActions from "@/components/appComponents/employeeComponents/table/EmployeeTableActions";
    import Employee from "@/domain/employee/Employee";

    export default {
        name: "Employees",

        components: {
            EmployeeTableActions
        },

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