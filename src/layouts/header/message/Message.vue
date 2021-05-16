<template>
    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on" class="mr-2">
                <v-badge color="red" dot v-if="messages.length > 0">
                    <v-icon>{{ icon }}</v-icon>
                </v-badge>
                <v-icon v-else>{{ icon }}</v-icon>
            </v-btn>
        </template>

        <v-list>
            <h4 class="px-5 pt-2 py-3 font-weight-medium title">Messages</h4>
            <v-divider></v-divider>
            <v-list-item v-for="(message, i) in messages" :key="i" @click="href">
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

        data: () => ({
            icon: "fa-comments",
            messages: []
        })
    };
</script>

<style lang="scss">
    .descpart {
        max-width: 220px;
    }
</style>