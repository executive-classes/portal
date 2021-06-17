<template>
    <base-card title="Usuários" icon="fa-user">
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
            :items="users"
            :search="search"
            :sort-by="['id']"
            :loading="loading"
        >
            <template v-slot:item.actions="{ item }">
                <router-link :to="{name: 'user', params: {id: item.id}}">
                    <v-icon small class="mr-2">mdi-pencil</v-icon>
                </router-link>
            </template>
        </v-data-table>
    </base-card>
</template>

<script>
    import BaseAlert from "@/components/commonComponents/BaseAlert";
    import BaseCard from "@/components/commonComponents/BaseCard";
    import SearchInput from "@/components/tableComponents/SearchInput";

    export default {
        name: "Users",

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
                { text: "Status", value: "status" },
                { text: "Ações", value: "actions" }
            ],
            users: [],
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
                .get("users")
                .then(response => {
                    this.users = response.data;
                    this.loading = false;
                })
                .catch(error => this.error(error.message));
        }
    };
</script>