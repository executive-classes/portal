<template>
    <v-card>
        <v-form @submit.prevent="this.$emit('submit');">
            <v-card-title>Dados de Perfil</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Dates -->
                    <v-col cols="6" md="3">
                        <v-text-field
                            :value="formatDate(user.created_at)"
                            label="Criado em"
                            prepend-icon="mdi-calendar-plus"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-text-field
                            :value="formatDate(user.updated_at)"
                            label="Alterado em"
                            prepend-icon="mdi-calendar-import"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-text-field
                            :value="user.inactive_at != null ? formatDate(user.inactive_at) : '-'"
                            label="Suspenso em"
                            prepend-icon="mdi-calendar-remove"
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6" md="3">
                        <v-text-field
                            :value="user.reactive_at != null ? formatDate(user.reactive_at) : '-'"
                            label="Reativado em"
                            prepend-icon="mdi-calendar-check"
                            readonly
                        ></v-text-field>
                    </v-col>

                    <!-- Email -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="email"
                            label="E-Mail"
                            prepend-icon="mdi-email"
                            :value="user.email"
                        ></v-text-field>
                    </v-col>

                    <!-- Name -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            type="text"
                            label="Nome"
                            prepend-icon="mdi-card-account-details-outline"
                            :value="user.name"
                        ></v-text-field>
                    </v-col>

                    <!-- Tax -->
                    <v-col cols="5" sm="3" md="2">
                        <v-select
                            :items="taxes"
                            label="Tipo"
                            prepend-icon="mdi-file-document-outline"
                            :value="user.tax_type"
                        ></v-select>
                    </v-col>
                    <v-col cols="7" sm="9" md="4">
                        <v-text-field type="text" label="Doc" :value="user.tax_code"></v-text-field>
                    </v-col>

                    <!-- Tax Alt -->
                    <v-col cols="5" sm="3" md="2">
                        <v-select
                            :items="taxes"
                            label="Tipo"
                            prepend-icon="mdi-file-document-outline"
                            :value="user.tax_type_alt"
                        ></v-select>
                    </v-col>
                    <v-col cols="7" sm="9" md="4">
                        <v-text-field type="text" label="Doc" :value="user.tax_code_alt"></v-text-field>
                    </v-col>

                    <!-- Phones -->
                    <v-col cols="12" md="4">
                        <v-text-field
                            type="text"
                            label="Celular"
                            prepend-icon="mdi-cellphone"
                            :value="user.phone"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                            type="text"
                            label="Telefone"
                            prepend-icon="mdi-phone"
                            :value="user.phone_alt"
                        ></v-text-field>
                    </v-col>

                    <!-- Status -->
                    <v-col cols="12" md="2" offset-md="1">
                        <v-switch :value="user.active" :label="`Status`" color="primary" inset></v-switch>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" submit rounded text>Salvar alterações</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: "UserData",

        props: {
            user: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            taxes: []
        }),

        methods: {
            formatDate(date) {
                return this.$moment(date).format("DD/MM/YYYY, HH:mm:ss ");
            }
        },

        created() {
            this.$http.get("taxes").then(response => (this.taxes = response.data));
        }
    };
</script>
