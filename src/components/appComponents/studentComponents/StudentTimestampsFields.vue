<template>
    <v-row>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Criado em"
                prepend-icon="mdi-calendar-plus"
                :value="formatDate(student.created_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Alterado em"
                prepend-icon="mdi-calendar-import"
                :value="formatDate(student.updated_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Suspenso em"
                prepend-icon="mdi-calendar-remove"
                :value="student.inactive_at != null ? formatDate(student.inactive_at) : '-'"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Reativado em"
                prepend-icon="mdi-calendar-check"
                :value="student.reactive_at != null ? formatDate(student.reactive_at) : '-'"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    import { formatter } from "@/mixins";

    export default {
        name: "StudentTimestampsFields",

        mixins: [formatter],

        props: {
            student: {
                type: Object,
                required: true
            }
        }
    };
</script>