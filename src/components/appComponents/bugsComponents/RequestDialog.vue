<template>
    <div class="text-center">
        <v-dialog v-model="dialog" scrollable width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text color="primary lighten-2" dark v-bind="attrs" v-on="on">Ver</v-btn>
            </template>

            <v-card>
                <v-card-title class="headline primary white--text lighten-2">Requisição</v-card-title>
                <v-spacer></v-spacer>

                <v-divider></v-divider>

                <v-card-text class="mt-3">
                    <ul>
                        <li><strong>Aplicação:</strong> {{bug.app}}</li>
                        <li><strong>Data:</strong> {{bug.date}}</li>
                        <li><strong>URL:</strong> {{bug.url}}</li>
                        <li><strong>Método:</strong> {{bug.method}}</li>
                        <li><strong>Tipo:</strong> {{bug.ajax ? 'Ajax' : 'HTTP'}}</li>
                        <li><strong>Agente:</strong> {{bug.agent}}</li>
                    </ul>
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
        name: "RequestDialog",

        props: {
            bug: {
                type: Object,
                require: true
            }
        },

        data: () => ({
            dialog: false
        })
    };
</script>
