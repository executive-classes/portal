<template>
    <v-card>
        <v-form @submit.prevent="$emit('submit', 'position');">
            <v-card-title>Dados de Usuário</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Position -->
                    <v-col cols="12">
                        <v-select
                            return-object
                            label="Cargo"
                            prepend-icon="mdi-clipboard-account-outline"
                            v-model="employee.position"
                            :items="positions"
                            item-text="name"
                            item-value="id"
                        ></v-select>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-btn color="primary" type="submit" rounded text>Salvar alterações</v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
    export default {
        name: "EmployeePosition",

        props: {
            employee: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            positions: []
        }),

        created() {
            this.$http.get("employees/positions").then(response => {
                this.positions = response.data;
            });
        }
    };
</script>
