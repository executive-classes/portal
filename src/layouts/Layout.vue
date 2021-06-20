<template>
    <v-app id="inspire" :class="{ horizontalstyle: setHorizontalLayout }">
        <!-- ---------------------------------- -->
        <!--- Header part -->
        <!-- ---------------------------------- -->
        <Header :horizontal="setHorizontalLayout" :expand-on-hover.sync="expandOnHover"></Header>

        <!-- ---------------------------------- -->
        <!--- Sidebar part -->
        <!-- ---------------------------------- -->
        <Sidebar :horizontal="setHorizontalLayout" :expand-on-hover.sync="expandOnHover"></Sidebar>

        <!-- ---------------------------------- -->
        <!--- Customizer button -->
        <!-- ---------------------------------- -->
        <v-main>
            <v-container fluid class="page-wrapper">
                <!-- Breadcrumb part -->
                <Breadcrumb></Breadcrumb>

                <!-- Page Content part -->
                <router-view />

                <!-- Customizer button -->
                <v-btn
                    v-show="useCustomizer"
                    bottom
                    color="success"
                    dark
                    fab
                    fixed
                    right
                    @click.stop="setCustomizerDrawer(!Customizer_drawer)"
                >
                    <v-icon>mdi-cog</v-icon>
                </v-btn>
            </v-container>
        </v-main>

        <!-- ---------------------------------- -->
        <!--- Customizer part -->
        <!-- ---------------------------------- -->
        <Customizer v-model="expandOnHover"></Customizer>

        <!-- ---------------------------------- -->
        <!--- Footer part -->
        <!-- ---------------------------------- -->
        <span v-show="hasFooter">
            <Footer :horizontal="setHorizontalLayout"></Footer>
        </span>
    </v-app>
</template>

<script>
    import Header from "./header/Header";
    import Sidebar from "./sidebar/Sidebar";
    import Footer from "./footer/Footer";
    import Customizer from "./customizer/Customizer";
    import Breadcrumb from "./breadcrumb/Breadcrumb";
    import { mapState, mapMutations } from "vuex";

    export default {
        name: "Layout",

        components: {
            Header,
            Sidebar,
            Footer,
            Customizer,
            Breadcrumb
        },

        props: {
            source: String
        },

        data: () => ({
            expandOnHover: false
        }),

        computed: {
            ...mapState([
                "Customizer_drawer",
                "setHorizontalLayout",
                "useCustomizer",
                "hasFooter"
            ])
        },

        methods: {
            ...mapMutations({
                setCustomizerDrawer: "SET_CUSTOMIZER_DRAWER"
            })
        }
    };
</script>