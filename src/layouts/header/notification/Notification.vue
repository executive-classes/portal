<template>
    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on" class="mr-1">
                <v-badge :value="notifications.length" color="red" dot>
                    <v-icon>fa-bell</v-icon>
                </v-badge>
            </v-btn>
        </template>

        <v-list>
            <h4 class="px-5 py-3 pt-2 font-weight-medium title">Notifications</h4>
            <v-divider></v-divider>
            <v-list-item v-for="(item, i) in notifications" :key="i" @click="href">
                <v-list-item-title>
                    <div class="d-flex align-center py-3">
                        <div class>
                            <v-btn class="mr-3" depressed fab small dark :color="item.iconbg">
                                <v-icon dark>{{ item.icon }}</v-icon>
                            </v-btn>
                        </div>
                        <div>
                            <h4 class="font-weight-medium">{{ item.title }}</h4>
                            <span
                                class="text--secondary caption descpart d-block text-truncate"
                            >{{ item.desc }}</span>
                            <small class="text--secondary">{{ item.time }}</small>
                        </div>
                    </div>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "Notification",

        data: () => ({
            notifications: []
        })
    };
</script>

<style lang="scss">
    .descpart {
        max-width: 220px;
    }
</style>