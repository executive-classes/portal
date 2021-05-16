<template>
    <div @click="showhideLogo" :class="{'d-block d-lg-none md-none': horizontal}">
        <v-app-bar-nav-icon
            @click="
                $vuetify.breakpoint.smAndDown
                    ? setSidebarDrawer(!Sidebar_drawer)
                    : $emit('input', !value)
            "
        />
    </div>
</template>

<script>
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "Toggle",

        props: {
            value: {
                type: Boolean,
                default: false
            },
            horizontal: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            ...mapState(["Sidebar_drawer"])
        },

        methods: {
            ...mapMutations({
                setSidebarDrawer: "SET_SIDEBAR_DRAWER",
                showhideLogo: "SHOW_HIDE_LOGO"
            })
        }
    };
</script>