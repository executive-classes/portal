<template>
    <v-tabs :vertical="vertical ? keepVertical : vertical">
        <slot name="header" />

        <slot name="content" />
    </v-tabs>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: "BaseTabs",

        props: {
            vertical: {
                type: Boolean,
                default: true
            }
        },

        computed: {
            ...mapState([
                "setHorizontalLayout",
            ]),
            keepVertical() {
                if (this.setHorizontalLayout) {
                    return true;
                }

                if (["xs", "sm"].includes(this.$vuetify.breakpoint.name)) {
                    return false;
                }

                return true;
            }
        },
    }
</script>

<style>
    .v-tab {
        justify-content: start;
    }
</style>