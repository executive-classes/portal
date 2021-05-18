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
            <v-list-item
                v-for="(option, i) in options"
                :key="i"
                :to="option.to"
                @click="handle_click_call(option.click)"
            >
                <v-list-item-title>{{ option.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script>
    import { mapMutations } from "vuex";

    export default {
        name: "User",

        data: () => ({
            options: [
                { title: "Configurações", to: { name: "profile" } },
                { title: "Logout", click: "doLogout" }
            ]
        }),

        methods: {
            ...mapMutations({
                logout: "LOGOUT"
            }),

            handle_click_call(click) {
                this[click]();
            },

            doLogout() {
                this.logout();
                this.$router.push({ name: "login" });
            }
        }
    };
</script>