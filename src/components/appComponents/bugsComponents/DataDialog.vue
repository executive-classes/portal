<template>
    <div class="text-center">
        <v-dialog v-model="dialog" scrollable width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text color="primary lighten-2" dark v-bind="attrs" v-on="on">Dados</v-btn>
            </template>

            <v-card>
                <v-card-title class="headline info white--text lighten-2">Dados</v-card-title>
                <v-spacer></v-spacer>

                <v-divider></v-divider>

                <v-card-text class="mt-3">
                    <ul v-if="Object.keys(data).length !== 0">
                        <li v-for="(item, key) of data" :key="key"><strong>{{key}}:</strong> {{item}}</li>
                    </ul>
                    <span v-else>A requisição não possuí dados</span>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">Fechar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "DataDialog",

        props: {
            data: {
                type: Object,
                require: true
            }
        },

        data: () => ({
            dialog: false
        })
    };
</script>