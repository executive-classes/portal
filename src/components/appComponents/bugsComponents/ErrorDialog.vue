<template>
    <div class="text-center">
        <v-dialog v-model="dialog" scrollable width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text color="red lighten-2" dark v-bind="attrs" v-on="on">Erro</v-btn>
            </template>

            <v-card>
                <v-card-title class="headline danger white--text lighten-2">Erro</v-card-title>
                <v-spacer></v-spacer>

                <v-divider></v-divider>

                <v-card-text class="mt-3">
                    <ul class="bug-error-details">
                        <li><strong>Mensagem:</strong> {{this.error.message}}</li>
                        <li><strong>Arquivo:</strong> {{this.error.file}}</li>
                        <li><strong>Linha:</strong> {{this.error.line}}</li>
                        <li><strong>Código:</strong> {{this.error.code}}</li>
                        <li><strong>Stack:</strong>
                            <ul>
                                <li v-for="(item, index) of this.error.stack" :key="index">
                                    {{item.class}}{{item.type}}{{item.function}}
                                </li>
                            </ul>
                        </li>
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
        name: "ErrorDialog",

        props: {
            error: {
                type: Object,
                require: true
            }
        },

        data: () => ({
            dialog: false
        })
    };
</script>

<style>
    .bug-error-details {
        width: fit-content;
    }
</style>