<template>
    <base-main-card :title="user.name" icon="fa-user">
        <base-alert></base-alert>

        <base-tabs>
            <template slot="header">
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
            </template>

            <template slot="content">
                <v-tab-item>
                    <base-form
                        name="profileData"
                        :args="{type: 'data'}"
                        title="Dados de Perfil"
                        @submit="submit($event)"
                    >
                        <UserDataFields :user="user" formName="profileData"></UserDataFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="profileTax"
                        :args="{type: 'tax'}"
                        title="Documentos"
                        @submit="submit($event)"
                    >
                        <UserTaxFields :user="user" formName="profileTax"></UserTaxFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="profilePassword"
                        :args="{type: 'password'}"
                        title="Alterar senha"
                        @submit="submit($event)"
                    >
                        <UserPasswordFields :user="user" formName="profilePassword"></UserPasswordFields>
                    </base-form>
                </v-tab-item>
                <v-tab-item>
                    <base-form
                        name="profileSettings"
                        :args="{type: 'settings'}"
                        title="Configurações de sistema"
                        @submit="submit($event)"
                    >
                        <UserSettingsFields :user="user"></UserSettingsFields>
                    </base-form>
                </v-tab-item>
            </template>
        </base-tabs>
    </base-main-card>
</template>

<script>
    import UserDataFields from "@/components/appComponents/userComponents/UserDataFields";
    import UserTaxFields from "@/components/appComponents/userComponents/UserTaxFields";
    import UserPasswordFields from "@/components/appComponents/userComponents/UserPasswordFields";
    import UserSettingsFields from "@/components/appComponents/userComponents/UserSettingsFields";
    import Profile from "@/domain/user/Profile";

    export default {
        name: "Profile",

        components: {
            UserDataFields,
            UserTaxFields,
            UserPasswordFields,
            UserSettingsFields
        },

        data: () => ({
            user: new Profile()
        }),

        methods: {
            submit(action) {
                this.user
                    .update(action.type)
                    .then(() => this.$alert.success("Dados atualizados."))
                    .catch(error => this.$alert.error(error.message));
            }
        },

        created() {
            this.$http
                .get("profile")
                .then(response => this.user.fill(response.data))
                .catch(error => this.$alert.error(error.message));
        }
    };
</script>