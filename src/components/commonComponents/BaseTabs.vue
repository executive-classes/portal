<template>
    <v-tabs :vertical="vertical ? keepVertical : vertical">
        <slot />
    </v-tabs>
</template>

<script>
    export default {
        name: "BaseTabs",

        props: {
            vertical: {
                type: Boolean,
                default: true
            }
        },

        computed: {
            keepVertical() {
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