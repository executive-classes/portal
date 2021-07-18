<template>
    <v-row>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Criado em"
                prepend-icon="mdi-calendar-plus"
                :value="formatDate(biller.created_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Alterado em"
                prepend-icon="mdi-calendar-import"
                :value="formatDate(biller.updated_at)"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Suspenso em"
                prepend-icon="mdi-calendar-remove"
                :value="biller.inactive_at != null ? formatDate(biller.inactive_at) : '-'"
            ></v-text-field>
        </v-col>
        <v-col cols="6" md="3">
            <v-text-field
                readonly
                label="Reativado em"
                prepend-icon="mdi-calendar-check"
                :value="biller.reactive_at != null ? formatDate(biller.reactive_at) : '-'"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
    import { formatter } from "@/mixins";

    export default {
        name: "BillerTimestampsFields",

        mixins: [formatter],

        props: {
            biller: {
                type: Object,
                required: true
            }
        }
    }
</script>