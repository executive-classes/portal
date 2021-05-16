<template>
    <v-menu bottom left offset-y origin="top right" transition="scale-transition">
        <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on" class="mr-1">
                <v-avatar size="40">
                    <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
                </v-avatar>
            </v-btn>
        </template>

        <v-list>
            <v-list-item v-for="(option, i) in options" :key="i" :to="option.to" @click="href">
                <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    export default {
        name: "User",

        data: () => ({
            options: [
                { title: "Configurações", to: { name: "profile" } },
                { title: "Logout", to: { name: "login" } }
            ],
            href() {
                return undefined;
            }
        }),
    };
</script>