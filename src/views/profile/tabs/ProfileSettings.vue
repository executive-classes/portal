<template>
    <v-card>
        <v-form @submit.prevent="$emit('submit', 'settings')">
            <v-card-title>Configurações de sistema</v-card-title>

            <v-card-text>
                <v-row>
                    <!-- Language -->
                    <v-col cols="12">
                        <v-select
                            v-model="user.language"
                            :items="languages"
                            item-text="name"
                            item-value="id"
                            label="Idioma"
                            prepend-icon="mdi-translate"
                            return-object
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
        name: "ProfileSettings",

        props: {
            user: {
                type: Object,
                required: true
            }
        },

        data: () => ({
            languages: []
        }),

        created() {
            this.$http
                .get("languages")
                .then(response => (this.languages = response.data));
        }
    };
</script>
