<template>
    <base-card title="Alunos" icon="fa-user-graduate">
        <base-alert :type="type" :alert="alert" :message="message"></base-alert>

        <span slot="header">
            <SearchInput
                :search="search"
                classes="mt-3"
                :details="false"
                @input="input => this.search = input"
            ></SearchInput>
        </span>

        <v-data-table
            :headers="headers"
            :items="students"
            :search="search"
            :sort-by="['id']"
            :loading="loading"
        ></v-data-table>
    </base-card>
</template>

<script>
    import BaseAlert from "@/components/commonComponents/BaseAlert";
    import BaseCard from "@/components/commonComponents/BaseCard";
    import SearchInput from "@/components/tableComponents/SearchInput";

    export default {
        name: "Students",

        components: {
            BaseAlert,
            BaseCard,
            SearchInput
        },

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "E-Mail", value: "email" },
                { text: "Nome", value: "name" },
                { text: "Status", value: "status" }
            ],
            students: [],
            search: "",
            loading: true,
            type: "danger",
            alert: false,
            message: ""
        }),

        methods: {
            error(message) {
                this.alert = true;
                this.message = message;
            }
        },

        created() {
            this.$http
                .get("students")
                .then(response => {
                    this.students = response.data;
                    this.loading = false;
                })
                .catch(error => this.error(error.message));
        }
    };
</script>