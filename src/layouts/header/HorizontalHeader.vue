<template>
    <v-app-bar
        class="horizontal-header"
        app
        clipped-left
        clipped-right
        :color="navbarColor"
        :dark="navbarColor !== 'white'"
    >
        <v-container class="py-0 px-0 d-flex">
            <!--- Logo part --->
            <Logo></Logo>

            <!--- Toggle part --->
            <Toggle :horizontal="true"></Toggle>

            <!--- Search --->
            <Search></Search>

            <v-spacer />

            <!--- Notification --->
            <Notification></Notification>

            <!--- Messages --->
            <Message></Message>

            <!--- User --->
            <User></User>
        </v-container>
    </v-app-bar>
</template>

<script>
    import Logo from "./logo/Logo";
    import Toggle from "./logo/Toggle";
    import Search from "./search/Search";
    import Notification from "./notification/Notification";
    import Message from "./message/Message";
    import User from "./user/User";
    import { mapState } from "vuex";

    export default {
        name: "HorizontalHeader",

        components: {
            Logo,
            Toggle,
            Search,
            Notification,
            Message,
            User
        },

        computed: {
            ...mapState(["navbarColor"])
        }
    };
</script>

<style lang="scss">
    @media (min-width: 1024px) {
        .horizontalstyle {
            .logo-width {
                position: absolute;
                left: 0;
                right: 0;
                margin: 0 auto;
                width: 235px;
            }
        }
    }
</style>