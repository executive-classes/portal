<template>
    <v-footer app class="footerpart" inset>
        <!--- Horizontal Footer -->
        <HorizontalFooter v-if="this.horizontal">{{ info.text }}</HorizontalFooter>

        <!--- Vertical Footer -->
        <VerticalFooter v-else>{{ info.text }}</VerticalFooter>
    </v-footer>
</template>

<script>
    import FooterInfo from "./info/FooterInfo";
    import VerticalFooter from "./VerticalFooter";
    import HorizontalFooter from "./HorizontalFooter";

    export default {
        name: "Footer",

        components: {
            VerticalFooter,
            HorizontalFooter
        },

        props: {
            horizontal: {
                required: true,
                type: Boolean
            }
        },

        data: () => ({
            info: FooterInfo
        })
    };
</script>

<style lang="scss">
    .v-application .footerpart {
        border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
    }
    .theme--light.v-footer {
        background: white;
    }
</style>