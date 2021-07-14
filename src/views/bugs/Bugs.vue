<template>
    <base-card title="Bugs" icon="fa-bug">
        <base-alert></base-alert>

        <base-table
            :headers="headers"
            :items="bugs"
            :customFilter="filter"
            :sortBy="['date']"
            :sortDesc="['true']"
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
        </base-table>
    </base-card>
</template>

<script>
    import RequestDialog from "@/components/appComponents/bugsComponents/RequestDialog";
    import DataDialog from "@/components/appComponents/bugsComponents/DataDialog";
    import ErrorDialog from "@/components/appComponents/bugsComponents/ErrorDialog";

    export default {
        name: "Bugs",

        components: {
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
            loading: true
        }),

        methods: {
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
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>