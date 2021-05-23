<template>
    <base-card title="Bugs" icon="fa-bug">
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
            :items="bugs"
            :search="search"
            :custom-filter="filter"
            :sort-by="['date']"
            :sort-desc="['true']"
            :loading="loading"
        >
            <!-- Date -->
            <template v-slot:item.date="{item}">{{formatDate(item.date)}}</template>

            <!-- User -->
            <template v-slot:item.user="{item}">
                {{item.user != null ? item.user.email : 'Visitante'}}
                <small
                    v-if="item.cross_user != null"
                >{{item.cross_user.email}}</small>
            </template>

            <!-- Request -->
            <template v-slot:item.request="{item}">
                <RequestDialog :bug="item"></RequestDialog>
            </template>

            <!-- Request Data -->
            <template v-slot:item.data="{item}">
                <DataDialog :data="item.data.length == 0 ? {} : item.data"></DataDialog>
            </template>

            <!-- Error Data -->
            <template v-slot:item.error="{item}">
                <ErrorDialog :error="item.error"></ErrorDialog>
            </template>
        </v-data-table>
    </base-card>
</template>

<script>
    import BaseAlert from "@/components/commonComponents/BaseAlert";
    import BaseCard from "@/components/commonComponents/BaseCard";
    import SearchInput from "@/components/tableComponents/SearchInput";
    import RequestDialog from "@/components/bugsComponents/RequestDialog";
    import DataDialog from "@/components/bugsComponents/DataDialog";
    import ErrorDialog from "@/components/bugsComponents/ErrorDialog";

    export default {
        name: "Bugs",

        components: {
            BaseAlert,
            BaseCard,
            SearchInput,
            RequestDialog,
            DataDialog,
            ErrorDialog
        },

        data: () => ({
            headers: [
                { text: "Id", value: "id", sortable: false },
                { text: "Data", value: "date", filterable: false },
                { text: "Rota", value: "route" },
                { text: "Usuário", value: "user" },
                {
                    text: "Requisição",
                    value: "request",
                    filterable: false,
                    sortable: false,
                    align: "center"
                },
                {
                    text: "Dados",
                    value: "data",
                    filterable: false,
                    sortable: false,
                    align: "center"
                },
                {
                    text: "Erro",
                    value: "error",
                    filterable: false,
                    sortable: false,
                    align: "center"
                }
            ],
            bugs: [],
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
            },

            formatDate(date) {
                return this.$moment(date).format("DD/MM/YYYY, HH:mm:ss ");
            },

            filter(value, search, item) {
                // Check if the value is null
                // Only can be null if was the user column
                if (value == null) {
                    value = "Visitante";
                }

                // Check if the value is the user and its not a guest (visitante)
                if (value == item.user && value != "Visitante") {
                    // Check if the search matches with the cross user (if it exists)
                    if (
                        item.cross_user != null &&
                        item.cross_user.email.includes(search)
                    ) {
                        return true;
                    }

                    value = item.user.email;
                }

                return value.toString().includes(search);
            }
        },

        created() {
            this.$http
                .get("logs/bugs")
                .then(response => {
                    this.bugs = response.data;
                    this.loading = false;
                })
                .catch(error => this.error(error.message));
        }
    };
</script>