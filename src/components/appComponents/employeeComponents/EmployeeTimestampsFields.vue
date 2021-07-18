<template>
    <v-row>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Criado em"
                prepend-icon="mdi-calendar-plus"
                :value="formatDate(employee.created_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Alterado em"
                prepend-icon="mdi-calendar-import"
                :value="formatDate(employee.updated_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Suspenso em"
                prepend-icon="mdi-calendar-remove"
                :value="employee.inactive_at != null ? formatDate(employee.inactive_at) : '-'"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Reativado em"
                prepend-icon="mdi-calendar-check"
                :value="employee.reactive_at != null ? formatDate(employee.reactive_at) : '-'"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    import { formatter } from "@/mixins";

    export default {
        name: "EmployeeTimestampsFields",

        mixins: [formatter],

        props: {
            employee: {
                type: Object,
                required: true
            }
        }
    };
</script>