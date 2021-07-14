<template>
    <base-card :title="employee.name" icon="fa-user-tie">
        <base-alert></base-alert>

        <base-tabs>
            <v-tab>
                <v-icon left>fa-id-card</v-icon>Dados
            </v-tab>
            <v-tab>
                <v-icon left>fa-file-alt</v-icon>Documentos
            </v-tab>
            <v-tab>
                <v-icon left>fa-toggle-on</v-icon>Mudar Status
            </v-tab>
            <v-tab>
                <v-icon left>fa-user-edit</v-icon>Mudar Cargo
            </v-tab>
            <v-tab>
                <v-icon left>fa-cog</v-icon>Mudar Configurações
            </v-tab>

            <v-tab-item>
                <base-form
                    name="employeeData"
                    :args="{type: 'data'}"
                    title="Dados de Perfil"
                    @submit="submit($event)"
                >
                    <EmployeeTimestampsFields :employee="employee"></EmployeeTimestampsFields>
                    <UserDataFields :user="employee.user" formName="employeeData"></UserDataFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="employeeTax"
                    :args="{type: 'tax'}"
                    title="Documentos"
                    @submit="submit($event)"
                >
                    <UserTaxFields :user="employee.user" formName="employeeTax"></UserTaxFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="employeeStatus"
                    :args="{type: 'status'}"
                    title="Mudar Status"
                    @submit="submit($event)"
                >
                    <EmployeeStatusFields :employee="employee"></EmployeeStatusFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="employeePosition"
                    :args="{type: 'status'}"
                    title="Mudar cargo"
                    @submit="submit($event)"
                >
                    <EmployeePositionFields :employee="employee"></EmployeePositionFields>
                </base-form>
            </v-tab-item>
            <v-tab-item>
                <base-form
                    name="employeeSettings"
                    :args="{type: 'settings'}"
                    title="Configurações de sistema"
                    @submit="submit($event)"
                >
                    <UserSettingsFields :user="employee.user"></UserSettingsFields>
                </base-form>
            </v-tab-item>
        </base-tabs>
    </base-card>
</template>

<script>
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import UserSettingsFields from "@/components/appComponents/userComponents/UserSettingsFields";
    import EmployeeTimestampsFields from "@/components/appComponents/employeeComponents/EmployeeTimestampsFields";
    import EmployeeStatusFields from "../../components/appComponents/employeeComponents/EmployeeStatusFields";
    import EmployeePositionFields from "@/components/appComponents/employeeComponents/EmployeePositionFields";
    import Employee from "@/domain/employee/Employee";

    export default {
        name: "Employee",

        components: {
            UserDataFields,
            UserTaxFields,
            UserSettingsFields,
            EmployeeTimestampsFields,
            EmployeeStatusFields,
            EmployeePositionFields
        },

        data: () => ({
            employee: new Employee()
        }),

        methods: {
            submit(action) {
                this.employee
                    .update(action.type)
                    .then(() => this.$alert.success("Funcionário atualizado."))
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`employees/${this.$route.params.id}`)
                .then(response => this.employee.fill(response.data))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>