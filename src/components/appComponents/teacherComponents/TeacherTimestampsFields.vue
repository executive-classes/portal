<template>
    <v-row>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Criado em"
                prepend-icon="mdi-calendar-plus"
                :value="formatDate(teacher.created_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Alterado em"
                prepend-icon="mdi-calendar-import"
                :value="formatDate(teacher.updated_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Suspenso em"
                prepend-icon="mdi-calendar-remove"
                :value="teacher.inactive_at != null ? formatDate(teacher.inactive_at) : '-'"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Reativado em"
                prepend-icon="mdi-calendar-check"
                :value="teacher.reactive_at != null ? formatDate(teacher.reactive_at) : '-'"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "TeacherTimestampsFields",

        props: {
            teacher: {
                type: Object,
                required: true
            }
        },

        methods: {
            formatDate(date) {
                return this.$moment(date).format("DD/MM/YYYY, HH:mm:ss");
            }
        }
    };
</script>