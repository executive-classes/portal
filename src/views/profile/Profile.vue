<template>
    <base-card :title="user.name" icon="fa-user">
        <base-alert :alert="alert"></base-alert>

        <v-tabs :vertical="vertical">
            <v-tab>
                <v-icon left>fa-id-card</v-icon>Dados
            </v-tab>
            <v-tab>
                <v-icon left>fa-file-alt</v-icon>Documentos
            </v-tab>
            <v-tab>
                <v-icon left>fa-lock</v-icon>Alterar Senha
            </v-tab>
            <v-tab>
                <v-icon left>fa-cog</v-icon>Configurações
            </v-tab>

            <v-tab-item>
                <ProfileData :user="user" @submit="submit($event)"></ProfileData>
            </v-tab-item>
            <v-tab-item>
                <ProfileTax :user="user" @submit="submit($event)"></ProfileTax>
            </v-tab-item>
            <v-tab-item>
                <ProfilePassword :user="user" @submit="submit($event)"></ProfilePassword>
            </v-tab-item>
            <v-tab-item>
                <ProfileSettings :user="user" @submit="submit($event)"></ProfileSettings>
            </v-tab-item>
        </v-tabs>
    </base-card>
</template>

<script>
    import ProfileData from "./tabs/ProfileData";
    import ProfileTax from "./tabs/ProfileTax";
    import ProfilePassword from "./tabs/ProfilePassword";
    import ProfileSettings from "./tabs/ProfileSettings";
    import Alert from "@/domain/alert/Alert";
    import User from "@/domain/user/User";

    export default {
        name: "Profile",

        components: {
            ProfileData,
            ProfileTax,
            ProfilePassword,
            ProfileSettings
        },

        data: () => ({
            user: {},
            alert: new Alert()
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
            submit(action) {
                this.user
                    .update(action)
                    .then(response => {
                        this.user = new User(response.data);
                        this.alert.success("Dados atualizados.");
                    })
                    .catch(error => this.alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get("profile")
                .then(response => (this.user = new User(response.data)))
                .catch(error => this.alert.error(error.message));
        }
    };
</script>

<style>
    .v-tab {
        justify-content: start;
    }
</style>