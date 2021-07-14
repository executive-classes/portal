<template>
    <v-row>
        <!-- Language -->
        <v-col cols="12">
            <v-select
                return-object
                label="Idioma"
                prepend-icon="mdi-translate"
                v-model="user.language"
                :items="languages"
                item-text="name"
                item-value="id"
            ></v-select>
        </v-col>
    </v-row>
</template>

<script>
    export default {
        name: "UserSettingsFields",

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
