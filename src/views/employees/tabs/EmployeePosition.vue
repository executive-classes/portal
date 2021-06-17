<template>
    <v-card>
        <v-form @submit.prevent="this.$emit('submit');">
            <v-card-title>Dados de Usuário</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Dates -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            :value="employee.position"
                            label="Cargo"
                            prepend-icon="mdi-clipboard-account"
                            readonly
                        ></v-text-field>
                    </v-col>

                    <!-- Tax -->
                    <v-col cols="12" md="6">
                        <v-select
                            :items="positions"
                            label="Novo Cargo"
                            prepend-icon="mdi-clipboard-account-outline"
                        ></v-select>
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
        name: "EmployeeStatus",

        props: {
            employee: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            positions: [
                'Administrador',
                'Desenvolvedor',
                'Financeiro',
                'Técnico',
                'RH'
            ]
        }),
    };
</script>
