<template>
    <v-card>
        <v-form @submit.prevent="this.$emit('submit');">
            <v-card-title>Mudar Status</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Dates -->
                    <v-col cols="12" md="6">
                        <v-text-field
                            :value="teacher.status"
                            label="Status"
                            prepend-icon="mdi-calendar-plus"
                            readonly
                        ></v-text-field>
                    </v-col>

                    <!-- Tax -->
                    <v-col cols="12" md="6">
                        <v-select
                            :items="status"
                            label="Novo Status"
                            prepend-icon="mdi-toggle-switch-outline"
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
        name: "TeacherStatus",

        props: {
            teacher: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            status: [
                'Ativo',
                'Suspenso',
                'Cancelado'
            ]
        }),
    };
</script>
