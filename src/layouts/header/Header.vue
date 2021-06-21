<template>
    <!--- Horizontal Header -->
    <HorizontalHeader v-if="horizontal" :dark="dark"></HorizontalHeader>

    <!--- Vertical Header -->
    <VerticalHeader v-else v-model="expandOnHover" :dark="dark"></VerticalHeader>
</template>

<script>
    import VerticalHeader from "./VerticalHeader";
    import HorizontalHeader from "./HorizontalHeader";
    import { mapMutations } from "vuex";

    export default {
        name: "Header",

        components: {
            VerticalHeader,
            HorizontalHeader
        },

        props: {
            horizontal: {
                required: true,
                type: Boolean
            },
            expandOnHover: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            dark () {
                if (this.$vuetify.breakpoint.smAndDown) {
                    this.SET_MOBILE_LAYOUT();
                } else {
                    this.SET_LAPTOP_LAYOUT();
                }

                return true;
            }
        },

        methods: {
            ...mapMutations(['SET_MOBILE_LAYOUT', 'SET_LAPTOP_LAYOUT'])
        }
    };
</script>