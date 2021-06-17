<template>
    <base-card :title="user.name" icon="fa-user">
        <base-alert :type="type" :alert="alert" :message="message"></base-alert>

        <v-tabs :vertical="vertical">
            <v-tab>
                <v-icon left>fa-id-card</v-icon>Dados
            </v-tab>

            <v-tab-item>
                <UserData :user="user" @submit="submit()"></UserData>
            </v-tab-item>
        </v-tabs>
    </base-card>
</template>

<script>
    import UserData from "./tabs/UserData";

    export default {
        name: "User",

        components: {
            UserData,
        },

        data: () => ({
            user: {},
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
                console.log(this.user);
                // this.$http
                //     .put("profile", this.user)
                //     .then(response => (this.user = response.data))
                //     .catch(error => this.error(error.message));
            }
        },

        created() {
            this.$http
                .get(`users/${this.$route.params.id}`)
                .then(response => (this.user = response.data))
                .catch(error => this.error(error.message));
        }
    };
</script>

<style>
    .v-tab {
        justify-content: start;
    }
</style>