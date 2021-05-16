<template>
    <!--- Horizontal Sidebar -->
    <HorizontalSidebar :items="items" :expandOnHover="expandOnHover" v-if="this.horizontal"></HorizontalSidebar>

    <!--- Vertical Sidebar -->
    <VerticalSidebar :items="items" :expandOnHover="expandOnHover" v-else></VerticalSidebar>
</template>

<script>
    import HorizontalSidebar from "./HorizontalSidebar";
    import VerticalSidebar from "./VerticalSidebar";
    import SidebarItems from "./items/SidebarItems";

    export default {
        name: "Sidebar",

        components: {
            HorizontalSidebar,
            VerticalSidebar
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

        data: () => ({
            items: SidebarItems
        }),

        watch: {
            "$vuetify.breakpoint.smAndDown"(val) {
                this.$emit("update:expandOnHover", !val);
            }
        }
    };
</script>