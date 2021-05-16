<template>
    <v-app-bar app clipped-left clipped-right :color="navbarColor" :dark="navbarColor !== 'white'">
        <!--- Logo part --->
        <Logo></Logo>

        <!--- Toggle part --->
        <Toggle></Toggle>

        <!--- Search part --->
        <Search></Search>

        <v-spacer />

        <!--- Notification --->
        <Notification></Notification>

        <!--- Messages --->
        <Message></Message>

        <!--- User --->
        <User></User>
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
        name: "VerticalHeader",

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