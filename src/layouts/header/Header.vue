<template>
    <!--- Horizontal Header -->
    <HorizontalHeader v-if="horizontal"></HorizontalHeader>

    <!--- Vertical Header -->
    <VerticalHeader v-else v-model="expandOnHover"></VerticalHeader>
</template>

<script>
    import VerticalHeader from "./VerticalHeader";
    import HorizontalHeader from "./HorizontalHeader";

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
        }
    };
</script>