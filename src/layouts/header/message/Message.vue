<template>
    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-btn :dark="dark || $vuetify.theme.dark" icon v-on="on" class="mr-2">
                <v-badge :value="messages.length" color="red" dot>
                    <v-icon>fa-comments</v-icon>
                </v-badge>
            </v-btn>
        </template>

        <v-list>
            <h4 class="px-5 pt-2 py-3 font-weight-medium title">Mensagens</h4>
            <v-divider></v-divider>
            <p class="text-center my-4" v-if="messages.length == 0">Sem mensagens</p>
            <v-list-item v-else v-for="(message, i) in messages" :key="i" @click="href">
                <v-list-item-title>
                    <div class="d-flex align-center py-3">
                        <div class="mr-3">
                            <v-badge
                                bordered
                                bottom
                                :color="message.avatarstatus"
                                dot
                                offset-x="10"
                                offset-y="10"
                            >
                                <v-avatar>
                                    <img
                                        :src="
                                'https://www.wrappixel.com/demos/admin-templates/materialpro-bootstrap-latest/material-pro/src/assets/images/users/' +
                                message.avatar +
                                '.jpg'
                            "
                                        :alt="message.title"
                                    />
                                </v-avatar>
                            </v-badge>
                        </div>
                        <div>
                            <h4 class="font-weight-medium">{{ message.title }}</h4>
                            <span
                                class="text--secondary caption descpart d-block text-truncate"
                            >{{ message.desc }}</span>
                            <small class="text--secondary">{{ message.time }}</small>
                        </div>
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "Message",

        props: {
            dark: {
                type: Boolean,
                default: false
            }
        },

        data: () => ({
            messages: []
        })
    };
</script>

<style lang="scss">
    .descpart {
        max-width: 220px;
    }
</style>