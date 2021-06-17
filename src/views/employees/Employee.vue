<template>
    <base-card :title="employee.name" icon="fa-user-tie">
        <base-alert :type="type" :alert="alert" :message="message"></base-alert>

        <v-tabs :vertical="vertical">
            <v-tab>
                <v-icon left>fa-id-card</v-icon>Dados
            </v-tab>
            <v-tab>
                <v-icon left>fa-toggle-on</v-icon>Mudar Status
            </v-tab>
            <v-tab>
                <v-icon left>fa-user-edit</v-icon>Mudar Cargo
            </v-tab>

            <v-tab-item>
                <EmployeeData :employee="employee" @submit="submit()"></EmployeeData>
            </v-tab-item>
            <v-tab-item>
                <EmployeeStatus :employee="employee" @submit="submit()"></EmployeeStatus>
            </v-tab-item>
            <v-tab-item>
                <EmployeePosition :employee="employee" @submit="submit()"></EmployeePosition>
            </v-tab-item>
        </v-tabs>
    </base-card>
</template>

<script>
    import EmployeeData from "./tabs/EmployeeData";
    import EmployeeStatus from "./tabs/EmployeeStatus";
    import EmployeePosition from "./tabs/EmployeePosition";

    export default {
        name: "User",

        components: {
            EmployeeData,
            EmployeeStatus,
            EmployeePosition,
        },

        data: () => ({
            employee: {},
            type: "danger",
            alert: false,
            message: ""
        }),

        computed: {
            vertical() {
                if (["xs", "sm"].includes(this.$vuetify.breakpoint.name)) {
                    return false;
                }

                return true;
            }
        },

        methods: {
            error(message) {
                this.type = "danger";
                this.alert = true;
                this.message = message;
            },

            submit() {
                console.log(this.employee);
                // this.$http
                //     .put("employees", this.employee)
                //     .then(response => (this.employee = response.data))
                //     .catch(error => this.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`employees/${this.$route.params.id}`)
                .then(response => (this.employee = response.data))
                .catch(error => this.error(error.message));
        }
    };
</script>

<style>
    .v-tab {
        justify-content: start;
    }
</style>